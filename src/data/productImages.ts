import { type CatalogueSample } from "./catalogue";
import { storiesForSample, storyHref } from "./projectStories";
export interface ProductImage {
  src: string; alt: string; caption: string; label: string; href: string | null;
  width: number; height: number;
}
export function imagesForProduct(sample: CatalogueSample): ProductImage[] {
  const hidden = new Set(sample.hiddenImages || []);
  const images: ProductImage[] = [{ src:sample.image, alt:sample.imageAlt || `Film dán nội thất ${sample.title.toLowerCase()} ${sample.brand} ${sample.code} — ảnh bề mặt`, caption:`Ảnh bề mặt đúng mã ${sample.code}. Màu sắc cần đối chiếu mẫu thật.`, label:"Bề mặt", href:null, width:sample.imageWidth, height:sample.imageHeight }];
  for (const photo of sample.gallery || []) {
    if (hidden.has(photo.src) || images.some(image => image.src === photo.src)) continue;
    images.push({ src: photo.src, alt: photo.alt, caption: photo.caption || `Ảnh vật liệu bổ sung cho mẫu ${sample.brand} ${sample.code}.`,
      label: "Vật liệu", href: null, width: photo.width || 1000, height: photo.height || 750 });
  }
  if (images.length >= 4) return images;
  for (const story of storiesForSample(sample)) {
    for (const photo of story.images) {
      if (hidden.has(photo.src) || images.some(image=>image.src===photo.src)) continue;
      const exact=story.sampleSlugs.includes(sample.slug);
      images.push({src:photo.src,alt:photo.alt,label:exact ? "Đúng mã" : "Tham khảo",
        caption:exact ? (story.kind === "completed" ? `Công trình thực tế dùng mã ${sample.code}.` : `Ảnh ứng dụng đúng mã ${sample.code} từ catalogue, không phải công trình do Film Nội Thất thi công.`) : `${story.title}. Ảnh cùng nhóm vật liệu, không xác nhận dùng mã ${sample.code}.`,
        href:storyHref(story),width:1100,height:750});
      if (images.length>=4) return images;
    }
  }
  return images;
}
