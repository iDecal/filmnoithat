# TODA Interior Film Vol.02

Nguồn: tệp `df185ae0c1.pdf` do người dùng cung cấp, 47 trang. Bản giữ nguyên tại `public/catalogues/toda-vol-02.pdf`; SHA-256 và số trang được ghi trong `scripts/toda-source.json`.

Đã thêm 84 mã duy nhất:

| Dòng | Mã | Số mẫu | Nhóm trên website |
| --- | --- | ---: | --- |
| Basic Solid | 920-01–920-08 | 8 | Đơn sắc |
| Soft Matt | 921-01–921-04 | 4 | Đơn sắc |
| Premium Wood | 922-01–922-46 | 46 | Vân gỗ |
| Stainless / Metal | 923-01–923-11 | 11 | Kim loại |
| Marble | 924-01–924-05 | 5 | Vân đá |
| Concrete | 925-01–925-04 | 4 | Bê tông |
| Fabric | 926-01–926-03 | 3 | Vân vải |
| Reflex Glossy | 927-01–927-03 | 3 | 927-01: tráng gương; 927-02/03: đơn sắc bóng |

PDF không có lớp văn bản. Mã mẫu được đối chiếu trên bản render catalogue; các vùng ảnh bề mặt được ghi riêng trong `scripts/toda-regions.json`, theo hệ tọa độ preview 1191 × 1684. Script đổi tọa độ về ảnh raster gốc nhúng trong PDF để cắt, không phóng lớn, tạo vân hoặc chỉnh màu. Không đưa ảnh phối cảnh có mã không rõ ràng vào hồ sơ sản phẩm.

Các trang Premium Wood có in `Size W1.22m*L50m`; nhóm này dùng quy cách **1,22 m × 50 m**. Các nhóm khác để **Liên hệ xác nhận quy cách cuộn** do chưa có thông tin riêng được xác nhận trong tài liệu. Không tự đưa giá, giá bằng 0, tồn kho hoặc các tuyên bố chứng nhận kỹ thuật vào hồ sơ. TODA sử dụng liên hệ báo giá và không có Offer trong JSON-LD.

Tên tông màu và mã HEX được ước lượng từ ảnh để hỗ trợ lọc, không phải màu được nhà sản xuất xác nhận. Cần đối chiếu mẫu thật. Tên sản phẩm trên website dùng loại bề mặt và mã, thay vì đoán những tên tiếng Anh OCR chưa đọc chắc chắn.

Các hồ sơ có URL `/vat-lieu/mau/toda-<mã>/`, SEO/ALT riêng, thương hiệu TODA, số trang nguồn và link catalogue gốc. CMS có mục **Sản phẩm TODA** để chỉnh từng hồ sơ. Các bộ lọc vật liệu lấy thương hiệu từ dữ liệu, nên có thể chọn TODA hoặc tìm theo mã 920-01, 922-03…

Tái tạo từ đúng PDF nguồn:

```sh
python3 scripts/import-toda.py /path/to/df185ae0c1.pdf
```

Cần PyMuPDF và Pillow. Script kiểm tra checksum nguồn; giữ các hồ sơ CMS đã tồn tại để không ghi đè chỉnh sửa của người biên tập. Khi cập nhật catalogue khác, phải đối chiếu lại mã và manifest vùng ảnh; không thay checksum để bỏ qua việc kiểm tra nguồn.
