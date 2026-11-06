import type { CatalogueSample } from "./catalogue";
const productKeywords: Record<string,string> = {
  "van-go":"Film dán nội thất vân gỗ", "don-sac":"Film dán nội thất đơn sắc",
  "da-cam-thach":"Film dán nội thất vân đá", "kim-loai":"Film dán nội thất kim loại",
  "van-vai":"Phim dán nội thất vân vải", "be-tong":"Film dán nội thất bê tông",
};
export function productSeoTitle(sample: CatalogueSample) {
  let keyword = productKeywords[sample.category];
  if (["Artificial Leather","Leather","Basic"].includes(sample.group)) keyword="Film dán nội thất vân da";
  if (sample.group === "Paper Weave") keyword="Phim dán nội thất vân đan";
  if (sample.group === "Diaper") keyword="Film dán nội thất hiệu ứng";
  return `${keyword} ${sample.code} – Mẫu ${sample.brand} & tư vấn`;
}
const categoryTitles: Record<string,string> = {
  "van-go":"Film dán nội thất vân gỗ – Chọn mẫu INFEEL & Corance",
  "don-sac":"Film dán nội thất đơn sắc – Chọn mẫu INFEEL & Corance",
  "da-cam-thach":"Film dán nội thất vân đá – Chọn mẫu INFEEL & Corance",
  "kim-loai":"Film dán nội thất kim loại – Chọn mẫu INFEEL & Corance",
  "van-vai":"Phim dán nội thất vân vải – Chọn mẫu INFEEL & Corance",
  "be-tong":"Film dán nội thất bê tông INFEEL – Bộ sưu tập & tư vấn",
  "trang-guong":"Film dán nội thất tráng gương – Chọn mẫu & tư vấn phù hợp",
};
export const materialSeoTitle = (slug: string) => categoryTitles[slug];
