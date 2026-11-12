# Slide trang chủ

Slide đầu lấy nội dung từ `hero` trong `src/data/homeContent.json`. Các slide tiếp theo lấy từ `hero.slides`; mỗi slide có ảnh, nhãn, hai dòng tiêu đề, mô tả, hai nút, ghi chú và chú thích riêng. Có thể chỉnh tại **Trang chủ → Banner đầu trang → Các slide tiếp theo** trong CMS. Lệnh build kiểm tra ảnh, nội dung và đường dẫn nút của tất cả slide.

Ba ảnh tại `public/images/perspectives/` là phối cảnh minh họa được tạo bằng AI cho giao diện website, không phải ảnh công trình, catalogue hoặc xác nhận sản phẩm của một thương hiệu. Kích thước gốc 1672 × 941; bản WebP giữ nguyên kích thước, không phóng lớn hay thêm chi tiết. Giao diện ghi “Phối cảnh minh họa”.

- `ivory-oak-kitchen.webp`: bếp sáng với tủ gỗ sồi nhạt và đảo đá ngà; đồng thời dùng thay ảnh bếp ghép cũ trong các khối tham khảo.
- `oak-living-room.webp`: phòng khách với cửa và vách gỗ, dùng cho nội dung ứng dụng trong nhà.
- `modern-reception.webp`: sảnh tiếp đón với quầy đá và vách gỗ, dùng cho nội dung tư vấn thi công.

Slide chuyển thủ công bằng hai nút mũi tên; hỗ trợ phím trái/phải, thông báo vị trí cho trình đọc màn hình và giảm chuyển động theo tùy chọn hệ thống. Ảnh nguyên gốc của các sản phẩm không thay đổi.
