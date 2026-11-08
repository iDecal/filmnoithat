import type { CatalogueSample } from "./catalogue";
const productKeywords: Record<string,string> = {
  "van-go":"Film dán nội thất vân gỗ", "don-sac":"Film dán nội thất đơn sắc",
  "da-cam-thach":"Film dán nội thất vân đá", "kim-loai":"Film dán nội thất kim loại",
  "van-vai":"Film dán nội thất vân vải", "be-tong":"Film dán nội thất bê tông",
  "trang-guong":"Film dán nội thất tráng gương",
};
export function productKeyword(sample: CatalogueSample) {
  let keyword = productKeywords[sample.category];
  if (["Artificial Leather","Leather","Basic"].includes(sample.group)) keyword="Film dán nội thất vân da";
  if (sample.group === "Paper Weave") keyword="Film dán nội thất vân đan";
  if (sample.group === "Diaper") keyword="Film dán nội thất hiệu ứng";
  return keyword;
}
export const productHeading = (sample: CatalogueSample) => `${productKeyword(sample)} ${sample.code} — ${sample.color.name.toLowerCase()}`;
export function productSeoTitle(sample: CatalogueSample) {
  return `${productKeyword(sample)} ${sample.code} – Mẫu ${sample.brand} & tư vấn`;
}
const categoryTitles: Record<string,string> = {
  "van-go":"Film dán nội thất vân gỗ – Mẫu INFEEL, Corance & TODA",
  "don-sac":"Film dán nội thất đơn sắc – Mẫu INFEEL, Corance & TODA",
  "da-cam-thach":"Film dán nội thất vân đá – Mẫu INFEEL, Corance & TODA",
  "kim-loai":"Film dán nội thất kim loại – Mẫu INFEEL, Corance & TODA",
  "van-vai":"Film dán nội thất vân vải – Mẫu INFEEL, Corance & TODA",
  "be-tong":"Film dán nội thất bê tông – Chọn mẫu & tư vấn",
  "trang-guong":"Film dán nội thất tráng gương – Chọn mẫu & tư vấn phù hợp",
};
export const materialSeoTitle = (slug: string) => categoryTitles[slug];

export const materialHeading = (name: string) => name.replace(/^Film /, "Film dán nội thất ");
