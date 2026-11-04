export interface Service {
  slug: string;
  name: string;
  title: string;
  description: string;
  intro: string;
  image: string;
  sections: { title: string; text: string }[];
  preparation: string[];
  materials: string[];
  faqs: { question: string; answer: string }[];
}

export const services: Service[] = [
  {
    slug: "dan-film-noi-that", name: "Dán film nội thất",
    title: "Dán film nội thất TP.HCM & Bình Dương | iDecal",
    description: "Dịch vụ dán film nội thất cho bàn, tủ bếp, tường, trần và thang máy tại TP.HCM, Bình Dương. Xem mẫu film, quy trình khảo sát và yêu cầu báo giá.",
    intro: "Dán film nội thất là cách thay đổi màu và họa tiết bề mặt bằng lớp film trang trí. Phương án này phù hợp khi kết cấu nội thất còn tốt và bạn muốn làm mới diện mạo mà chưa cần thay toàn bộ bàn, tủ hoặc vách. iDecal tư vấn vật liệu và thi công theo hiện trạng tại TP.HCM và Bình Dương.",
    image: "/images/cong-trinh/banner-film-dan-noi-that.jpg",
    sections: [
      { title: "Những bề mặt có thể cân nhắc dán film", text: "Bàn, cánh tủ, kệ, vách và một số chi tiết kim loại có thể được khảo sát để dán film khi nền khô, ổn định và đủ độ phẳng. Không phải mọi lớp sơn hay gỗ đều phù hợp; cần kiểm tra độ bám và tình trạng lớp phủ cũ trước khi chọn phương án." },
      { title: "Chọn vật liệu theo công năng", text: "Vân gỗ tạo cảm giác gần gũi, vân bê tông phù hợp với mảng nhấn, còn vân vải và kim loại giúp phối các chi tiết nội thất. Ngoài hình ảnh, hãy xem mẫu thực tế, cách vệ sinh và thông số kỹ thuật của mã film dự kiến dùng." },
      { title: "Khi nào nên sửa hoặc thay mới trước?", text: "Film là lớp hoàn thiện trang trí, không khắc phục được gỗ mục, cốt tủ trương nở, tường thấm nước hoặc kim loại gỉ nặng. Những phần hư hỏng cần được sửa, làm khô và kiểm tra lại trước khi thi công. Với kết cấu xuống cấp, thay mới có thể phù hợp hơn." },
    ],
    preparation: ["Ảnh tổng thể và ảnh cận cảnh các góc, mép, vùng bong tróc.", "Kích thước dự kiến, vị trí công trình và thời gian có thể thi công.", "Mẫu màu mong muốn, yêu cầu giữ lại hoặc tháo lắp phụ kiện."],
    materials: ["van-go", "be-tong", "kim-loai", "van-vai"],
    faqs: [
      { question: "Dán film nội thất có cần tháo đồ cũ không?", answer: "Tùy hạng mục, có thể cần tháo tay nắm, cánh tủ hoặc phụ kiện để xử lý mép. Phạm vi tháo lắp cần được thống nhất sau khảo sát, không áp dụng một quy trình giống nhau cho mọi công trình." },
      { question: "Giá dán film nội thất được tính thế nào?", answer: "Báo giá phụ thuộc mã film, lượng vật tư, hiện trạng nền, số góc cạnh, mối nối, công tháo lắp và điều kiện tiếp cận. Cần xác nhận rõ phần vật tư, nhân công và xử lý bề mặt trong báo giá." },
    ],
  },
  {
    slug: "dan-film-tu-bep", name: "Dán film tủ bếp",
    title: "Dán film tủ bếp tại TP.HCM, Bình Dương | iDecal",
    description: "Làm mới tủ bếp bằng film vân gỗ hoặc kim loại. Tìm hiểu điều kiện bề mặt, xử lý dầu mỡ, mẫu film tham khảo và cách yêu cầu báo giá thi công.",
    intro: "Dán film tủ bếp giúp phối lại màu cánh tủ và các phần hoàn thiện bên ngoài khi cốt tủ vẫn ổn định. Trước khi chọn film dán tủ bếp, cần kiểm tra dầu mỡ, độ ẩm, cạnh cánh và khu vực gần bếp nấu, bồn rửa để xác định phạm vi thi công phù hợp.",
    image: "/images/blog/dan-film-noi-that-tu-bep.webp",
    sections: [
      { title: "Tủ bếp nào có thể dán film?", text: "Cánh tủ còn phẳng, khô và không bong lớp nền là điểm khởi đầu phù hợp để khảo sát. MDF bị trương nở, mép mục hoặc lớp phủ cũ mất độ bám cần được sửa trước. Việc phủ film lên phần hư hỏng chỉ che bề mặt và có thể làm giảm độ bền hoàn thiện." },
      { title: "Xử lý dầu mỡ và các mép cánh", text: "Dầu mỡ tích tụ quanh tay nắm và bếp nấu có thể cản trở độ bám. Kỹ thuật viên cần làm sạch bằng phương pháp phù hợp với lớp nền, để khô rồi kiểm tra lại. Vị trí bản lề, cạnh cánh và khe mở phải được tính trước để film không cọ sát khi sử dụng." },
      { title: "Chọn film dán tủ bếp theo thói quen sử dụng", text: "Vân gỗ có thể phối với mặt đá và tường bếp sẵn có; film kim loại phù hợp khi cần điểm nhấn. Hãy xem mẫu dưới ánh sáng bếp và kiểm tra hướng dẫn của nhà cung cấp về nhiệt, hơi nước và vệ sinh. Film trang trí không phải lớp chống cháy hoặc giải pháp xử lý thấm." },
    ],
    preparation: ["Chụp cả tủ trên, tủ dưới và cận cảnh khu vực bồn rửa.", "Gửi số lượng cánh, kích thước và ảnh tay nắm, bản lề.", "Báo trước các vùng ẩm, bong lớp phủ hoặc gần nguồn nhiệt."],
    materials: ["van-go", "kim-loai"],
    faqs: [
      { question: "Có thể dán film lên tủ bếp bị phồng không?", answer: "Không nên dán trực tiếp lên vùng cốt tủ đã phồng hoặc mục. Cần xử lý nguyên nhân ẩm và sửa hay thay phần hỏng trước khi đánh giá khả năng dán." },
      { question: "Có phải tháo toàn bộ tủ bếp khi dán?", answer: "Không nhất thiết. Tùy thiết kế, kỹ thuật viên có thể chỉ tháo cánh hoặc tay nắm. Phạm vi tháo lắp và thời gian ngừng sử dụng bếp cần được chốt khi khảo sát." },
    ],
  },
  {
    slug: "dan-film-ban", name: "Dán film bàn & kệ",
    title: "Dán film mặt bàn, bàn làm việc & kệ | iDecal",
    description: "Tư vấn dán film mặt bàn, bàn làm việc và kệ tại TP.HCM, Bình Dương. Xem mẫu vân gỗ, bê tông và lưu ý về mép bàn, vệ sinh, nhiệt khi sử dụng.",
    intro: "Dán film mặt bàn và kệ là phương án làm mới bề mặt trang trí khi phần khung, cốt và liên kết vẫn còn tốt. Với bàn làm việc hoặc quầy, việc chọn mã film cần tính đến tần suất sử dụng, khả năng vệ sinh và các cạnh thường xuyên tiếp xúc.",
    image: "/images/cong-trinh/dan-film-noi-that-mat-ban.jpg",
    sections: [
      { title: "Khảo sát mặt bàn trước khi thi công", text: "Các vết lõm, gờ nối, lớp phủ bong và khu vực ngấm nước cần được xử lý trước. Film mỏng có thể làm lộ khuyết điểm thay vì che kín chúng. Với mặt kính, đá hoặc sơn đặc biệt, nên kiểm tra độ bám của mã film trên nền thực tế." },
      { title: "Mép bàn và góc bo quyết định độ hoàn thiện", text: "Kỹ thuật viên cần đánh giá hình dáng góc, khoảng trống phía dưới và vị trí mối nối. Bàn có nhiều bo cong hoặc phụ kiện âm mặt bàn thường cần cách cắt và xử lý khác bàn phẳng. Những chi tiết này cũng ảnh hưởng đến lượng vật tư và nhân công." },
      { title: "Sử dụng mặt bàn sau khi dán film", text: "Dùng tấm lót khi đặt vật nóng, không cắt trực tiếp trên film và tránh kéo lê đồ có cạnh sắc. Vệ sinh bằng khăn mềm theo hướng dẫn của mã vật liệu. Nếu bàn dùng cho thao tác nặng hoặc thường xuyên tiếp xúc nhiệt cao, nên cân nhắc một lớp hoàn thiện khác." },
    ],
    preparation: ["Gửi kích thước mặt bàn, độ dày và ảnh các cạnh.", "Cho biết bàn dùng làm việc, trưng bày hay phục vụ ăn uống.", "Đánh dấu vị trí lỗ đi dây, phụ kiện và vùng trầy hoặc phồng."],
    materials: ["van-go", "be-tong"],
    faqs: [
      { question: "Film dán mặt bàn có chống được dao cắt không?", answer: "Không nên xem film trang trí như mặt bàn cắt. Cần dùng thớt hoặc tấm lót và kiểm tra giới hạn sử dụng của từng mã film." },
      { question: "Có dán riêng mặt bàn, giữ nguyên chân bàn được không?", answer: "Có thể khảo sát phương án chỉ dán mặt và cạnh khi kết cấu còn tốt. Phạm vi dán, vị trí kết thúc film và việc tháo phụ kiện cần được thống nhất trước." },
    ],
  },
  {
    slug: "dan-film-tuong", name: "Dán film tường",
    title: "Dán film tường, vách trang trí nội thất | iDecal",
    description: "Dán film tường và vách trang trí tại TP.HCM, Bình Dương. Xem mẫu vân gỗ, vải, bê tông; tìm hiểu xử lý nền, độ ẩm và mối nối trước khi thi công.",
    intro: "Dán film tường và vách trang trí giúp tạo mảng nhấn cho phòng khách, phòng ngủ hoặc văn phòng. Chất lượng lớp nền, độ ẩm và cách bố trí mối nối cần được xem xét trước khi chọn họa tiết film và diện tích thi công.",
    image: "/images/cong-trinh/dan-film-noi-that-nha-pho-hien-dai-mau-be-tong.webp",
    sections: [
      { title: "Phân biệt vách phẳng và tường sơn cũ", text: "Vách có nền phẳng, ổn định có điều kiện khác tường sơn đã phấn hóa hoặc bong tróc. Cần kiểm tra độ bám của lớp sơn, độ ẩm và các khe nứt. Tường thấm, mốc hoặc chưa khô phải xử lý nguyên nhân trước; film không thay thế lớp chống thấm." },
      { title: "Bố trí vân và mối nối trên mảng rộng", text: "Với vân gỗ, vân vải hoặc bê tông, hãy thống nhất chiều vân và vị trí nối theo khổ film thực tế. Nên xem thử mẫu cạnh ánh sáng hắt và đường viền trang trí để dự tính độ lộ của mối nối, đặc biệt ở vách có đèn rọi." },
      { title: "Chọn bề mặt theo khu vực sử dụng", text: "Vách sau sofa và vách đầu giường có nhu cầu khác khu vực hành lang thường xuyên va chạm. Có thể phối vân gỗ, vân vải hoặc bê tông cùng màu đơn sắc. Việc lựa chọn cần cân đối khả năng vệ sinh, mức độ tiếp xúc và thông số của từng mã vật liệu." },
    ],
    preparation: ["Gửi chiều rộng, chiều cao và ảnh toàn bộ vách.", "Cho biết tường sơn, vách gỗ hay vật liệu nền khác.", "Chụp vùng ẩm, nứt, ổ cắm, góc bo và vị trí đèn hắt."],
    materials: ["van-vai", "be-tong", "van-go"],
    faqs: [
      { question: "Có dán film lên tường đang bị ẩm không?", answer: "Không nên. Cần xử lý nguồn ẩm, để nền khô và kiểm tra lớp hoàn thiện trước khi khảo sát lại phương án dán film." },
      { question: "Dán film tường có nhìn thấy mối nối không?", answer: "Mức độ nhìn thấy phụ thuộc họa tiết, khổ vật liệu, ánh sáng và cách ghép. Vị trí mối nối cần được trao đổi trước thay vì mặc định bề mặt sẽ hoàn toàn liền mạch." },
    ],
  },
  {
    slug: "dan-film-tran", name: "Dán film trần",
    title: "Dán film trần nhà, trần trang trí | iDecal",
    description: "Khảo sát dán film trần nhà tại TP.HCM, Bình Dương. Tư vấn nền trần, vị trí đèn, phương án tiếp cận và mẫu film vân vải, bê tông để tham khảo.",
    intro: "Dán film trần nhà cần đánh giá kỹ lớp nền và điều kiện thi công trên cao. Mục tiêu là tạo bề mặt trang trí phù hợp với không gian, đồng thời giữ nguyên khả năng tiếp cận các thiết bị và vị trí kỹ thuật trên trần.",
    image: "/images/cong-trinh/banner-film-dan-noi-that.jpg",
    sections: [
      { title: "Kiểm tra lớp nền và khả năng bám dính", text: "Trần sơn, trần thạch cao và trần ốp có yêu cầu xử lý khác nhau. Cần kiểm tra lớp sơn có bong, phấn hóa hoặc ẩm không. Việc thử độ bám và xác nhận vật liệu phù hợp với ứng dụng trên trần phải thực hiện trước khi thi công diện tích lớn." },
      { title: "Giữ thông thoáng các vị trí kỹ thuật", text: "Đèn, cửa thăm, đầu báo và các thiết bị âm trần cần có phương án bảo vệ hoặc tháo lắp do người phù hợp thực hiện. Không phủ film lên thiết bị an toàn và không che vị trí cần bảo trì. Chiều cao, lối vận chuyển và thiết bị tiếp cận cũng phải được khảo sát." },
      { title: "Chọn mẫu theo ánh sáng thực tế", text: "Vân bê tông và vân vải có thể dùng làm hướng tham khảo khi phối trần với tường và đồ nội thất. Ánh sáng rọi ngang dễ làm lộ gờ nền hoặc mối ghép, vì vậy nên xem mẫu tại đúng vị trí và thống nhất hướng vân trước khi chốt vật tư." },
    ],
    preparation: ["Cung cấp diện tích, chiều cao trần và loại nền.", "Gửi ảnh cửa thăm, đèn và các thiết bị âm trần.", "Thông tin về giờ thi công, lối tiếp cận và các vùng có dấu thấm."],
    materials: ["van-vai", "be-tong"],
    faqs: [
      { question: "Trần thạch cao có dán film được không?", answer: "Cần kiểm tra lớp hoàn thiện, độ khô, độ phẳng và độ bám. Không thể quyết định chỉ dựa vào tên vật liệu; từng nền và mã film phải được đánh giá cụ thể." },
      { question: "Giá dán film trần có giống dán vách không?", answer: "Không nhất thiết. Chiều cao, thiết bị tiếp cận, số chi tiết cần xử lý và điều kiện làm việc trên cao có thể làm thay đổi nhân công và tiến độ." },
    ],
  },
  {
    slug: "dan-film-thang-may", name: "Dán film thang máy",
    title: "Dán film thang máy, trang trí cabin | iDecal",
    description: "Tư vấn dán film thang máy tại TP.HCM, Bình Dương. Xem mẫu film kim loại, vân gỗ và lưu ý khảo sát cabin, phối hợp đơn vị bảo trì trước thi công.",
    intro: "Dán film thang máy tập trung vào các bề mặt trang trí của cabin hoặc sảnh sau khi được khảo sát và thống nhất với đơn vị quản lý. Phương án hoàn thiện cần phù hợp với vật liệu nền, tần suất sử dụng và yêu cầu kỹ thuật của công trình.",
    image: "/images/cong-trinh/dan-film-noi-that-thang-may.jpg",
    sections: [
      { title: "Khảo sát cabin và phạm vi được thi công", text: "Trước khi dán, cần xác định rõ các mảng vách, nẹp và chi tiết có thể tiếp cận. Các phần liên quan đến vận hành, điện hoặc cơ cấu cửa phải do đơn vị có trách nhiệm kiểm tra. Không dùng việc dán film để che khuyết tật kỹ thuật hoặc gỉ nền chưa được xử lý." },
      { title: "Chuẩn bị bề mặt kim loại", text: "Dầu, chất vệ sinh tồn dư và các mối ghép có thể ảnh hưởng độ bám. Cần làm sạch theo hướng dẫn vật liệu, thử độ bám và bố trí chiều vân giữa các tấm. Với film hiệu ứng kim loại, nên xem mẫu dưới ánh sáng cabin để đánh giá phản chiếu và màu sắc." },
      { title: "Phối hợp quản lý và bảo trì thang máy", text: "Giờ thi công, phạm vi dừng khai thác và trách nhiệm bảo vệ thiết bị cần được chốt trước. Không che bảng điều khiển, cảm biến, biển tải trọng, khe thông gió hoặc thông tin an toàn. Yêu cầu về vật liệu và phòng cháy của tòa nhà cần được kiểm tra theo hồ sơ sản phẩm." },
    ],
    preparation: ["Gửi ảnh cabin, sảnh, các nẹp và chi tiết dự định dán.", "Cung cấp kích thước, loại nền và yêu cầu của ban quản lý.", "Thống nhất lịch với đơn vị quản lý, bảo trì và quy trình bàn giao."],
    materials: ["kim-loai", "van-go"],
    faqs: [
      { question: "Có cần phối hợp đơn vị bảo trì thang máy không?", answer: "Có. Chủ đầu tư hoặc ban quản lý cần thống nhất phạm vi, điều kiện dừng khai thác và trách nhiệm bảo vệ thiết bị với đơn vị liên quan trước khi thi công." },
      { question: "Film nào cũng dùng được trong cabin thang máy không?", answer: "Không. Cần kiểm tra điều kiện sử dụng, yêu cầu của tòa nhà và tài liệu kỹ thuật của mã film, bao gồm các yêu cầu về an toàn vật liệu nếu được áp dụng." },
    ],
  },
];

export const serviceHref = (service: Service) => `/dich-vu/${service.slug}/`;
