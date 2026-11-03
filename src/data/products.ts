export interface Product {
  slug: string;
  code: string;
  name: string;
  category: string;
  categoryHref: string;
  image: string;
  description: string;
  applications: string[];
  notes: string[];
}

export const products: Product[] = [
  {
    slug: "film-van-go-cad402", code: "CAD402", name: "Film vân gỗ CAD402",
    category: "Film vân gỗ", categoryHref: "/vat-lieu/van-go/",
    image: "/images/vat-lieu/van-go/CAD402-goc.jpg",
    description: "Mẫu film vân gỗ CAD402 để tham khảo khi làm mới cánh tủ, bàn và vách nội thất. Xem ảnh, ứng dụng gợi ý và liên hệ kiểm tra mẫu thực tế.",
    applications: ["Phối lại màu cánh tủ bếp và tủ lưu trữ.", "Trang trí bàn làm việc, kệ và vách điểm nhấn.", "Kết hợp với màu đơn sắc trong không gian nội thất."],
    notes: ["Thống nhất chiều vân giữa các cánh tủ hoặc mảng ghép trước khi cắt film.", "So sánh mẫu tại công trình dưới ánh sáng ban ngày và ánh đèn.", "Bề mặt bị ẩm, mục hoặc bong lớp phủ cần xử lý trước khi dán."],
  },
  {
    slug: "film-van-be-tong-cag816", code: "CAG816", name: "Film vân bê tông CAG816",
    category: "Film vân bê tông", categoryHref: "/vat-lieu/be-tong/",
    image: "/images/vat-lieu/be-tong/CORANCE-CAG816.jpg",
    description: "Tham khảo film vân bê tông CAG816 cho bàn, kệ và vách trang trí. Tư vấn phối mẫu, kiểm tra bề mặt và báo giá theo hạng mục thực tế.",
    applications: ["Tạo mảng nhấn cho vách trong văn phòng hoặc không gian tiếp khách.", "Làm mới bàn và quầy có bề mặt phẳng, ổn định.", "Phối cùng vân gỗ hoặc kim loại để tạo tương phản."],
    notes: ["Hiệu ứng bê tông là họa tiết trang trí; film không xử lý được tường ẩm hoặc nứt.", "Cần thử độ bám trên nền sơn và kiểm tra mối nối với mảng lớn.", "Màu hiển thị trên màn hình có thể khác mẫu vật liệu thực tế."],
  },
  {
    slug: "film-kim-loai-csm003", code: "CSM003", name: "Film kim loại CSM003",
    category: "Film kim loại", categoryHref: "/vat-lieu/kim-loai/",
    image: "/images/vat-lieu/kim-loai/CSM003.jpg",
    description: "Mẫu film kim loại CSM003 cho các chi tiết nội thất và vách trang trí. Tham khảo ứng dụng, lưu ý thi công và liên hệ nhận mẫu, báo giá.",
    applications: ["Trang trí vách cabin hoặc sảnh thang máy sau khi kiểm tra điều kiện thi công.", "Phối các chi tiết quầy, tủ và mảng nhấn trong nhà.", "Kết hợp với bề mặt vân gỗ hoặc đơn sắc."],
    notes: ["Làm sạch dầu và kiểm tra lớp nền trước khi dán lên kim loại.", "Kiểm tra chiều họa tiết và độ đồng đều giữa các tấm ghép.", "Không che bảng điều khiển, khe kỹ thuật, cảm biến hoặc thông tin an toàn của thang máy."],
  },
  {
    slug: "film-van-vai-can034", code: "CAN034", name: "Film vân vải CAN034",
    category: "Film vân vải", categoryHref: "/vat-lieu/van-vai/",
    image: "/images/vat-lieu/van-vai/CAN034.jpg",
    description: "Khám phá mẫu film vân vải CAN034 cho cánh tủ và vách nội thất. Gợi ý phối vật liệu, lưu ý vệ sinh và tư vấn theo bề mặt thực tế.",
    applications: ["Trang trí cánh tủ quần áo và tủ lưu trữ.", "Tạo mảng nhấn cho vách đầu giường và khu vực tiếp khách.", "Phối với vân gỗ trong không gian nghỉ ngơi."],
    notes: ["Đây là film có họa tiết vải, không phải vật liệu bọc vải.", "Nên xem mẫu để đánh giá độ nổi của họa tiết và khả năng vệ sinh.", "Chọn phương án nối vân trước khi thi công mảng rộng."],
  },
];

export const productHref = (product: Product) => `/san-pham/${product.slug}/`;
export const findProducts = (slugs: string[]) => slugs.map(slug => {
  const product = products.find(item => item.slug === slug);
  if (!product) throw new Error(`Unknown product: ${slug}`);
  return product;
});
