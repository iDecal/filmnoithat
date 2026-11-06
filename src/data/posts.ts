export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
  intro: string;
  sections: { id: string; title: string; paragraphs: string[]; bullets?: string[] }[];
  materials: string[];
  services: string[];
}

export const posts: Post[] = [
  {
    slug: "cach-chon-film-noi-that",
    title: "Cách chọn film dán nội thất: Cẩm nang cho từng bề mặt",
    description: "Chọn film nội thất theo nền vật liệu, công năng và ánh sáng. Hướng dẫn so sánh mẫu vân gỗ, vải, bê tông, kim loại trước khi mua hoặc thi công.",
    date: "2026-11-03", image: "/images/cong-trinh/banner-film-dan-noi-that.jpg",
    intro: "Chọn film nội thất không chỉ là chọn một màu đẹp trên catalogue. Cùng một họa tiết có thể cho cảm giác khác nhau khi đặt lên cánh tủ, mặt bàn hoặc vách có đèn hắt. Một lựa chọn phù hợp cần bắt đầu từ hiện trạng bề mặt, sau đó mới đến công năng và cách phối màu.",
    sections: [
      { id: "kiem-tra-nen", title: "1. Bắt đầu từ bề mặt cần dán", paragraphs: ["Ghi lại vật liệu nền: gỗ có lớp phủ, kim loại, kính, tường sơn hay vách hoàn thiện. Sau đó kiểm tra lớp nền có khô, phẳng và ổn định không. Phần gỗ trương nở, sơn phấn hóa hoặc tường thấm cần được xử lý trước; một lớp film mới không khắc phục được các nguyên nhân này.", "Nếu chưa rõ khả năng bám dính, hãy gửi ảnh cận cảnh và yêu cầu đánh giá hoặc thử trên một vùng phù hợp. Bề mặt càng nhiều góc, nẹp và mối ghép càng cần khảo sát kỹ trước khi tính lượng vật tư."] },
      { id: "chon-theo-cong-nang", title: "2. Chọn theo công năng, không chỉ theo họa tiết", paragraphs: ["Mặt bàn thường xuyên tiếp xúc đồ vật có yêu cầu khác vách sau sofa. Tủ bếp cần tính đến dầu mỡ, hơi nước và khoảng cách đến nguồn nhiệt. Cabin thang máy cần thêm sự thống nhất với ban quản lý và hồ sơ vật liệu theo yêu cầu công trình."], bullets: ["Bàn và kệ: hỏi rõ hướng dẫn vệ sinh, xử lý mép và cách dùng tấm lót.", "Tủ bếp: kiểm tra nền gần bồn rửa, tay nắm và bếp nấu.", "Vách và trần: xem cách bố trí vân, mối nối và điều kiện tiếp cận khi thi công."] },
      { id: "so-sanh-mau", title: "3. Đặt mẫu cạnh nội thất hiện có", paragraphs: ["Vân gỗ, vân bê tông và vân vải là những hướng tham khảo khác nhau. Đừng quyết định chỉ từ ảnh sản phẩm: màu màn hình, độ sáng và cân bằng trắng của ảnh đều có thể làm thay đổi cảm nhận.", "Đặt mẫu cạnh sàn, tường và mặt đá sẵn có. Xem vào ban ngày lẫn lúc bật đèn, ở góc nhìn gần và xa. Với vân có hướng, thử đặt theo chiều đứng và ngang để biết cách bố trí nào phù hợp trước khi cắt."] },
      { id: "kiem-tra-thong-tin", title: "4. Xác nhận thông tin trước khi đặt hàng", paragraphs: ["Cần xác nhận mã film, khổ rộng, độ dày, lô hàng và các giới hạn sử dụng theo catalogue hoặc tài liệu của nhà cung cấp. Không mặc định mọi film đều chống cháy, chịu nhiệt hoặc chống xước như nhau.", "Nếu thuê thi công, yêu cầu báo giá thể hiện vật tư, nhân công, xử lý nền, tháo lắp và vị trí mối nối. Nếu chỉ mua vật liệu, trao đổi thêm cách bảo quản và lượng dư phù hợp cho việc canh vân, bo mép. Việc đo đạc và chốt mẫu trước giúp giảm sai lệch khi hoàn thiện."] },
    ],
    materials: ["van-go", "be-tong", "van-vai"],
    services: ["dan-film-noi-that", "dan-film-tuong"],
  },
  {
    slug: "dan-film-tu-bep-can-luu-y-gi",
    title: "Có nên dán film tủ bếp cũ? Những lưu ý trước khi làm",
    description: "Checklist trước khi dán film tủ bếp: kiểm tra cốt tủ, làm sạch dầu mỡ, xem mẫu, xử lý mép cánh và thống nhất phạm vi báo giá, bàn giao.",
    date: "2026-11-03", image: "/images/blog/dan-film-noi-that-tu-bep.webp",
    intro: "Khi tủ bếp còn sử dụng tốt nhưng màu đã cũ, dán film là một phương án có thể cân nhắc. Tuy nhiên, khu vực bếp chịu tác động của hơi nước, dầu mỡ và nhiệt, nên việc chuẩn bị bề mặt quan trọng hơn lựa chọn một họa tiết đẹp. Dưới đây là các điểm nên kiểm tra cùng đơn vị thi công.",
    sections: [
      { id: "kiem-tra-cot-tu", title: "1. Kiểm tra cốt tủ và nguyên nhân xuống cấp", paragraphs: ["Mở các cánh tủ, quan sát cạnh dưới và vùng gần chậu rửa. Nếu thấy gỗ nở, mép mục, bề mặt mềm hoặc mùi ẩm, cần tìm nguyên nhân và sửa trước. Phủ film lên vùng hỏng có thể che tạm dấu hiệu nhưng không làm kết cấu tốt hơn.", "Ngoài cốt tủ, kiểm tra bản lề và khe hở giữa các cánh. Cánh bị xệ hoặc cọ nhau cần được chỉnh trước để cạnh film không bị tác động ngay sau khi bàn giao."] },
      { id: "dau-mo", title: "2. Làm sạch dầu mỡ và đánh giá lớp phủ cũ", paragraphs: ["Dầu mỡ thường tích tụ quanh tay nắm, cạnh cánh và vùng gần bếp. Cách làm sạch cần phù hợp với lớp nền; không nên tùy tiện dùng dung môi mạnh có thể làm hỏng sơn hoặc nhựa phủ.", "Sau khi làm sạch và để khô, kỹ thuật viên cần kiểm tra lớp phủ cũ còn bám chắc không. Với nền chưa rõ đặc tính, việc thử độ bám trên vùng phù hợp giúp đánh giá trước khi thi công toàn bộ."] },
      { id: "chon-mau", title: "3. Chọn mẫu theo ánh sáng và cách sử dụng bếp", paragraphs: ["Mẫu vân gỗ có thể dùng để tham khảo khi phối cánh tủ với mặt đá và tường bếp. Nếu muốn thêm điểm nhấn, xem mẫu kim loại và so sánh trực tiếp dưới ánh sáng trong bếp. Đây là gợi ý phối vật liệu, không phải khẳng định mọi mã đều phù hợp mọi vị trí.", "Hãy xác nhận giới hạn về nhiệt, hơi nước và chất vệ sinh của mã film đã chọn. Không xem film trang trí như lớp chống cháy hoặc đặt bề mặt film tiếp xúc trực tiếp với nguồn nhiệt vượt hướng dẫn vật liệu."] },
      { id: "chot-pham-vi", title: "4. Chốt rõ phạm vi thi công và báo giá", paragraphs: ["Báo giá nên cho biết dán mặt ngoài hay cả cạnh và mặt trong, có tháo tay nắm hay cánh tủ không, ai chịu trách nhiệm xử lý lớp nền và lắp lại phụ kiện. Những khác biệt này làm thay đổi khối lượng công việc, vì vậy một đơn giá theo diện tích chưa đủ để so sánh."], bullets: ["Gửi ảnh tổng thể và ảnh cận cảnh vùng ẩm, bong hoặc trầy.", "Ghi số lượng cánh, kích thước và phần nội thất muốn giữ nguyên.", "Thống nhất giờ làm việc và thời gian bếp cần ngừng sử dụng.", "Xác nhận cách nghiệm thu, điều kiện bảo hành và hướng dẫn chăm sóc bằng văn bản."] },
      { id: "nghiem-thu", title: "5. Kiểm tra khi bàn giao và sử dụng đúng cách", paragraphs: ["Quan sát mối nối, góc, mép cánh và khu vực quanh tay nắm. Đóng mở các cánh để kiểm tra độ cọ sát và xác nhận các phụ kiện hoạt động bình thường. Nếu có điểm bất thường, ghi nhận cùng đơn vị thi công thay vì tự bóc hoặc hơ nóng film.", "Trong quá trình sử dụng, lau vết bẩn bằng khăn mềm và sản phẩm vệ sinh được phép. Xử lý sớm nước rò từ chậu rửa và tránh chà nhám bề mặt. Việc chăm sóc cần theo hướng dẫn của đúng mã film và lớp nền bên dưới."] },
    ],
    materials: ["van-go", "kim-loai"],
    services: ["dan-film-tu-bep", "dan-film-ban"],
  },
  {
    slug: "bao-gia-dan-film",
    title: "Giá dán film nội thất tính thế nào? Cách so sánh báo giá",
    description: "Hiểu cách báo giá dán film nội thất: mã vật liệu, khối lượng, hao hụt, xử lý nền, góc cạnh và tháo lắp. Checklist để so sánh báo giá rõ ràng.",
    date: "2026-11-03", image: "/images/cong-trinh/huong-dan-tu-dan-film-noi-that-DIY.jpg",
    intro: "Hai công trình có cùng diện tích nhìn thấy vẫn có thể nhận báo giá khác nhau. Nguyên nhân thường nằm ở mã film, cách bố trí vân, tình trạng lớp nền và số chi tiết cần xử lý. Thay vì chỉ hỏi một giá theo mét vuông, hãy làm rõ những phần việc thực sự được tính trong báo giá.",
    sections: [
      { id: "vat-tu", title: "1. Mã film và lượng vật tư thực tế", paragraphs: ["Giá vật tư phụ thuộc mã film, khổ cuộn, nguồn cung và lượng cần đặt. Diện tích hoàn thiện không phải lúc nào cũng bằng lượng vật tư phải cắt: chiều vân, cách ghép mảng và phần bo mép có thể tạo hao hụt.", "Với tủ nhiều cánh hoặc vách có họa tiết định hướng, cần có cách chia tấm trước khi tính vật tư. Hãy hỏi báo giá đang tính theo mét dài, mét vuông hay trọn hạng mục để tránh so sánh các đơn vị khác nhau."] },
      { id: "nen-va-nhan-cong", title: "2. Xử lý nền và độ phức tạp của chi tiết", paragraphs: ["Mặt bàn phẳng ít góc có điều kiện khác cánh tủ có nẹp, trần cao hoặc cabin thang máy. Bóc lớp cũ, làm sạch dầu, sửa nền và tháo phụ kiện đều có thể phát sinh thời gian và vật tư ngoài công dán.", "Đơn vị khảo sát cần chỉ ra vùng nền chưa phù hợp và phần việc nằm ngoài phạm vi dán film. Các yêu cầu tiếp cận công trình, giờ thi công hoặc phối hợp bảo trì cũng nên được ghi rõ từ đầu."] },
      { id: "so-sanh-bao-gia", title: "3. So sánh các báo giá trên cùng một phạm vi", paragraphs: ["Một báo giá ngắn có thể chưa bao gồm xử lý nền hoặc tháo lắp, trong khi báo giá khác đã tính trọn phần việc đó. Muốn so sánh hợp lý, cần dùng cùng mã vật liệu và cùng mô tả hiện trạng."], bullets: ["Mã film, đơn vị tính và khối lượng dự kiến.", "Phạm vi dán, chiều vân và vị trí mối nối.", "Vật tư, nhân công, xử lý nền và tháo lắp phụ kiện.", "Chi phí vận chuyển, thuế và các khoản ngoài phạm vi nếu có.", "Tiến độ, cách nghiệm thu, điều kiện bảo hành và thanh toán."] },
      { id: "gui-thong-tin", title: "4. Gửi gì để nhận tư vấn sát hiện trạng?", paragraphs: ["Chuẩn bị ảnh tổng thể, ảnh cận cảnh góc cạnh và vùng hư hỏng. Gửi kích thước, địa điểm công trình, công năng sử dụng và thời gian mong muốn. Nếu đã có mẫu yêu thích, cung cấp mã hoặc ảnh tham khảo, đồng thời đề nghị xem mẫu thực tế trước khi chốt.", "Bạn có thể tham khảo vân gỗ hoặc vân bê tông, sau đó trao đổi mã phù hợp với hiện trạng. Các nhóm vật liệu trên website không công bố một mức giá cố định: giá và thông số cần được xác nhận theo vật tư và phạm vi thi công tại thời điểm đặt hàng."] },
      { id: "chot-truoc-thi-cong", title: "5. Chốt thay đổi trước khi thi công", paragraphs: ["Khi khảo sát thực tế phát hiện nền hỏng hoặc yêu cầu tháo lắp mới, cần cập nhật phạm vi và báo giá trước khi thực hiện. Việc thống nhất bằng văn bản giúp cả hai bên kiểm tra lúc bàn giao và hạn chế hiểu khác nhau về công việc đã bao gồm.", "Film chỉ là một phần của giải pháp hoàn thiện. Với nội thất đã xuống cấp nặng, hãy so sánh thêm phương án sửa hoặc thay mới thay vì mặc định dán film luôn là lựa chọn phù hợp nhất."] },
    ],
    materials: ["van-go", "be-tong"],
    services: ["dan-film-noi-that", "dan-film-tu-bep", "dan-film-thang-may"],
  },
];

export const postHref = (post: Post) => `/blog/${post.slug}/`;
export const formatDate = (date: string) => new Intl.DateTimeFormat("vi-VN", { dateStyle: "long", timeZone: "Asia/Ho_Chi_Minh" }).format(new Date(`${date}T00:00:00+07:00`));
