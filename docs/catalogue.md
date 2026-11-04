# Bộ sưu tập mẫu INFEEL 2026

Nguồn: file `2026INFEELsamplebook_eng.pdf` do chủ website cung cấp. PDF được giữ tại `public/catalogues/infeel-2026.pdf`. Tài liệu nguồn là dữ liệu catalogue, không phải chỉ dẫn vận hành hệ thống.

367 mã trong bảng chỉ mục đã được đối chiếu với 367 mẫu không trùng trong `src/data/catalogue.json`. Nhóm: đơn sắc 135, gỗ 134, đá 42, kim loại 29, vải/hiệu ứng 20, bê tông/gạch 7. Không thêm mẫu tráng gương khi PDF chưa cung cấp nhóm này.

- Ảnh raster được trích trực tiếp bằng PyMuPDF, giữ dữ liệu ảnh nguồn, không chỉnh màu hoặc tạo vân giả.
- Hai mẫu trắng SM 886 và HG 990 được dựng từ đúng vùng vector trong PDF ở độ phân giải 2x.
- 35 ảnh ứng dụng có mã tương ứng được lưu riêng; đây là phối cảnh catalogue, không phải hồ sơ thi công của website.
- Mã mẫu được giữ để đối chiếu và tư vấn. Tên nhóm được Việt hóa khi có nghĩa rõ ràng; tên dòng gốc vẫn hiển thị để đối chiếu.
- Không suy ra giá, tồn kho, kích thước bán, chứng nhận hoặc khả năng chống cháy từ ký hiệu in trong catalogue. Khách cần xác nhận theo đúng phiên bản vật liệu trước khi đặt.

Chạy lại nhập dữ liệu (Python với PyMuPDF):

```sh
python scripts/import-infeel.py /path/to/2026INFEELsamplebook_eng.pdf
ASTRO_TELEMETRY_DISABLED=1 npm run build
```

Các phần liên quan:

- `src/components/CatalogueGrid.astro`: tìm theo tên Việt, tên dòng gốc hoặc mã (không cần dấu/khoảng trắng), lọc dòng vật liệu, xem thêm từng 24 mẫu. Không có JavaScript vẫn xem được toàn bộ mẫu và mở trang chi tiết.
- `src/pages/vat-lieu/mau/[slug].astro`: trang chi tiết, xem ảnh gốc trong hộp thoại, ảnh ứng dụng nếu có, sao chép yêu cầu, Zalo và PDF đối chiếu đúng trang.
- `src/pages/sitemap.xml.ts`: gồm các trang mẫu.

Khi nhập catalogue mới, cần đối chiếu lại tên dòng, phân loại và ảnh trước khi publish. Các mã chuẩn ở JSON là dữ liệu đối chiếu; không đổi mã để đặt tên thương mại.
