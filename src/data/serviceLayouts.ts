interface ServiceLayout {
  accent: string;
  lead: string;
  caption: string;
  scopeTitle: string;
  scope: { title: string; text: string }[];
}

const layouts: Record<string, ServiceLayout> = {
  "dan-film-noi-that": {
    accent: "Giữ lại điều thân quen.",
    lead: "Từ một mặt bàn đến cả hệ tủ, cùng chọn vật liệu và phương án làm mới phù hợp với những gì bạn đang có.",
    caption: "Bắt đầu từ vật liệu, hoàn thiện theo không gian.",
    scopeTitle: "Bắt đầu từ bề mặt bạn muốn thay đổi.",
    scope: [],
  },
  "dan-film-tu-bep": {
    accent: "Ấm lại góc bếp quen.",
    lead: "Đổi sắc cánh tủ, phối lại chất liệu và làm mới cảm giác trong bếp. Phương án bắt đầu từ việc kiểm tra cốt tủ, độ ẩm và các chi tiết sử dụng hằng ngày.",
    caption: "Tham khảo cách phối sắc gỗ trong không gian bếp.",
    scopeTitle: "Nhìn kỹ từng phần của hệ tủ.",
    scope: [
      { title: "Cánh tủ & mặt ngoài", text: "Xác định phần muốn đổi màu, chiều vân và sự hài hòa với mặt đá, tường bếp hiện có." },
      { title: "Cạnh cánh & phụ kiện", text: "Kiểm tra bản lề, tay nắm và khe mở để thống nhất phạm vi tháo lắp, xử lý mép." },
      { title: "Vùng gần nước & nhiệt", text: "Khảo sát phần gần chậu rửa và bếp nấu, làm rõ những vùng cần sửa trước khi dán." },
    ],
  },
  "dan-film-ban": {
    accent: "Đổi bề mặt. Giữ công năng.",
    lead: "Làm mới bàn và kệ còn kết cấu tốt bằng một tông gỗ, bê tông hoặc chất liệu phù hợp với cách bạn sử dụng.",
    caption: "Tham khảo tông màu và tỷ lệ trong không gian làm việc.",
    scopeTitle: "Một mặt bàn, nhiều chi tiết cần tính trước.",
    scope: [
      { title: "Mặt bàn", text: "Kiểm tra độ phẳng, lớp phủ cũ và những vùng trầy, lõm hoặc bị ngấm nước." },
      { title: "Cạnh & góc bo", text: "Khảo sát độ dày, đường bo và mặt dưới để tính cách kết thúc film và vị trí nối." },
      { title: "Kệ & quầy", text: "Phối các mảng đứng với mặt bàn, đồng thời tính đến phụ kiện và tần suất tiếp xúc." },
    ],
  },
  "dan-film-tuong": {
    accent: "Một mảng vách. Một điểm nhìn.",
    lead: "Tạo chiều sâu cho phòng khách, góc làm việc hay phòng ngủ bằng một chất liệu có chủ đích, sau khi kiểm tra lớp nền và ánh sáng.",
    caption: "Tham khảo vách điểm nhấn và bảng màu trung tính.",
    scopeTitle: "Chọn vị trí trước, chọn họa tiết sau.",
    scope: [
      { title: "Vách điểm nhấn", text: "Chọn mảng nhìn chính, cân đối diện tích film với đồ nội thất và khoảng trống xung quanh." },
      { title: "Góc nối & đường viền", text: "Xác định chiều vân, vị trí ghép và cách xử lý quanh ổ cắm hoặc nẹp trang trí." },
      { title: "Nền sơn & độ ẩm", text: "Kiểm tra lớp sơn, vết nứt và dấu thấm trước khi chốt phương án chuẩn bị bề mặt." },
    ],
  },
  "dan-film-tran": {
    accent: "Hoàn thiện cả góc nhìn phía trên.",
    lead: "Đưa chất liệu vào mảng trần một cách cân nhắc: kiểm tra nền, bố trí mối nối và giữ khả năng tiếp cận các thiết bị kỹ thuật.",
    caption: "Mẫu vật liệu tham khảo để trao đổi phương án trần.",
    scopeTitle: "Tính cả bề mặt và điều kiện thi công trên cao.",
    scope: [
      { title: "Mảng trần trang trí", text: "Xác định diện tích, loại nền và vùng cần tạo điểm nhấn thay vì mặc định phủ toàn bộ trần." },
      { title: "Đèn & cửa thăm", text: "Ghi nhận các thiết bị, đường viền và vị trí bảo trì cần được bảo vệ hoặc tiếp cận." },
      { title: "Chiều cao & lối tiếp cận", text: "Thống nhất thiết bị làm việc, giờ thi công và cách bảo vệ nội thất phía dưới." },
    ],
  },
  "dan-film-thang-may": {
    accent: "Chỉn chu trong từng mảng vách.",
    lead: "Làm mới bề mặt trang trí cabin và sảnh với phạm vi rõ ràng, có phối hợp cùng ban quản lý và đơn vị bảo trì liên quan.",
    caption: "Hình tham khảo cho cách phối bề mặt cabin thang máy.",
    scopeTitle: "Xác định đúng phần được phép thi công.",
    scope: [
      { title: "Vách cabin", text: "Khảo sát nền kim loại, các tấm ghép và đường nẹp để thống nhất hướng vân, vị trí kết thúc film." },
      { title: "Chi tiết trang trí", text: "Phân biệt phần hoàn thiện bề mặt với những bộ phận thuộc vận hành và an toàn thang máy." },
      { title: "Phối hợp công trình", text: "Làm rõ lịch dừng khai thác, yêu cầu vật liệu và trách nhiệm bảo vệ thiết bị trước khi làm." },
    ],
  },
};

export function getServiceLayout(slug: string): ServiceLayout {
  const layout = layouts[slug];
  if (!layout) throw new Error(`Missing service layout: ${slug}`);
  return layout;
}
