export interface Material {
  slug: string;
  name: string;
  shortName: string;
  mood: "warm" | "neutral" | "reflective";
  moodLabel: string;
  description: string;
  intro: string;
  image?: string;
  preview?: "stone" | "mirror";
  colors: { name: string; value: string }[];
  applications: { title: string; text: string }[];
  notes: string[];
  services: string[];
}

export const materials: Material[] = [
  {
    slug: "van-go", name: "Film vân gỗ", shortName: "Vân gỗ", mood: "warm", moodLabel: "Ấm áp & gần gũi",
    description: "Khám phá film vân gỗ cho tủ bếp, bàn, kệ và vách nội thất. Xem bề mặt và màu vân gỗ, gợi ý phối màu và lưu ý chọn vân trước khi thi công.",
    intro: "Một chút sắc gỗ có thể làm không gian trở nên gần gũi hơn. Film vân gỗ là hướng tham khảo khi bạn muốn giữ lại bàn, tủ hoặc vách còn tốt và thay đổi lớp hoàn thiện bên ngoài.",
    image: "/images/vat-lieu/van-go/CAD402-goc.jpg",
    colors: [{ name: "Kem", value: "#f0e4d3" }, { name: "Gỗ sáng", value: "#c79c65" }, { name: "Nâu", value: "#77513a" }],
    applications: [{ title: "Cánh tủ & kệ", text: "Phối tông gỗ với tường sáng và các chi tiết đơn sắc để tạo cảm giác cân bằng." }, { title: "Bàn làm việc", text: "Cân nhắc chiều vân, bo mép và tần suất tiếp xúc khi chọn mẫu cho mặt bàn." }, { title: "Vách điểm nhấn", text: "Thử đặt vân theo chiều đứng hoặc ngang để xem hiệu ứng trên tỷ lệ vách thực tế." }],
    notes: ["Thống nhất chiều vân giữa các cánh tủ và các tấm ghép.", "Đặt mẫu cạnh sàn, mặt đá và đồ nội thất đang có để so màu.", "Kiểm tra lớp nền và giới hạn vệ sinh, nhiệt của đúng mã film."],
    services: ["dan-film-tu-bep", "dan-film-ban", "dan-film-tuong"],
  },
  {
    slug: "don-sac", name: "Film đơn sắc", shortName: "Đơn sắc", mood: "neutral", moodLabel: "Gọn gàng & dễ phối",
    description: "Film đơn sắc cho cánh tủ, kệ và quầy nội thất. Tham khảo cách phối tông màu, chọn độ bóng và kiểm tra mẫu thực tế theo ánh sáng công trình.",
    intro: "Các mảng màu đồng nhất tạo khoảng nghỉ cho mắt và giúp vân gỗ, đá hoặc kim loại nổi bật hơn. Chọn đơn sắc khi bạn muốn tổng thể nhẹ nhàng, rõ ràng và dễ phối lại nội thất.",
    image: "/images/vat-lieu/don-sac/DEN001.jpg",
    colors: [{ name: "Trắng ấm", value: "#f2ece2" }, { name: "Be", value: "#cab79d" }, { name: "Xám đậm", value: "#565553" }],
    applications: [{ title: "Tủ bếp", text: "Tạo nền màu liền mạch, kết hợp với tay nắm và mặt đá hiện có." }, { title: "Quầy & kệ", text: "Dùng một gam chính để giữ bố cục gọn gàng trong không gian trưng bày." }, { title: "Chi tiết phối màu", text: "Đặt cạnh vân gỗ hoặc vân vải để làm rõ từng vùng công năng." }],
    notes: ["So mẫu cùng độ bóng; cùng màu nhưng khác độ bóng có thể cho cảm giác khác nhau.", "Nền sáng và phẳng dễ lộ gờ, vết lõm hoặc mối nối nên cần xử lý kỹ.", "Xác nhận mã và lô màu trước khi thi công nhiều mảng liền nhau."],
    services: ["dan-film-tu-bep", "dan-film-ban"],
  },
  {
    slug: "van-vai", name: "Film vân vải", shortName: "Vân vải", mood: "warm", moodLabel: "Mềm mại & thư thái",
    description: "Film vân vải cho cánh tủ và vách nội thất. Xem bề mặt và màu vân vải, gợi ý phối vân gỗ và các lưu ý về chiều họa tiết, bề mặt, vệ sinh.",
    intro: "Hiệu ứng sợi dệt mang lại cảm giác mềm mại cho những mảng tủ và vách. Film vân vải là một hướng phối chất liệu cho phòng ngủ hoặc góc tiếp khách, với cách chăm sóc theo đúng mã film.",
    image: "/images/vat-lieu/van-vai/CAN034.jpg",
    colors: [{ name: "Kem vải", value: "#e9e3d8" }, { name: "Be dệt", value: "#c8bba5" }, { name: "Nâu xám", value: "#8a8175" }],
    applications: [{ title: "Cánh tủ", text: "Phối với sắc gỗ để làm nhẹ những mảng tủ lớn trong phòng ngủ." }, { title: "Vách đầu giường", text: "Thử hiệu ứng họa tiết dưới ánh sáng dịu và đèn hắt ở vị trí dự kiến." }, { title: "Góc tiếp khách", text: "Kết hợp tông trung tính để tạo nền cho bàn và đồ trang trí." }],
    notes: ["Film họa tiết vải không phải lớp bọc vải thật.", "Xem độ nổi và hướng dẫn làm sạch của mẫu trước khi chọn vị trí dùng.", "Kiểm tra chiều dệt và cách nối trên những mảng rộng."],
    services: ["dan-film-tuong", "dan-film-tran"],
  },
  {
    slug: "be-tong", name: "Film vân bê tông", shortName: "Vân bê tông", mood: "neutral", moodLabel: "Mộc mạc & hiện đại",
    description: "Film vân bê tông cho vách, bàn và kệ trang trí. Xem hiệu ứng vân bê tông, cách phối vân gỗ và lưu ý xử lý lớp nền, ánh sáng, mối nối.",
    intro: "Sắc độ bê tông tạo nền mộc mạc cho nội thất và dễ kết hợp với gỗ hoặc kim loại. Đây là hiệu ứng trang trí bề mặt, phù hợp để cân nhắc khi muốn đổi phong cách mà vẫn giữ kết cấu đang sử dụng tốt.",
    image: "/images/vat-lieu/be-tong/CORANCE-CAG816.jpg",
    colors: [{ name: "Xám sáng", value: "#d9d7cf" }, { name: "Xám xi măng", value: "#a5a39a" }, { name: "Than", value: "#5b5d59" }],
    applications: [{ title: "Vách trang trí", text: "Dùng làm mảng nền và cân bằng bằng một chi tiết gỗ ấm hoặc đèn." }, { title: "Bàn & quầy", text: "Cân nhắc cách bảo vệ mép và mặt bàn theo thói quen sử dụng." }, { title: "Không gian làm việc", text: "Phối tông bê tông với đồ nội thất gọn để tránh cảm giác nặng màu." }],
    notes: ["Họa tiết bê tông không xử lý được tường thấm, nứt hay lớp sơn bong.", "So mẫu dưới ánh sáng ban ngày và đèn chiếu ở công trình.", "Thống nhất vùng nối và mức độ biến thiên họa tiết trước khi cắt."],
    services: ["dan-film-tuong", "dan-film-ban", "dan-film-tran"],
  },
  {
    slug: "kim-loai", name: "Film kim loại", shortName: "Kim loại", mood: "reflective", moodLabel: "Tinh tế & có điểm nhấn",
    description: "Film hiệu ứng kim loại cho vách, tủ và cabin thang máy. Tham khảo hiệu ứng bề mặt, ánh sáng, chiều vân và yêu cầu lớp nền trước khi thi công.",
    intro: "Một mảng ánh kim vừa đủ có thể tạo điểm nhấn cho cả căn phòng. Film kim loại mô phỏng hiệu ứng bề mặt, nên cần xem mẫu trực tiếp dưới ánh sáng dự kiến để đánh giá độ phản chiếu và màu sắc.",
    image: "/images/vat-lieu/kim-loai/CSM003.jpg",
    colors: [{ name: "Bạc", value: "#c5c3bd" }, { name: "Champagne", value: "#bdab8d" }, { name: "Nâu kim", value: "#76634f" }],
    applications: [{ title: "Vách cabin", text: "Khảo sát phạm vi dán và phối hợp với đơn vị quản lý, bảo trì thang máy." }, { title: "Quầy & tủ", text: "Tạo chi tiết nhấn giữa những bề mặt đơn sắc hoặc vân gỗ." }, { title: "Vách nội thất", text: "Cân đối diện tích ánh kim với nguồn sáng để tổng thể không bị chói." }],
    notes: ["Làm sạch dầu và kiểm tra lớp nền trước khi thi công trên kim loại.", "Kiểm tra hướng vân giữa các tấm ghép cạnh nhau.", "Không mặc định film kim loại có khả năng chịu nhiệt của kim loại thật."],
    services: ["dan-film-thang-may", "dan-film-tu-bep"],
  },
  {
    slug: "da-cam-thach", name: "Film vân đá", shortName: "Vân đá", mood: "neutral", moodLabel: "Nổi bật & có chiều sâu",
    description: "Khám phá các mẫu film vân đá Stone và Marble từ catalogue INFEEL 2026 cho bàn, quầy và vách nội thất. Xem bề mặt, phối cảnh và tư vấn chọn mẫu.",
    intro: "Từ bề mặt đá nhẹ đến vân cẩm thạch rõ nét, mỗi mẫu tạo một nhịp điệu khác nhau cho nội thất. Cân nhắc tỷ lệ họa tiết trên diện tích thật và so mẫu dưới ánh sáng công trình trước khi chọn.",
    image: "/images/catalogue/infeel-2026/st-392.jpeg",
    colors: [{ name: "Trắng đá", value: "#efede7" }, { name: "Xám vân", value: "#b4b0a6" }, { name: "Nâu đá", value: "#86705d" }],
    applications: [{ title: "Vách điểm nhấn", text: "Đặt mẫu theo tỷ lệ vách để hình dung số lần lặp và vị trí mối nối." }, { title: "Quầy trang trí", text: "Cân đối hướng vân giữa mặt và các cạnh để bố cục liền mạch hơn." }, { title: "Bàn & kệ", text: "Kiểm tra công năng và giới hạn sử dụng trước khi chọn film làm lớp hoàn thiện." }],
    notes: ["Ảnh catalogue giúp định hướng phong cách, không thay thế việc so mẫu vật liệu thật.", "Hỏi rõ khổ film và cách nối vân; không mặc định có thể ghép đối xứng.", "Film không thay thế việc sửa mặt đá nứt hoặc kết cấu hư hỏng."],
    services: ["dan-film-tuong", "dan-film-ban"],
  },
  {
    slug: "trang-guong", name: "Film tráng gương", shortName: "Tráng gương", mood: "reflective", moodLabel: "Sáng & phản chiếu",
    description: "Tìm hiểu film hiệu ứng tráng gương cho chi tiết trang trí nội thất. Xem gợi ý ứng dụng, lưu ý độ phẳng, phản chiếu và cách chọn mẫu thực tế.",
    intro: "Hiệu ứng phản chiếu có thể giúp một chi tiết nội thất trở nên sáng và nổi bật. Nên dùng có chủ đích, kiểm tra lớp nền thật phẳng và xem mẫu trước khi quyết định diện tích ứng dụng.",
    preview: "mirror",
    colors: [{ name: "Bạc sáng", value: "#e1e4e2" }, { name: "Xám khói", value: "#a4acab" }, { name: "Champagne", value: "#c7bda7" }],
    applications: [{ title: "Chi tiết trang trí", text: "Chọn những vùng điểm nhấn thay vì phủ mọi bề mặt trong cùng không gian." }, { title: "Cánh tủ & nẹp", text: "Kiểm tra độ phẳng và độ lộ khuyết điểm dưới nguồn sáng trực tiếp." }, { title: "Mảng phối chất liệu", text: "Đặt cạnh vân gỗ hoặc bề mặt mờ để cân bằng độ phản chiếu." }],
    notes: ["Film trang trí không thay thế gương soi chuyên dụng.", "Lớp nền không phẳng có thể làm hình phản chiếu bị biến dạng.", "Chọn vật liệu và phương pháp vệ sinh theo tài liệu của từng mã film."],
    services: ["dan-film-tuong", "dan-film-tran"],
  },
];

export const materialHref = (material: Material) => `/vat-lieu/${material.slug}/`;

export const findMaterials = (slugs: string[]): Material[] => slugs.map(slug => {
  const material = materials.find(item => item.slug === slug);
  if (!material) throw new Error(`Unknown material: ${slug}`);
  return material;
});
