"""Extract the three manually verified improvements from the supplemental PDF.
Run after import-infeel.py, if reimporting the primary catalogue.
Does not resize, sharpen, recolor or recompress the embedded images.
"""
import hashlib,json,shutil,sys
from pathlib import Path
import fitz
root=Path(__file__).resolve().parents[1]
source=Path(sys.argv[1])
assert hashlib.sha256(source.read_bytes()).hexdigest()=='4624e7db12ade79e61334c8cbc6264479d33837e91332bb4b5e00a5e125b62d9','Unverified source PDF'
doc=fitz.open(source)
# Page 21, visually checked against labels and clipping rectangles.
verified={'SL 548':222,'SL 558':219,'SL 564':223}
path=root/'src/data/catalogue.json';samples=json.loads(path.read_text())
out=root/'public/images/catalogue/infeel-supplement';out.mkdir(parents=True,exist_ok=True)
for sample in samples:
 if sample['code'] not in verified:continue
 blob=doc.extract_image(verified[sample['code']]);assert min(blob['width'],blob['height'])>=220
 name=sample['slug']+'.'+blob['ext'];(out/name).write_bytes(blob['image'])
 sample['image']='/images/catalogue/infeel-supplement/'+name
 sample['imageWidth']=blob['width'];sample['imageHeight']=blob['height']
 sample['imageSource']={'pdf':'/catalogues/infeel-supplement.pdf','page':21}
 print(sample['code'],f"{blob['width']} × {blob['height']}")
path.write_text(json.dumps(samples,ensure_ascii=False,indent=2)+'\n')
shutil.copyfile(source,root/'public/catalogues/infeel-supplement.pdf')
