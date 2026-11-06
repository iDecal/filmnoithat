"""Extract Corance film swatches from the supplied scanned catalogue.

Usage: python scripts/import-corance.py path/to/1048289957-Corance-Catalog-1.pdf
Requires PyMuPDF and Pillow. Audited regions use embedded raster pixel coordinates;
no sharpening, enlargement, recoloring, or generated texture is applied.
"""
import hashlib
import io
import json
import shutil
import subprocess
import sys
from pathlib import Path

import fitz
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
source = Path(sys.argv[1])
assert hashlib.sha256(source.read_bytes()).hexdigest() == '64c65aa0978dea4779f41115e144b864ec231b87de19ce79f1b823712a57a224', 'Unexpected source PDF'
regions = json.loads((ROOT / 'scripts/corance-regions.json').read_text())
assert len(regions) == len({r['code'] for r in regions}) == 201
doc = fitz.open(source)
assert len(doc) == 35, 'Unexpected catalogue edition'
destination = ROOT / 'public/images/catalogue/corance'
destination.mkdir(parents=True, exist_ok=True)
pages = {}
samples = []
for region in sorted(regions, key=lambda r: r['code']):
    page = region['page']
    if page not in pages:
        images = doc[page - 1].get_images(full=True)
        assert len(images) == 1, 'Expected one scanned spread per page'
        pages[page] = Image.open(io.BytesIO(doc.extract_image(images[0][0])['image'])).convert('RGB')
        assert pages[page].size == (2607, 1729)
    code = region['code']
    prefix = code[:3]
    category = 'van-go'
    if prefix == 'CAN': category = 'van-vai'
    elif prefix == 'CAM': category = 'kim-loai'
    elif prefix == 'CAG' or code == 'CAE13': category = 'da-cam-thach'
    elif (prefix == 'CSS' and int(code[3:]) < 100) or (prefix == 'CAE' and page == 25) or (prefix == 'CPP' and code in {'CPP22','CPP24','CPP25','CPP26','CPP27','CPP28'}): category = 'don-sac'
    names = {'van-go':'Vân gỗ','don-sac':'Đơn sắc','van-vai':'Vân vải & da','kim-loai':'Hiệu ứng kim loại','da-cam-thach':'Vân đá'}
    image = pages[page].crop(region['crop'])
    assert image.width > 200 and image.height > 150, code
    image.save(destination / f'{code.lower()}.webp', lossless=True, method=6)
    samples.append(dict(slug=f'corance-{code.lower()}', code=code, name=names[category],
        group=f'Corance {prefix}', category=category, image=f'/images/catalogue/corance/{code.lower()}.webp',
        application=None, sourcePage=page, imageWidth=image.width, imageHeight=image.height,
        brand='Corance', collection='Corance', pdf='/catalogues/corance.pdf',
        rollSpecification='1,26 m × 150 m hoặc 1,24 m × 30 m (tùy phiên bản)' if prefix == 'CAN' else '1,24 m × 50 m'))
output = ROOT / 'src/data/corance.json'
output.write_text(json.dumps(samples, ensure_ascii=False, indent=2) + '\n')
subprocess.run([sys.executable, str(ROOT/'scripts/label-catalogue-colors.py'), str(output)], check=True)
shutil.copyfile(source, ROOT / 'public/catalogues/corance.pdf')
print(f'Extracted {len(samples)} Corance swatches without resampling. Source SHA256: {hashlib.sha256(source.read_bytes()).hexdigest()}')
