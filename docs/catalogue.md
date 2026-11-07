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

- Quy cách INFEEL theo bảng giá chủ website xác nhận: mặc định **1,23 m × 50 m**; LT **1,23 m × 30 m**, PW **1,06 m × 25 m**. Cấu hình tại `src/data/infeelPrices.ts`.
- Giá bán công khai tính theo **mét dài**, chỉ lưu giá bán trong mã nguồn; giá nhập không đưa lên website. Mã LW/MT ngoại lệ được ưu tiên trước giá nhóm ký hiệu. Corance chưa có bảng giá và vẫn hiển thị liên hệ.
- `scripts/label-catalogue-colors.py` đọc ảnh để ước lượng tông màu phục vụ tìm kiếm, không sửa ảnh. Tên tông màu không phải tên màu chuẩn hoặc cam kết màu của nhà sản xuất. Khi có thông tin màu chính thức cần đối chiếu và cập nhật.
- Trình nhập gọi bước gán màu sau khi trích dữ liệu; yêu cầu thêm Pillow. Có thể chạy riêng bước gán màu sau khi cập nhật ảnh.
- Lưới và trang chi tiết hiển thị ảnh gốc với chiều cao tự động theo đúng tỷ lệ, không cắt vân hoặc ép khung 4:3 / vuông. Đã bỏ giới hạn chiều rộng theo số pixel gốc và khoảng đệm thêm ở bản trước theo yêu cầu chủ website; hộp thoại hiển thị trọn ảnh trong màn hình. Không tạo thêm chi tiết hoặc chỉnh màu vật liệu. PDF có giới hạn độ phân giải; ảnh nguồn độ phân giải cao hơn sẽ cần để tăng chi tiết thực sự.

Ảnh sản phẩm trong lưới, trang chi tiết và mẫu liên quan được đặt trong khung ngang 4:3 theo yêu cầu mới. `object-contain` giữ nguyên tỷ lệ và toàn bộ vân bên trong khung; hộp thoại vẫn xem ảnh gốc.

Cập nhật hiển thị: khung sản phẩm 4:3 dùng `object-cover object-center` để phủ kín, không còn dải trắng. Ảnh giữ tỷ lệ và cắt phần dư tại tâm; hộp thoại tiếp tục dùng `object-contain` để xem toàn bộ ảnh gốc.

## Đối chiếu PDF bổ sung `_infeel_catalog.pdf`

PDF bổ sung có 23 trang, metadata tạo năm 2022; không thay cho catalogue INFEEL 2026. Ảnh mẫu nằm trong các clipping path, cần đối chiếu vùng cắt và nhãn mã trước khi trích để tránh lấy ảnh của ô kế bên.

Đã thay ba ảnh trùng mã và cải thiện rõ về độ phân giải: SL 548 (125×95 → 230×230), SL 558 (125×95 → 235×235), SL 564 (125×95 → 233×233). Các ảnh được xem trực quan và đối chiếu tông màu. Những mẫu chỉ cải thiện nhỏ về diện tích crop, độ phân giải thấp hơn hoặc lệch tông rõ hơn được giữ nguyên. Không làm sắc nét giả, nội suy hoặc sửa ảnh.

Ảnh thay thế lưu tại `public/images/catalogue/infeel-supplement/`, giữ nguyên ảnh cũ để có thể quay lại. Dữ liệu `imageSource` ghi PDF nguồn và trang 21. Trang sản phẩm có liên kết PDF bổ sung; liên kết catalogue 2026 vẫn còn để đối chiếu thông tin mã. Các tên màu và khung 4:3 không thay đổi.

Để áp dụng lại sau khi nhập catalogue chính:

```sh
python scripts/upgrade-infeel-images.py /path/to/_infeel_catalog.pdf
```

Trình nâng cấp xác minh SHA-256 nguồn trước khi trích những ảnh đã kiểm tra, cập nhật URL ảnh và kích thước, không ghi đè hay nén lại ảnh nguồn.

## Bộ ảnh đầu trang sản phẩm

`src/data/productImages.ts` chọn tối đa 4 ảnh không trùng: bề mặt của mã đang xem, ảnh ứng dụng đúng mã nếu có, rồi ảnh cùng nhóm vật liệu. Nhóm bê tông hiện chỉ có một không gian tham khảo nên có 2 ảnh tổng cộng; không tạo ảnh giả để đủ số lượng. Mọi ảnh tham khảo được chú thích và liên kết trang ứng dụng nguồn.

`ProductImageGallery.astro` hiển thị ảnh lớn 4:3, nút ảnh nhỏ, trạng thái `aria-pressed`, chú thích cập nhật và hộp thoại ảnh gốc. Khi tắt JavaScript, ảnh phụ có trong phần `noscript`. Ảnh ứng dụng khác mã không được thêm vào schema Product như ảnh xác nhận của mã đang xem.
