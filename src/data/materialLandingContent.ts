import type { Material } from "./materials";
interface LandingContent {
  image: string; imageAlt: string; selectionImage?: string;
  lead: string; definition: string; definitionMore: string; selection: string; care: string;
  faqs: { question: string; answer: string }[];
}
export const materialLandingContent: Record<string, LandingContent> = {
  "van-go": {
    image: "/images/perspectives/oak-living-room.webp", imageAlt: "Phối cảnh minh họa vách vân gỗ sáng trong không gian sống trung tính",
    lead: "Sắc gỗ từ sáng đến trầm giúp kết nối cánh tủ, bàn và vách với nội thất đang có. Chọn tông màu cùng chiều vân phù hợp để các mảng hoàn thiện liền mạch hơn.",
    definition: "Film vân gỗ là lớp hoàn thiện trang trí mô phỏng họa tiết và sắc độ của gỗ. Đây là một hướng làm mới bề mặt khi kết cấu nội thất còn ổn định, không thay thế việc sửa phần gỗ đã hư hỏng.",
    definitionMore: "Tên nhóm vân không đồng nghĩa film có thành phần hay đặc tính giống gỗ tự nhiên. Cảm giác bề mặt, độ bóng và quy cách cần đối chiếu theo đúng mã. Với nhiều cánh tủ hoặc tấm vách liền nhau, nên bố trí chiều vân và vị trí ghép trước khi tính lượng vật tư.",
    selection: "Đặt mẫu cạnh sàn, mặt đá và màu tường sẵn có. Xem cả chiều đứng lẫn chiều ngang dưới ánh sáng thực tế trước khi chọn tông gỗ.",
    care: "Kiểm tra cốt tủ, cạnh bo và lớp phủ cũ trước khi dán. Sau khi hoàn thiện, dùng khăn mềm và cách vệ sinh theo hướng dẫn của đúng mã film.",
    faqs: [
      {question:"Film vân gỗ có thay thế được gỗ tự nhiên không?",answer:"Không. Film vân gỗ là lớp hoàn thiện trang trí trên nền sẵn có, không thay thế kết cấu hay tính chất của gỗ tự nhiên. Khả năng sử dụng cần theo mã film và hiện trạng bề mặt."},
      {question:"Có thể dán film vân gỗ lên tủ cũ không?",answer:"Có thể khảo sát khi tủ còn ổn định và nền phù hợp. Phần gỗ trương nở, ẩm hoặc lớp phủ bong phải được đánh giá và xử lý trước; không nên dán phủ trực tiếp để che hư hỏng."},
      {question:"Làm sao để vân gỗ trên nhiều cánh tủ nhìn hài hòa?",answer:"Cần thống nhất chiều vân, bố trí các tấm và vị trí ghép trước khi cắt. Nên so mẫu dưới ánh sáng sử dụng và xác nhận lượng film dự phòng theo cách bố trí thực tế."},
    ],
  },
  "don-sac": {
    image:"/images/perspectives/ivory-oak-kitchen.webp",imageAlt:"Phối cảnh minh họa tủ bếp màu sáng phối gỗ và mặt đá trung tính",
    lead:"Màu trơn tạo nền gọn gàng cho tủ, quầy và các chi tiết phối màu. Một sắc độ phù hợp có thể làm dịu tổng thể hoặc tạo điểm nhấn cạnh gỗ, đá và ánh kim.",
    definition:"Film đơn sắc là lớp hoàn thiện có màu nền đồng nhất. Cùng một tên màu có thể khác sắc độ hoặc độ bóng giữa các mã, vì vậy ảnh trên màn hình chỉ nên dùng để tìm hướng chọn mẫu.",
    definitionMore:"Mảng màu đồng nhất có thể làm lộ gờ, vết lõm và khuyết điểm của nền. Cần kiểm tra độ phẳng, lớp phủ cũ và khả năng bám. Với nhiều cánh tủ cạnh nhau, nên xác nhận cùng mã, phiên bản bề mặt và lô màu trước khi đặt.",
    selection:"So màu cạnh tường, sàn và tay nắm. Kiểm tra dưới ánh sáng tự nhiên lẫn ánh sáng đèn để chọn sắc độ và mức độ tương phản vừa đủ.",
    care:"Làm sạch và làm phẳng nền trước khi dán. Kiểm tra cách vệ sinh theo mã mẫu; không mặc định mọi bề mặt đơn sắc đều có cùng khả năng chống bám hay chịu trầy.",
    faqs:[
      {question:"Màu film đơn sắc trên ảnh có giống mẫu thật không?",answer:"Màn hình, ánh sáng và độ bóng có thể làm cảm nhận màu thay đổi. Nên so mẫu thật tại vị trí dự định dán, cạnh nội thất sẵn có trước khi chốt mã."},
      {question:"Film đơn sắc có phù hợp với tủ bếp không?",answer:"Có thể khảo sát cho mặt ngoài cánh tủ và các phần hoàn thiện phù hợp. Cần kiểm tra dầu mỡ, độ ẩm, cạnh cánh và vùng gần nguồn nhiệt theo điều kiện sử dụng của đúng mã film."},
      {question:"Vì sao cần kiểm tra lô màu khi dán nhiều cánh tủ?",answer:"Các mảng màu đặt cạnh nhau dễ làm lộ khác biệt sắc độ. Cần xác nhận cùng mã, phiên bản bề mặt và lô cung cấp, đồng thời kiểm tra mẫu dưới cùng nguồn sáng."},
    ],
  },
  "van-vai": {
    image:"/images/vat-lieu/van-vai/dan-film-noi-that-van-vai-phong-ngu.jpeg",imageAlt:"Không gian phòng ngủ tham khảo với bề mặt vân vải và tông màu dịu",
    lead:"Họa tiết vải tạo chiều sâu nhẹ cho cánh tủ, vách trang trí và những góc cần cảm giác mềm mại. Phối với gỗ hoặc màu trơn để không gian có điểm nhấn mà vẫn cân bằng.",
    definition:"Film vân vải là lớp hoàn thiện trang trí mô phỏng họa tiết sợi hoặc bề mặt vải. Hiệu ứng trên ảnh không đồng nghĩa vật liệu có thành phần hoặc cách chăm sóc giống vải dệt thật.",
    definitionMore:"Cần đối chiếu mã mẫu để xác nhận kiểu họa tiết, cảm giác bề mặt và hướng vân. Không suy rộng các tính chất như tiêu âm, chống bám hay chống nước từ tên gọi vân vải; những yêu cầu này phải theo hồ sơ sản phẩm.",
    selection:"Xem mẫu cạnh màu gỗ, tường và các đồ mềm trong phòng. Kiểm tra hướng họa tiết trên nhiều tấm liền nhau và phương pháp vệ sinh trước khi chọn.",
    care:"Chuẩn bị nền khô, ổn định và bố trí mối ghép theo chiều họa tiết. Dùng phương pháp làm sạch theo đúng mã, thử ở vùng nhỏ khi được hướng dẫn.",
    faqs:[
      {question:"Film vân vải có phải là vải dệt không?",answer:"Không. Đây là film trang trí mô phỏng họa tiết hoặc hiệu ứng vải. Thành phần, cảm giác bề mặt và cách vệ sinh cần đối chiếu theo đúng mã sản phẩm."},
      {question:"Dán film vân vải có giúp tiêu âm không?",answer:"Không thể kết luận khả năng tiêu âm từ tên gọi hoặc hình ảnh họa tiết. Nếu có yêu cầu âm học, cần tài liệu kỹ thuật phù hợp của đúng sản phẩm và phương án xử lý riêng."},
      {question:"Film vân vải phù hợp với vị trí nào?",answer:"Có thể tham khảo cho cánh tủ, vách đầu giường hoặc mảng trang trí khi nền và điều kiện sử dụng phù hợp. Cần kiểm tra hướng họa tiết, vị trí ghép và khả năng vệ sinh theo đúng mã."},
    ],
  },
  "be-tong": {
    image:"/images/vat-lieu/be-tong/CORANCE-CAG816.jpg",imageAlt:"Mẫu film hiệu ứng bê tông CORANCE với sắc xám và họa tiết bề mặt",
    selectionImage:"/images/vat-lieu/be-tong/CORANCE-CAG816-can-canh.jpeg",
    lead:"Hiệu ứng bê tông tạo nền trung tính cho vách, bàn và quầy. Kết hợp sắc xám với gỗ ấm hoặc màu trơn để giữ cảm giác mộc mà không làm không gian nặng nề.",
    definition:"Film vân bê tông là lớp trang trí mô phỏng sắc độ và họa tiết của bê tông. Đây là hiệu ứng hoàn thiện trên nền sẵn có, không phải lớp bê tông hay vật liệu xử lý kết cấu.",
    definitionMore:"Họa tiết không sửa được nền đang thấm, bong hoặc thiếu ổn định. Ánh sáng rọi ngang có thể làm lộ gờ và mối ghép, nên cần đánh giá lớp nền cùng vị trí đèn trước khi lên phương án dán.",
    selection:"Chọn nền xám sáng hay trầm dựa vào diện tích và ánh sáng phòng. So mẫu cạnh sàn, màu tường và sắc gỗ để kiểm tra độ tương phản của cả mảng lớn.",
    care:"Làm rõ độ khô, độ phẳng và khả năng bám của lớp phủ cũ. Khi vệ sinh, làm theo hướng dẫn của mã film thay vì áp dụng cách chăm sóc bê tông thật.",
    faqs:[
      {question:"Film vân bê tông có che được tường thấm không?",answer:"Không nên dùng film để che nền đang thấm hoặc ẩm. Cần tìm nguyên nhân, xử lý và kiểm tra nền ổn định trước khi cân nhắc lớp hoàn thiện trang trí."},
      {question:"Có thể dán film bê tông trực tiếp lên tường nhám không?",answer:"Cần khảo sát độ nhám, độ phẳng và khả năng bám. Không mặc định mọi nền tường đều dán trực tiếp được; có thể cần chuẩn bị hoặc tạo nền phù hợp trước khi thực hiện."},
      {question:"Phối film bê tông thế nào để phòng không bị tối?",answer:"Có thể bắt đầu bằng mẫu xám sáng, phối gỗ ấm hoặc màu trơn và kiểm tra dưới đèn thực tế. Nên so mẫu trên diện tích dự định dùng thay vì quyết định chỉ từ ảnh cận cảnh."},
    ],
  },
  "da-cam-thach": {
    image:"/images/perspectives/modern-reception.webp",imageAlt:"Phối cảnh minh họa quầy vân đá sáng phối vách gỗ trong không gian tiếp đón",
    lead:"Vân đá và cẩm thạch tạo điểm nhấn cho quầy, mặt bàn hoặc vách. Chọn tỷ lệ họa tiết theo diện tích mảng dán để đường vân có nhịp và hài hòa với nội thất xung quanh.",
    definition:"Film vân đá là lớp hoàn thiện trang trí mô phỏng màu sắc và họa tiết đá. Vật liệu không thay thế kết cấu, khả năng chịu lực hay đặc tính sử dụng của tấm đá tự nhiên hoặc đá nhân tạo.",
    definitionMore:"Với họa tiết lớn, cần xem cả mẫu cận cảnh và bố cục trên diện tích dự kiến. Không mặc định các tấm có thể ghép đối vân hoặc nối liền họa tiết; phương án phụ thuộc đúng mã, khổ film và cách chia tấm.",
    selection:"So tỷ lệ vân, sắc nền và độ bóng cạnh cánh tủ, tay nắm và nguồn sáng thực tế. Tính trước vị trí ghép, mép quầy và vùng tiếp xúc nước.",
    care:"Kiểm tra nền, xử lý góc mép và xác nhận điều kiện tiếp xúc theo mã film. Không áp dụng mặc định khả năng chịu nhiệt hoặc hóa chất như với đá thật.",
    faqs:[
      {question:"Film vân đá có đặc tính giống đá thật không?",answer:"Không. Film tạo hiệu ứng trang trí trên nền sẵn có, không thay thế khả năng chịu lực, chịu nhiệt hay những đặc tính của tấm đá. Điều kiện sử dụng phải theo đúng mã film."},
      {question:"Có dùng film vân đá cho mặt bàn bếp được không?",answer:"Cần đánh giá nền, mép bàn, vùng có nước và nguồn nhiệt, đồng thời xác nhận giới hạn sử dụng của đúng mã. Không mặc định mọi mẫu vân đá đều phù hợp với mặt bàn bếp."},
      {question:"Vân đá trên các tấm có nối liền nhau được không?",answer:"Khả năng ghép phụ thuộc họa tiết, khổ cuộn và cách chia tấm. Cần lên bố cục trước khi cắt; không nên mặc định các mẫu đều ghép đối vân hoặc nối liên tục được."},
    ],
  },
  "trang-guong": {
    image:"/images/catalogue/toda/film-dan-noi-that-toda-927-01.webp",imageAlt:"Ảnh mẫu film tráng gương TODA 927-01 để tham khảo hiệu ứng bề mặt",
    selectionImage:"/images/perspectives/champagne-metal-reception.webp",
    lead:"Bề mặt phản chiếu có thể làm nổi bật một chi tiết tủ, vách hoặc mảng trang trí. Dùng có chủ đích và kiểm tra góc nhìn để hiệu ứng bắt sáng phù hợp với không gian.",
    definition:"Film tráng gương là lớp hoàn thiện có hiệu ứng phản chiếu. Không mặc định độ phản chiếu, độ trong hay hình ảnh trên film tương đương gương kính; cần xem trực tiếp đúng sản phẩm.",
    definitionMore:"Bề mặt phản chiếu dễ làm lộ gợn nền, mối ghép và sai khác góc nhìn. Phạm vi dán cần dựa vào độ phẳng, cách xử lý mép và yêu cầu vệ sinh, đặc biệt khi dùng trên mảng lớn.",
    selection:"Đặt mẫu tại vị trí dự kiến, quan sát từ nhiều góc và nguồn sáng. Chọn diện tích vừa đủ, kiểm tra mức độ phản chiếu và màu của đúng mã trước khi đặt.",
    care:"Ưu tiên nền phẳng và ổn định, làm rõ cách xử lý mép. Vệ sinh bằng khăn mềm và hướng dẫn của sản phẩm; tránh vật chà xước hoặc hóa chất chưa xác nhận tương thích.",
    faqs:[
      {question:"Film tráng gương có thay thế được gương kính không?",answer:"Không mặc định như vậy. Đây là hiệu ứng phản chiếu trên lớp film, không đồng nghĩa có hình ảnh hay đặc tính như gương kính. Nên xem mẫu thật theo yêu cầu sử dụng trước khi chọn."},
      {question:"Tại sao nền dán film tráng gương phải phẳng?",answer:"Phản chiếu dễ làm lộ gợn nền và điểm ghép. Cần khảo sát độ phẳng, độ ổn định và cách xử lý mép trước khi chọn diện tích dán."},
      {question:"Có nên dùng film tráng gương cho toàn bộ mảng tường không?",answer:"Cần kiểm tra mẫu tại công trình, góc nhìn, ánh sáng và độ phẳng của nền. Có thể bắt đầu bằng chi tiết trang trí nhỏ; chỉ chốt mảng lớn sau khi xác nhận hiệu ứng đáp ứng mong muốn."},
    ],
  },
};
export function materialLandingFaqs(material: Material) {
  const content = materialLandingContent[material.slug];
  if (!content) throw new Error(`Missing landing content for ${material.slug}`);
  const name = material.name.toLowerCase();
  return [...content.faqs,
    {question:`Giá ${name} được tính như thế nào?`,answer:"Các mẫu có giá công bố trên website được niêm yết theo mét dài; cần đối chiếu khổ cuộn của đúng sản phẩm. Giá vật liệu và chi phí thi công được trao đổi riêng. Mẫu chưa có giá công bố cần liên hệ xác nhận theo mã và số lượng."},
    {question:`Chăm sóc bề mặt ${name} như thế nào?`,answer:"Dùng khăn mềm và phương pháp vệ sinh theo hướng dẫn của đúng mã. Tránh vật chà xước và hóa chất chưa xác nhận tương thích. Khi cần, thử tại vùng nhỏ theo hướng dẫn trước khi vệ sinh toàn bộ."},
    {question:"Cần gửi thông tin gì để được tư vấn mẫu và thi công?",answer:"Gửi mã mẫu hoặc tông màu yêu thích, ảnh hiện trạng, kích thước, địa điểm và nhu cầu mua vật liệu hay thuê thi công. Những thông tin này giúp xác nhận mẫu, dự tính vật tư và làm rõ phạm vi trước khi đặt."},
  ];
}
