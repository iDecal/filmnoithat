"""Import audited TODA Vol.02 swatches from the supplied scanned PDF.
Usage: python3 scripts/import-toda.py /path/to/df185ae0c1.pdf
Regions use the 1191 x 1684 page preview coordinate system and are converted
back to the embedded raster pixels. No image upscaling or recoloring is used.
Existing CMS records are preserved; use a separate review for later editions.
"""
from pathlib import Path
import hashlib,io,json,shutil,sys
import fitz
from PIL import Image,ImageStat
ROOT=Path(__file__).resolve().parents[1]
source=Path(sys.argv[1]);digest=hashlib.sha256(source.read_bytes()).hexdigest()
expected=json.loads((ROOT/'scripts/toda-source.json').read_text())['sha256']
assert digest==expected,'Unexpected TODA PDF edition'
doc=fitz.open(source);assert len(doc)==47
regions=json.loads((ROOT/'scripts/toda-regions.json').read_text());assert len(regions)==84
out=ROOT/'public/images/catalogue/toda';out.mkdir(parents=True,exist_ok=True)
products=ROOT/'src/content/products/toda';products.mkdir(parents=True,exist_ok=True)
shutil.copyfile(source,ROOT/'public/catalogues/toda-vol-02.pdf')
groups={920:('Basic Solid','Đơn sắc','don-sac'),921:('Soft Matt','Đơn sắc mờ','don-sac'),922:('Premium Wood','Vân gỗ','van-go'),923:('Stainless / Metal','Kim loại','kim-loai'),924:('Marble','Vân đá','da-cam-thach'),925:('Concrete','Vân bê tông','be-tong'),926:('Fabric','Vân vải','van-vai'),927:('Reflex Glossy','Tráng gương','trang-guong')}
palette={'Trắng':(240,240,235),'Kem':(221,208,175),'Nâu':(144,111,77),'Xám':(150,150,150),'Đen':(36,36,36),'Đỏ':(175,45,40),'Vàng':(190,166,100)}
cache={}
for index,region in enumerate(regions):
 page=region['page'];code=region['code'];prefix=int(code[:3]);series,name,category=groups[prefix]
 if prefix==923:series='Metal' if int(code[-2:])>=9 else 'Stainless'
 if prefix==927 and code!='927-01':name,category='Đơn sắc bóng','don-sac'
 if page not in cache:
  xref=doc[page-1].get_images(full=True)[0][0];cache[page]=Image.open(io.BytesIO(doc.extract_image(xref)['image'])).convert('RGB')
 full=cache[page];x0,y0,x1,y1=region['rect'];rect=(round((x0+5)*full.width/1191),round((y0+5)*full.height/1684),round((x1-5)*full.width/1191),round((y1-5)*full.height/1684))
 image=full.crop(rect);assert image.width>100 and image.height>100
 image.save(out/f'film-dan-noi-that-toda-{code}.webp','WEBP',quality=88,method=6)
 rgb=tuple(round(v) for v in ImageStat.Stat(image).mean);family=min(palette,key=lambda key:sum((a-b)**2 for a,b in zip(rgb,palette[key])))
 record={'slug':f'toda-{code}','code':code,'name':name,'group':series,'category':category,'brand':'TODA','collection':'TODA Interior Film Vol.02','pdf':'/catalogues/toda-vol-02.pdf','image':f'/images/catalogue/toda/film-dan-noi-that-toda-{code}.webp','imageAlt':f'Bề mặt film dán nội thất TODA {code}, dòng {series}, trích từ catalogue Vol.02','imageWidth':image.width,'imageHeight':image.height,'application':None,'sourcePage':page,'rollSpecification':'1,22 m × 50 m' if prefix==922 else 'Liên hệ xác nhận quy cách cuộn','color':{'name':family,'family':family,'value':'#' + ''.join(f'{n:02x}' for n in rgb)},'order':1000+index,'seoTitle':f'Film dán nội thất TODA {code} – {name} | Tư vấn mẫu','seoDescription':f'Mẫu film dán nội thất TODA {code}, dòng {series}. Xem ảnh bề mặt trích từ catalogue TODA Vol.02, đối chiếu trang {page} và liên hệ tư vấn vật liệu, báo giá.'}
 path=products/f'toda-{code}.json'
 if not path.exists():path.write_text(json.dumps(record,ensure_ascii=False,indent=2)+'\n')
print('Imported 84 TODA swatches. Color labels are approximate screen references; non-wood roll sizes require confirmation.')
