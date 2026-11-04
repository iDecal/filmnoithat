export interface ServiceReference {
  service: string;
  title: string;
  image: string;
  caption: string;
  material: string;
}

// Ảnh có sẵn dùng để tham khảo ứng dụng, chưa phải hồ sơ công trình đã xác nhận.
export const serviceReferences: ServiceReference[] = [
  { service: "dan-film-tu-bep", title: "Phối sắc gỗ cho hệ tủ bếp", image: "/images/blog/dan-film-noi-that-tu-bep.webp", caption: "Tham khảo cách phối cánh tủ với mặt bếp và ánh sáng. Cần kiểm tra nền, độ ẩm và vùng gần nguồn nhiệt trước khi dán.", material: "/vat-lieu/van-go/" },
  { service: "dan-film-tu-bep", title: "Tông bếp trầm, điểm nhấn gỗ sáng", image: "/images/home/interior-kitchen.webp", caption: "Gợi ý cân bằng màu tủ, mặt đá và tường bếp; màu film cần được so bằng mẫu thực tế.", material: "/vat-lieu/don-sac/" },
  { service: "dan-film-ban", title: "Mặt bàn trong không gian làm việc", image: "/images/cong-trinh/dan-film-noi-that-mat-ban.jpg", caption: "Tham khảo tỷ lệ mặt bàn và sắc gỗ trong không gian chung. Phạm vi dán cần tính cả cạnh, góc bo và vị trí phụ kiện.", material: "/vat-lieu/van-go/" },
  { service: "dan-film-ban", title: "Bàn nhỏ và mảng gỗ đồng điệu", image: "/images/blog/film-dan-noi-that-van-go.jpg", caption: "Gợi ý phối bàn với vách cho góc làm việc nhỏ. Kiểm tra nền và tần suất sử dụng khi chọn film.", material: "/vat-lieu/van-go/" },
  { service: "dan-film-tuong", title: "Vách điểm nhấn với tông trung tính", image: "/images/cong-trinh/dan-film-noi-that-nha-pho-hien-dai-mau-be-tong.webp", caption: "Tham khảo cách phối vách đầu giường với đồ nội thất. Hướng vân và vị trí nối cần được thống nhất theo kích thước thực tế.", material: "/vat-lieu/be-tong/" },
  { service: "dan-film-tuong", title: "Sắc gỗ cho góc làm việc", image: "/images/blog/film-dan-noi-that-van-go.jpg", caption: "Một hướng phối mảng vách ấm cùng nội thất sáng. Kiểm tra độ ẩm và độ bám lớp nền trước khi chọn phương án.", material: "/vat-lieu/van-go/" },
  { service: "dan-film-tran", title: "Trần sáng trong bảng màu trung tính", image: "/images/cong-trinh/dan-film-noi-that-nha-pho-hien-dai-mau-be-tong.webp", caption: "Ảnh tham khảo bố cục trần và vị trí đèn, không phải ảnh xác nhận trần đã dán film. Phương án film cần khảo sát nền và khả năng tiếp cận.", material: "/vat-lieu/van-vai/" },
  { service: "dan-film-tran", title: "Bề mặt vật liệu để so dưới ánh sáng", image: "/images/cong-trinh/banner-film-dan-noi-that.jpg", caption: "Ảnh vật liệu tham khảo, giúp bắt đầu trao đổi về màu và bề mặt; cần kiểm tra thông số phù hợp ứng dụng trên trần.", material: "/vat-lieu/be-tong/" },
  { service: "dan-film-thang-may", title: "Phối các mảng vách cabin", image: "/images/cong-trinh/dan-film-noi-that-thang-may.jpg", caption: "Tham khảo chiều vân và cách chia mảng vách. Phạm vi thi công phải được thống nhất cùng đơn vị quản lý và bảo trì.", material: "/vat-lieu/kim-loai/" },
  { service: "dan-film-thang-may", title: "Hiệu ứng kim loại cho chi tiết nội thất", image: "/images/blog/cong-trinh-dan-film-noi-that-van-kim-loai.jpg", caption: "Ảnh tham khảo hiệu ứng kim loại trong nội thất, không phải ảnh cabin. So mẫu dưới ánh sáng thực tế trước khi chọn film cho thang máy.", material: "/vat-lieu/kim-loai/" },
];
export const referencesForService = (slug: string) => serviceReferences.filter(item => item.service === slug);
