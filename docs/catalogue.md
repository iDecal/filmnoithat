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

## Tông màu, quy cách và hiển thị ảnh

- Quy cách cuộn **1,23 m × 30 m** do chủ website cung cấp, cấu hình chung ở `src/data/catalogue.ts`.
- `scripts/label-catalogue-colors.py` đọc ảnh để ước lượng tông màu phục vụ tìm kiếm, không sửa ảnh. Tên tông màu không phải tên màu chuẩn hoặc cam kết màu của nhà sản xuất. Khi có thông tin màu chính thức cần đối chiếu và cập nhật.
- Trình nhập gọi bước gán màu sau khi trích dữ liệu; yêu cầu thêm Pillow. Có thể chạy riêng bước gán màu sau khi cập nhật ảnh.
- Lưới và trang chi tiết hiển thị ảnh gốc với chiều cao tự động theo đúng tỷ lệ, không cắt vân hoặc ép khung 4:3 / vuông. Đã bỏ giới hạn chiều rộng theo số pixel gốc và khoảng đệm thêm ở bản trước theo yêu cầu chủ website; hộp thoại hiển thị trọn ảnh trong màn hình. Không tạo thêm chi tiết hoặc chỉnh màu vật liệu. PDF có giới hạn độ phân giải; ảnh nguồn độ phân giải cao hơn sẽ cần để tăng chi tiết thực sự.

Ảnh sản phẩm trong lưới, trang chi tiết và mẫu liên quan được đặt trong khung ngang 4:3 theo yêu cầu mới. `object-contain` giữ nguyên tỷ lệ và toàn bộ vân bên trong khung; hộp thoại vẫn xem ảnh gốc.

Cập nhật hiển thị: khung sản phẩm 4:3 dùng `object-cover object-center` để phủ kín, không còn dải trắng. Ảnh giữ tỷ lệ và cắt phần dư tại tâm; hộp thoại tiếp tục dùng `object-contain` để xem toàn bộ ảnh gốc.
