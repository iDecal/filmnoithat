# Quản trị nội dung bằng Decap CMS

Mã tích hợp cung cấp `/admin/` cho website Astro trên Cloudflare Pages. Decap dùng GitHub backend của `iDecal/filmnoithat`, nhánh `main`, với quy trình lưu bản nháp và xuất bản qua GitHub. Mỗi lần xuất bản nội dung sẽ tạo commit và kích hoạt Cloudflare Pages build lại. Lưu nháp chưa làm thay đổi nội dung website công khai.

## Kích hoạt đăng nhập trên Cloudflare Pages

Đăng nhập GitHub bằng tài khoản có quyền quản lý ứng dụng OAuth. Tạo **OAuth App** tại <https://github.com/settings/applications/new>:

- Application name: `Film Nội Thất CMS`.
- Homepage URL: `https://filmnoithat.pages.dev`.
- Authorization callback URL: `https://filmnoithat.pages.dev/api/callback`.

Trong Cloudflare Dashboard, chọn **Workers & Pages → filmnoithat → Settings → Variables and Secrets** của môi trường **Production**:

- `GITHUB_OAUTH_CLIENT_ID`: Client ID từ OAuth App.
- `GITHUB_OAUTH_CLIENT_SECRET`: Client Secret, lưu với kiểu **Secret**.
- `CMS_SITE_URL`: `https://filmnoithat.pages.dev` (có thể bỏ qua khi dùng đúng miền mặc định này).

Không đưa Client Secret vào chat, GitHub, `public/admin/config.yml` hoặc mã phía trình duyệt. Token GitHub do môi trường phát triển cung cấp không thay thế Client Secret của OAuth App trên Cloudflare.

Triển khai mã tích hợp cùng thư mục `functions/` bằng Git integration của Cloudflare Pages. Giữ lệnh build `npm run build` và output `dist`. Sau khi thêm các biến, chạy lại deployment để bindings được áp dụng. Trang `/admin/` sẽ có nút **Đăng nhập bằng GitHub**. Tài khoản đăng nhập phải có quyền ghi vào `iDecal/filmnoithat`; với tổ chức có SSO, cần được tổ chức cho phép dùng OAuth App.

Cloudflare Pages tự biên dịch các endpoint `/api/auth` và `/api/callback`. `_routes.json` chỉ định hai route này chạy Functions; các trang nội dung khác tiếp tục được phục vụ tĩnh. `/admin/` và config là tài nguyên công khai; quyền ghi nội dung do GitHub xác thực và kiểm soát. Nếu chưa có bindings OAuth, endpoint đăng nhập trả 503 với hướng dẫn cấu hình thay vì cố đăng nhập.

Nếu đổi sang tên miền riêng, cập nhật đồng thời `backend.base_url`, `site_url`, `display_url` trong `public/admin/config.yml`, biến `CMS_SITE_URL`, và callback URL trong OAuth App. Không dùng địa chỉ deployment preview làm origin đăng nhập Production.

## Các mục đã kết nối

- **Trang chủ**: SEO, thương hiệu hiển thị, banner và CTA, ảnh/ALT, tiêu đề các khối, bộ sưu tập nổi bật, lợi ích, quy trình, FAQ và khối tư vấn. Trường chứa `{gia_infeel}` tự lấy giá thấp nhất của các sản phẩm INFEEL; không cần nhập lại khi giá thay đổi.
- **Sản phẩm INFEEL / Sản phẩm Corance / Sản phẩm TODA**: tìm theo mã, thêm mẫu mới, sửa tên bề mặt, nhóm, ảnh, ALT, ảnh ứng dụng, thông số cuộn, màu và SEO riêng. Giá INFEEL được nhập bằng VND cho một mét dài; Corance và TODA tiếp tục liên hệ báo giá. Giữ slug và tên tệp của sản phẩm đang có để bảo toàn URL. Xóa sản phẩm qua CMS được tắt để tránh làm mất các liên kết hiện hữu.
- **Ảnh không gian trang chủ & công trình**: ba mục đầu hiển thị ở trang chủ; các mục còn lại cũng hiển thị trong trang Công trình. Duy trì ít nhất ba mục.

- **Blog tủ bếp**: `src/data/kitchenPosts.json`, danh sách `posts`.
- **Cẩm nang nội thất**: `src/data/guidePosts.json`, danh sách `posts`.
- **Dịch vụ**: nội dung, ảnh, ALT, FAQ và SEO của 6 dịch vụ có sẵn; không tạo/xóa route dịch vụ bằng CMS.
- **Nhóm vật liệu**: thông tin 7 nhóm, cách phối màu, ứng dụng và lưu ý.
- **Các trang & SEO**: tiêu đề SEO, mô tả, H1 và đoạn mở đầu của Giới thiệu, Công trình, Kiến thức nội thất, Liên hệ và trang tổng hợp Vật liệu. SEO của trang Dịch vụ nằm ở mục Dịch vụ.
- **Thông tin liên hệ**: tên, mô tả ngắn, điện thoại, liên kết gọi điện, email, Zalo và phạm vi phục vụ. Số hiển thị và liên kết `tel:` cần cùng một số.

Bài viết hỗ trợ đoạn văn, mục nhỏ, danh sách, liên kết, FAQ, ảnh đại diện và ảnh trong từng mục; chưa dùng Markdown/rich text. Các trường tiêu đề, ALT và chú thích được hiển thị trực tiếp trên website. Ảnh tải lên được lưu ở `public/images/uploads`; các ảnh cũ vẫn giữ nguyên đường dẫn. Khi thêm ảnh trong bài, ghi kích thước gốc để tránh nhảy bố cục. Khi sửa bài cũ, giữ nguyên slug để không đổi URL.

Các bài trong hai nhóm blog phải có slug khác nhau. Chọn mã vật liệu/dịch vụ từ các mã đang dùng trong repository. `npm run build` kiểm tra dữ liệu CMS trước khi tạo trang, nhằm bắt slug trùng, ảnh bị thiếu hoặc tham chiếu không tồn tại. Mỗi nhóm bài được lưu thành một file JSON; tránh để nhiều người cùng sửa một nhóm đồng thời. Bố cục giao diện, nội dung chi tiết còn lại của các trang tĩnh và hồ sơ công trình đã hoàn thành vẫn được quản lý bằng mã nguồn.

## Kiểm tra dành cho phát triển

```sh
npm run test:cms
ASTRO_TELEMETRY_DISABLED=1 npm run build
python3 scripts/check-schema.py
```

Astro dev phục vụ `/admin/`, nhưng không chạy Cloudflare Pages Functions. Việc kiểm tra đăng nhập thật cần deployment Cloudflare với OAuth bindings; các kiểm thử Node dùng phản hồi GitHub mô phỏng, không xác nhận một tài khoản thật đã đăng nhập.

Đã kiểm tra biên dịch Functions bằng Wrangler 4.158.0. Có thể chạy lại từ thư mục repository:

```sh
XDG_CONFIG_HOME=/workspace/.onboarding/wrangler WRANGLER_SEND_METRICS=false \
  npm exec --cache /workspace/.npm-cache --yes --package wrangler@4.158.0 -- \
  wrangler pages functions build --outdir /workspace/.onboarding/cms-functions
```

Decap 3.17.3 được nạp từ jsDelivr với phiên bản cố định và SRI; checksum script đã được đối chiếu với gói npm chính thức. Khi nâng phiên bản, kiểm tra lại integrity và giao diện CMS. Thông tin đăng nhập GitHub do người dùng cấp được trao đổi qua popup cùng origin; callback kiểm tra state cookie và quyền ghi repository trước khi trả token về Decap, không ghi log token hay Client Secret.

## Dữ liệu sản phẩm

Website đọc sản phẩm từ `src/content/products/infeel/*.json`, `src/content/products/corance/*.json` và `src/content/products/toda/*.json`. Mỗi mẫu có một tệp riêng, nên các biên tập viên có thể sửa các mẫu khác nhau mà không phải sửa một danh sách chung gồm hàng trăm dòng. Dữ liệu hiện có gồm 367 mẫu INFEEL, 201 mẫu Corance và 84 mẫu TODA; giá, thông số, thứ tự và URL hiện hữu đã được giữ lại.

`src/data/catalogue.json`, `src/data/corance.json` và các bảng giá theo tiền tố cũ chỉ còn là nguồn nhập catalogue ban đầu. Các script nhập PDF trước đây ghi ra những nguồn này, không cập nhật sản phẩm đang quản lý bằng CMS. Không chạy lại chúng rồi kỳ vọng nội dung trực tiếp thay đổi; cần kiểm tra và chuyển bản cập nhật nhập liệu sang hồ sơ sản phẩm trước khi triển khai.

Các trường SEO và ALT riêng có thể để trống để tiếp tục dùng nội dung tự sinh. Thêm ảnh ứng dụng sẽ sinh thêm một trang tham khảo theo mã sản phẩm. Khi thêm sản phẩm, chọn đúng nhóm vật liệu, ảnh thực sự tồn tại và giá INFEEL lớn hơn 0. Build sẽ chặn trùng slug, trùng mã cùng thương hiệu, sai đường dẫn ảnh hoặc thiếu giá. Giá thấp nhất ở trang chủ được tính trực tiếp từ dữ liệu giá từng sản phẩm, không lấy từ bảng giá tiền tố cũ.
