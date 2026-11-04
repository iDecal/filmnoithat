"""Import source images and labels from the user-provided INFEEL 2026 PDF.
Usage: python scripts/import-infeel.py path/to/2026INFEELsamplebook_eng.pdf
Requires PyMuPDF. Embedded images are extracted without recoloring or resizing.
"""
import collections, json, re, shutil, sys
from pathlib import Path
import fitz

root = Path(__file__).resolve().parents[1]
doc = fitz.open(sys.argv[1])
pattern = re.compile(r'\b(SM|SL|PS|SE|SD|MD|ST|LW|MT|MS|EH|HG|NI|MW|WD|FB|LT|AB|PW)\s*(\d{3})\b')
items = collections.defaultdict(list)
out = root / 'public/images/catalogue/infeel-2026'
out.mkdir(parents=True, exist_ok=True)
for pi in range(3, len(doc)-1):
    page = doc[pi]
    labels = []
    for block in page.get_text('dict')['blocks']:
        for line in block.get('lines', []):
            text = ''.join(span['text'] for span in line['spans']).strip()
            if pattern.fullmatch(text):
                labels.append((fitz.Rect(line['bbox']), text))
    for im in page.get_image_info(xrefs=True):
        rect = fitz.Rect(im['bbox'])
        candidates = [(abs(label.y0-rect.y1), code) for label, code in labels
                      if -4 < label.y0-rect.y1 < 35 and rect.x0-5 <= label.x0 <= rect.x1+5]
        if not candidates:
            continue
        code = ' '.join(pattern.fullmatch(min(candidates)[1]).groups())
        caption = page.get_textbox(fitz.Rect(rect.x0-2, rect.y1, rect.x1+3, rect.y1+22))
        descriptors = [line.strip() for line in caption.splitlines()
                       if re.search('[a-z]', line) and not line.startswith('※')]
        items[code].append(dict(page=pi+1, xref=im['xref'], descriptor=' '.join(descriptors), area=rect.get_area()))
# Two white swatches are vector artwork rather than embedded raster images.
for code, page_index, clip in [('SM 886', 6, (42.52, 83.1, 283.48, 199.27)), ('HG 990', 25, (42.52, 525.01, 283.48, 788.53))]:
    pix = doc[page_index].get_pixmap(matrix=fitz.Matrix(2, 2), clip=fitz.Rect(clip), alpha=False)
    name = code.lower().replace(' ', '-')+'.png'
    pix.save(out/name)
    items[code].append(dict(page=page_index+1, xref=0, descriptor='Solid Matt' if code.startswith('SM') else 'High-gloss', area=1, file=name))

translations = {'Oak':'Vân gỗ sồi', 'Ash':'Vân gỗ tần bì', 'Walnut':'Vân gỗ óc chó', 'Standard Oak':'Vân sồi tự nhiên', 'Classic Oak':'Vân sồi cổ điển', 'French Oak':'Vân sồi Pháp', 'White Ash':'Vân tần bì sáng', 'Pine':'Vân gỗ thông', 'Antique Pine':'Vân thông cổ điển', 'Teak':'Vân gỗ teak', 'Maple':'Vân gỗ phong', 'Cherry':'Vân gỗ anh đào', 'Birch':'Vân gỗ bạch dương', 'Elm':'Vân gỗ du', 'Solid Matt':'Đơn sắc mờ', 'Solid':'Đơn sắc', 'Premium Solid':'Đơn sắc cao cấp', 'Solid Emboss':'Đơn sắc dập nổi', 'Solid Design':'Đơn sắc họa tiết', 'Matt Design':'Bề mặt mờ', 'Stone':'Vân đá', 'Stripe Stone':'Vân đá sọc', 'Concrete':'Vân bê tông', 'Brick':'Vân gạch', 'Metal':'Hiệu ứng kim loại', 'Metal Shiny':'Kim loại ánh bóng', 'High-gloss':'Đơn sắc bóng', 'Marble':'Vân đá cẩm thạch', 'Big Marble':'Vân cẩm thạch khổ vân lớn', 'Fabric':'Vân vải', 'Linen':'Vân vải linen', 'Artificial Leather':'Vân da', 'Leather':'Vân da', 'Paper Weave':'Vân đan', 'Basic':'Bề mặt tinh giản'}
prefix_names={'SM':'Solid Matt','SL':'Solid','PS':'Premium Solid','SE':'Solid Emboss','SD':'Solid Design','MD':'Matt Design','ST':'Stone','MT':'Metal','MS':'Metal Shiny','HG':'High-gloss','EH':'Marble','NI':'Natural & Innovative','MW':'Wood','WD':'Wood','LW':'Wood','FB':'Fabric','LT':'Leather','AB':'Abstract','PW':'Paper Weave'}
products=[]
for code, candidates in items.items():
    swatches=[c for c in candidates if c['descriptor']]
    best=min(swatches or candidates, key=lambda c:c['area'])
    prefix=code.split()[0]
    descriptor=best['descriptor'] or prefix_names[prefix]
    category='don-sac'
    if prefix in ('MW','WD','LW'):category='van-go'
    if prefix in ('ST','EH'):category='da-cam-thach'
    if prefix in ('MT','MS'):category='kim-loai'
    if prefix in ('FB','LT','AB','PW'):category='van-vai'
    if descriptor in ('Concrete','Brick'):category='be-tong'
    if descriptor in ('Fabric','Linen','Artificial Leather','Basic'):category='van-vai'
    if prefix=='NI':category='da-cam-thach' if descriptor in ('Marble','Nero Marquina','Maron Emperador') else 'kim-loai'
    slug=code.lower().replace(' ','-')
    if best['xref']:
        blob=doc.extract_image(best['xref'])
        name=slug+'.'+blob['ext']
        (out/name).write_bytes(blob['image'])
    else:name=best['file']
    apps=[c for c in candidates if not c['descriptor'] and c['xref'] and c['xref']!=best['xref']]
    application=None
    if apps:
        app=max(apps,key=lambda c:c['area']);blob=doc.extract_image(app['xref'])
        appname=slug+'-ung-dung.'+blob['ext'];(out/appname).write_bytes(blob['image']);application='/images/catalogue/infeel-2026/'+appname
    products.append(dict(slug=slug,code=code,name=translations.get(descriptor,descriptor),group=descriptor,category=category,image='/images/catalogue/infeel-2026/'+name,application=application,sourcePage=best['page']))
index=set(' '.join(match) for match in pattern.findall(doc[1].get_text()))
assert set(p['code'] for p in products)==index, 'Catalogue index and extracted samples differ'
products.sort(key=lambda p:(p['category'],p['group'],p['code']))
(root/'src/data/catalogue.json').write_text(json.dumps(products,ensure_ascii=False,indent=2)+'\n')
(root/'public/catalogues').mkdir(exist_ok=True)
shutil.copyfile(sys.argv[1],root/'public/catalogues/infeel-2026.pdf')
print(len(products),'verified unique samples;',collections.Counter(p['category'] for p in products))
