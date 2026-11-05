# Schema JSON-LD

`src/data/structuredData.ts` là nơi tạo schema dùng chung; `BaseLayout.astro` xuất đúng một khối `@graph` mỗi trang. URL và ID được tạo từ `Astro.site`, hiện là `https://filmnoithat.pages.dev/`. Khi đổi domain, sửa `site` trong `astro.config.mjs` rồi build lại.

Mỗi trang có Organization, WebSite, thực thể trang và ảnh chính. Organization sử dụng đúng tên, số điện thoại và email đang công khai, phục vụ Việt Nam. Không tự thêm địa chỉ, tọa độ, mạng xã hội hoặc logo chưa xác nhận. Breadcrumb lấy đúng đường dẫn từ dữ liệu đang dùng của từng trang.

Các loại theo nội dung:

- Trang chủ: WebPage liên kết WebSite và Organization.
- Giới thiệu / liên hệ: AboutPage / ContactPage.
- Vật liệu và danh mục: CollectionPage, ItemList khớp các mẫu và liên kết hiện có. Các mẫu xem thêm bằng JavaScript cũng có trong HTML.
- 367 mẫu: Product, mã SKU catalogue, Brand INFEEL, ảnh, nhóm, tông màu tham khảo và quy cách cuộn do chủ website cung cấp.
- 6 dịch vụ: Service, provider liên kết Organization và phạm vi Việt Nam. Trang tổng hợp có danh sách 5 hạng mục con.
- Blog: Blog, ItemList; 3 bài có BlogPosting, ngày đăng thực tế đang hiển thị, author / publisher Organization và ảnh bài viết. Không tự đặt dateModified.
- Trang công trình / ứng dụng: ImageGallery, ảnh với chú thích nguồn và liên kết đúng sản phẩm. Phối cảnh catalogue không được khai báo thành hồ sơ thi công thực tế.
- FAQ: 7 khối FAQPage lấy từ chính mảng câu hỏi đang render tại 6 trang dịch vụ và trang liên hệ, tránh sai lệch nội dung.

Không thêm Offer, giá bằng 0, tình trạng còn hàng, review hoặc aggregateRating nếu website chưa công khai dữ liệu tương ứng. Product không có giá / đánh giá là dữ liệu mô tả sản phẩm, chưa đáp ứng mọi điều kiện hiển thị kết quả nâng cao của Google. FAQ cũng không đảm bảo được Google hiển thị.

Kiểm tra sau mỗi thay đổi nội dung/schema:

```sh
ASTRO_TELEMETRY_DISABLED=1 npm run build
python scripts/check-schema.py
```

Trình kiểm tra đọc toàn bộ 429 trang build, kiểm tra cú pháp, ID không trùng, liên kết thực thể trong toàn site, URL nội bộ, số lượng ItemList, nội dung câu hỏi/đáp án đang hiển thị và các trường Product/BlogPosting. Đây là kiểm tra tại build, không phải kết quả kiểm định trực tiếp của Google. Có thể đối chiếu URL công khai với Google Rich Results Test hoặc Schema.org Validator; Search Console cần quyền của chủ website.
