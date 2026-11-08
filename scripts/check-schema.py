"""Validate built JSON-LD graphs against the website's visible content and routes.
Run after npm run build: python scripts/check-schema.py
"""
import collections, json, re
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse
from datetime import date
ROOT=Path(__file__).resolve().parents[1]
class Page(HTMLParser):
    def __init__(self, text):
        super().__init__();self.scripts=[];self.current=None;self.text=[];self.canonical=None;self.feed(text)
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='script' and a.get('type')=='application/ld+json':self.current=''
        if tag=='link' and a.get('rel')=='canonical':self.canonical=a.get('href')
    def handle_data(self,data):
        if self.current is not None:self.current+=data
        else:self.text.append(data)
    def handle_endtag(self,tag):
        if tag=='script' and self.current is not None:self.scripts.append(self.current);self.current=None

def normalized(value):return ' '.join(value.split())
samples=[json.loads(file.read_text()) for file in sorted((ROOT/'src/content/products').rglob('*.json'))]
# The noindex CMS application is not a public editorial page.
pages=[p for p in (ROOT/'dist').rglob('*.html') if p.relative_to(ROOT/'dist').parts[0] != 'admin'];counts=collections.Counter();documents=[];all_ids=set();refs=[]
for file in pages:
    parsed=Page(file.read_text());assert len(parsed.scripts)==1,(file,'duplicate or missing JSON-LD')
    schema=json.loads(parsed.scripts[0]);assert schema['@context']=='https://schema.org'
    graph=schema['@graph'];ids=[n['@id'] for n in graph];assert len(ids)==len(set(ids)),(file,'duplicate IDs')
    all_ids.update(ids);nodes={n['@type']:n for n in graph}
    for node in graph:counts[node['@type']]+=1
    assert all(t in nodes for t in ['Organization','WebSite','ImageObject'])
    page=next(n for n in graph if n['@id']==parsed.canonical+'#webpage')
    assert page['url']==parsed.canonical and page['inLanguage']=='vi-VN'
    assert page['isPartOf']['@id']==nodes['WebSite']['@id']
    assert nodes['Organization']['name']==(json.loads((ROOT/'src/data/homeContent.json').read_text())['brandName'] if parsed.canonical.rstrip('/')=='https://filmnoithat.pages.dev' else json.loads((ROOT/'src/data/business.json').read_text())['name'])
    visible=normalized(' '.join(parsed.text))
    if 'Product' in nodes:
        product=nodes['Product'];assert product['sku'] in visible
        assert product['mainEntityOfPage']['@id']==page['@id']
        expected = next(item for item in samples if item['slug'] == file.parent.name)
        assert product['brand']['name']==expected['brand']
        assert expected['rollSpecification'] in visible
        assert product['additionalProperty'][0]['value']==expected['rollSpecification']
        assert all(k not in product for k in ['aggregateRating','review'])
        if expected['brand']=='INFEEL':
            offer=product['offers'];assert offer['priceCurrency']=='VND'
            assert isinstance(offer['price'],int) and offer['price']>0
            assert offer['price']==expected['pricePerMetre']
            assert f"{offer['price']:,}".replace(',','.')+'đ' in visible
            unit=offer['priceSpecification'];assert unit['price']==offer['price'] and unit['priceCurrency']=='VND'
            assert unit['referenceQuantity']['unitCode']=='MTR' and unit['referenceQuantity']['value']==1
            assert 'mét dài' in visible
        else:assert 'offers' not in product
    if 'BlogPosting' in nodes:
        post=nodes['BlogPosting'];date.fromisoformat(post['datePublished']);assert post['headline'] in visible
        assert post['author']['@id']==nodes['Organization']['@id']
    if 'FAQPage' in nodes:
        for question in nodes['FAQPage']['mainEntity']:
            assert normalized(question['name']) in visible,(file,'question mismatch')
            assert normalized(question['acceptedAnswer']['text']) in visible,(file,'answer mismatch')
    if 'ItemList' in nodes:
        listing=nodes['ItemList'];assert listing['numberOfItems']==len(listing['itemListElement'])
        assert [i['position'] for i in listing['itemListElement']]==list(range(1,listing['numberOfItems']+1))
    def visit(value):
        if isinstance(value,dict):
            if set(value)=={'@id'}:refs.append((file,value['@id']))
            for key,item in value.items():
                if key in ('url','contentUrl') and isinstance(item,str):
                    parsed_url=urlparse(item)
                    assert parsed_url.scheme=='https',(file,key,item)
                    if parsed_url.netloc=='filmnoithat.pages.dev':
                        target=ROOT/'dist'/parsed_url.path.lstrip('/')
                        if parsed_url.path.endswith('/'):target=target/'index.html'
                        assert target.exists(),(file,'broken schema URL',item)
                visit(item)
        elif isinstance(value,list):
            for item in value:visit(item)
    visit(schema)
for file,ref in refs:assert ref in all_ids,(file,'unresolved schema reference',ref)
assert counts['Product']==len(samples) and counts['BlogPosting']==sum(len(json.loads((ROOT/name).read_text())['posts']) for name in ['src/data/kitchenPosts.json','src/data/guidePosts.json']) and counts['Service']==6 and counts['ImageGallery']==sum(bool(sample.get('application')) for sample in samples)+len(json.loads((ROOT/'src/data/spacesContent.json').read_text())['spaces'])
assert counts['Organization']==len(pages) and counts['WebSite']==len(pages)
print(f'PASS {len(pages)} pages: JSON-LD syntax, unique IDs, entity references, local URLs and visible FAQ/product/article content.')
print(dict(sorted(counts.items())))
