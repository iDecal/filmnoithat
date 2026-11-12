export const brands = [
  { slug: "corance", name: "Corance", description: "Khám phá các mẫu Corance theo bề mặt, tông màu và dòng vật liệu. Xem ảnh, quy cách và giá trên từng sản phẩm.", image: "/images/vat-lieu/van-go/CAD402.jpg" },
  { slug: "toda", name: "TODA", description: "Tìm mẫu TODA cho không gian của bạn: từ đơn sắc, vân gỗ đến kim loại và các bề mặt khác. Lọc theo nhu cầu và đối chiếu mẫu thực tế.", image: "/images/blog/tu-bep/film-noi-that-tu-bep-van-go-trung-tinh-voi-dao-bep-va-ghe-tron.webp" },
  { slug: "infeel", name: "INFEEL", description: "Duyệt bộ sưu tập INFEEL theo nhóm vật liệu, dòng sản phẩm và tông màu. Giá niêm yết được tính theo mét dài trên từng mẫu.", image: "/images/cong-trinh/banner-film-dan-noi-that.jpg" },
] as const;
export type Brand = typeof brands[number];
export const brandHref = (brand: Brand) => `/thuong-hieu/${brand.slug}/`;
