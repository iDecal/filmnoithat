"""Estimate display color families from catalogue swatches; never edits image files.
Requires Pillow. Color labels are visual navigation aids, not manufacturer specs.
"""
import colorsys, collections, json
from pathlib import Path
from PIL import Image, ImageStat
root = Path(__file__).resolve().parents[1]
path = root/'src/data/catalogue.json'
samples = json.loads(path.read_text())
for sample in samples:
    image = Image.open(root/'public'/sample['image'].lstrip('/')).convert('RGB')
    sample['imageWidth'], sample['imageHeight'] = image.size
    w,h=image.size
    rgb=tuple(round(x) for x in ImageStat.Stat(image.crop((w*.1,h*.1,w*.9,h*.9))).mean)
    r,g,b=rgb; hue,light,sat=colorsys.rgb_to_hls(r/255,g/255,b/255); hue*=360
    if light<.14:name,family='Đen','Đen'
    elif light>.9 and sat<.35:name,family='Trắng','Trắng'
    elif max(rgb)-min(rgb)<15 or sat<.085:
        if light>.77:name,family='Xám sáng','Xám'
        elif light<.36:name,family='Xám đậm','Xám'
        else:name,family='Xám','Xám'
    elif 65<=hue<175:
        name,family=('Xanh lá nhạt' if light>.7 else 'Xanh lá'),'Xanh lá'
    elif 175<=hue<260:
        name,family=('Xanh dương đậm' if light<.4 else 'Xanh dương'),'Xanh dương'
    elif 260<=hue<305:name,family='Tím','Tím'
    elif hue>=335 or hue<18:
        if light>.65:name,family='Hồng','Hồng'
        elif sat<.22:name,family='Nâu đỏ','Nâu'
        else:name,family='Đỏ','Đỏ'
    elif 305<=hue<335:name,family='Hồng','Hồng'
    elif light>.8:name,family='Kem','Kem'
    elif light>.6 and sat<.4:name,family='Be','Be'
    elif hue>42 and sat>.35 and light>.4:name,family='Vàng','Vàng'
    elif hue<32 and light>.5 and sat>.45:name,family='Cam','Cam'
    else:name,family=('Nâu đậm' if light<.35 else 'Nâu'),'Nâu'
    sample['color']={'name':name,'family':family,'value':'#'+''.join(f'{v:02x}' for v in rgb)}
path.write_text(json.dumps(samples,ensure_ascii=False,indent=2)+'\n')
print(collections.Counter(s['color']['family'] for s in samples))
