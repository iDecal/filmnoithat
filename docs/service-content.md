# Bổ sung nội dung cho trang dịch vụ

## Công trình đã thi công

Thêm đối tượng vào `completedProjects` trong `src/data/projects.ts`. Chỉ dùng ảnh công trình thực tế đã được phép đăng. Danh sách trống sẽ hiển thị thông báo đang cập nhật, không dùng ảnh tham khảo làm công trình đã thi công.

Các trường cần điền:

- `id`: mã duy nhất không dấu, ví dụ `tu-bep-can-ho-01`.
- `title`: tên công trình.
- `services`: danh sách slug dịch vụ liên quan từ `src/data/services.ts`, ví dụ `["dan-film-tu-bep"]`.
- `image`: đường dẫn ảnh đại diện trong `public`, ví dụ `/images/cong-trinh/ten-anh.webp`.
- `summary`: mô tả ngắn hiện trạng và kết quả.
- `scope`: danh sách hạng mục đã thực hiện.
- `materials`: danh sách vật liệu thực tế đã sử dụng.
- `location`: địa điểm (tùy chọn, chỉ ghi thông tin được phép công khai).
- `gallery`: danh sách `{ src, alt }` cho ảnh hiện trạng, quá trình thi công và hoàn thiện (tùy chọn).

Công trình tự xuất hiện trên trang dịch vụ có slug trùng `services`. Trang dịch vụ dán film nội thất tổng hợp hiển thị mọi công trình. Khách có thể mở “Xem chi tiết công trình” để xem hạng mục, vật liệu và ảnh bổ sung ngay tại trang.

## Blog tư vấn

Thêm bài viết vào `src/data/posts.ts`, điền `services` bằng slug dịch vụ liên quan. Mỗi trang ưu tiên bài cùng hạng mục, sau đó bổ sung kiến thức nền tảng, tối đa 3 bài và không lặp. Liên kết “Tất cả bài tư vấn” dẫn tới danh sách đầy đủ.

Sau khi cập nhật: chạy `ASTRO_TELEMETRY_DISABLED=1 npm run build` và kiểm tra ảnh, liên kết trước khi publish.

## Ảnh ứng dụng trên trang dịch vụ con

`src/data/serviceReferences.ts` chứa ảnh tham khảo riêng theo từng slug dịch vụ. Những ảnh này được gắn nhãn “Ảnh tham khảo” và không thay thế hồ sơ hoàn thành. Khi có công trình trong `completedProjects`, mục công trình sẽ ưu tiên hiển thị hồ sơ thực tế. Trang dịch vụ chung có bố cục riêng tại `src/pages/dich-vu/dan-film-noi-that.astro`.

## Liên kết công trình với sản phẩm

Thêm `sampleSlugs` vào công trình thực tế trong `src/data/projects.ts`, ví dụ `sampleSlugs: ["wd-259", "mt-725"]`. Chỉ điền mã đã xác nhận thực sự sử dụng trong công trình. `gallery` lưu ảnh hiện trạng, chi tiết và hoàn thiện đã được phép công khai.

`src/data/projectStories.ts` tự tạo trang `/cong-trinh/{id}/` cho công trình này, và slider trong sản phẩm sẽ ưu tiên đúng mã. Slider hiển thị toàn bộ ảnh trong hồ sơ, có nút trước/sau và hỗ trợ vuốt; không tự chạy.

Trong lúc chưa có hồ sơ thực tế, website dùng 35 phối cảnh có mã từ PDF và 4 không gian tham khảo, gắn nhãn nguồn rõ ràng, không tự nhận đó là công trình đã thi công. Mẫu khác trong cùng nhóm được ghi “Cùng nhóm vật liệu”, không được coi là ảnh của mã đang xem.
