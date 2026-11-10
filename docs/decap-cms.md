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

Cloudflare Pages tự biên dịch các endpoint `/api/auth`, `/api/callback` và `/api/product-images`. `_routes.json` chỉ định các route này chạy Functions; các trang nội dung khác tiếp tục được phục vụ tĩnh. `/admin/` và config là tài nguyên công khai; quyền ghi nội dung do GitHub xác thực và kiểm soát. Nếu chưa có bindings OAuth, endpoint đăng nhập trả 503 với hướng dẫn cấu hình thay vì cố đăng nhập.

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

## Tải thêm ảnh cho từng sản phẩm

Trong `/admin/`, mở **Sản phẩm INFEEL**, **Sản phẩm Corance** hoặc **Sản phẩm TODA**, rồi chọn mã cần sửa:

1. Tìm **Ảnh vật liệu bổ sung** và bấm **Add ảnh vật liệu**.
2. Ở trường **Tải ảnh vật liệu lên**, bấm **Chọn một hình**, rồi tải tệp từ máy trong thư viện ảnh.
3. Chọn ảnh vừa tải, nhập ALT mô tả đúng ảnh; có thể thêm chú thích và kích thước gốc nếu biết.
4. Lưu và xuất bản nội dung theo quy trình CMS. Ảnh sẽ hiện trong thư viện ảnh của sản phẩm sau khi Cloudflare build xong.

Ảnh bổ sung không thay ảnh chính từ catalogue. Nếu muốn thay ảnh chính, dùng trường **Ảnh bề mặt chính** ở phía trên. Thư viện sản phẩm giữ tất cả ảnh bổ sung, có chọn ảnh thu nhỏ và phóng lớn; ALT/chú thích được giữ khi chuyển ảnh. Đường dẫn ảnh được đưa vào dữ liệu Product để công cụ tìm kiếm đọc được.

Trang `/vat-lieu/` có bộ lọc thương hiệu. Bộ lọc kết hợp với phong cách, cập nhật số mẫu của từng nhóm, và mang lựa chọn thương hiệu sang trang nhóm vật liệu. URL `?brand=TODA` (hoặc `INFEEL`, `Corance`) có thể chia sẻ và tải lại.

## Tải ảnh trực tiếp ngay trang sản phẩm

Mỗi trang `/vat-lieu/mau/<slug>/` có nút **Tải ảnh vật liệu lên** ngay dưới thư viện ảnh. Bấm để mở form, chọn tệp JPG/PNG/WebP (tối đa 5 MB), nhập ALT và chú thích, rồi bấm **Lưu ảnh vào sản phẩm**. Lần lưu đầu mở popup đăng nhập GitHub; chỉ tài khoản có quyền ghi repository được lưu ảnh. Không cần chuyển vào CMS.

Ảnh xem trước hiển thị ngay trong form. Khi lưu thành công, ảnh cũng được thêm ngay vào thư viện của trang đang mở bằng bản xem trước cục bộ; các lần truy cập khác nhận ảnh mới sau khi Cloudflare triển khai xong. Thông báo trạng thái phân biệt lưu thành công với việc website đang cập nhật. Ảnh catalogue chính và các ảnh bổ sung cũ được giữ nguyên.

Khác quy trình bản nháp của CMS, nút lưu ngay trang sản phẩm ghi trực tiếp lên `main` và kích hoạt triển khai. API `/api/product-images` kiểm tra origin, token GitHub, quyền ghi repository, thương hiệu/slug, chữ ký tệp ảnh và giới hạn dung lượng. Ảnh và bản cập nhật hồ sơ được ghi trong cùng một commit. Khi có sửa đổi đồng thời, API đọc lại phiên bản mới và bổ sung ảnh, không force push hay ghi đè các ảnh vừa được biên tập viên khác thêm.

Không lưu token vào localStorage hoặc đưa token trong URL. Luồng dùng lại OAuth App hiện có, không cần thêm secret triển khai. Astro dev không chạy Cloudflare Functions; kiểm thử trình duyệt cục bộ mô phỏng popup OAuth và phản hồi lưu, còn kiểm thử Node xác minh các lệnh GitHub API. Chỉ xác nhận một ảnh đã được lưu thực tế sau khi nhận phản hồi thành công từ GitHub trên bản triển khai.

## Tự động làm nét khi tải ảnh trên trang sản phẩm

Form tải ảnh trực tiếp bật sẵn **Tự động làm nét nhẹ**. Sau khi chọn tệp, trình duyệt xử lý và hiển thị bản xem trước; bỏ chọn để dùng nguyên ảnh gốc. Bản được gửi khi bấm lưu chính là bản xem trước đang chọn. Quy trình này áp dụng cho nút tải ảnh trên trang sản phẩm, không tự xử lý ảnh tải qua thư viện CMS.

Bộ lọc tăng nhẹ tương phản chi tiết theo độ sáng, bỏ qua vùng phẳng và vùng có độ trong suốt; không phóng lớn ảnh nhỏ hoặc sinh thêm vân. Ảnh lớn được giới hạn cạnh dài 2048 px và xuất WebP chất lượng cao, trong giới hạn 5 MB. Việc mã hóa lại có thể có sai khác nén nhỏ; hãy xem trước và đối chiếu mẫu thật khi cần đánh giá màu. Các ảnh catalogue và ảnh đã lưu trước đó không bị sửa.

Nếu trình duyệt không xử lý được tệp, có thể tắt làm nét để dùng ảnh gốc. Tính năng chuẩn bị ảnh được kiểm thử riêng về vùng màu đồng nhất, độ mạnh của cạnh và độ trong suốt, đồng thời kiểm thử trên trình duyệt để xác nhận kích thước, chế độ giữ ảnh gốc và tệp thực sự được gửi lên.

## Xóa ảnh ngay trên trang sản phẩm

Chọn ảnh thu nhỏ rồi bấm **Xóa ảnh đang chọn**. Hộp xác nhận hiển thị đúng ảnh; bấm **Xác nhận xóa** và đăng nhập GitHub nếu cần. Sau khi lưu thành công, ảnh được gỡ ngay khỏi giao diện đang mở; các lần truy cập khác cập nhật sau triển khai.

Sản phẩm luôn giữ ít nhất một ảnh vật liệu. Khi ảnh chính là ảnh vật liệu cuối cùng, nút xóa bị vô hiệu hóa và có hướng dẫn tải ảnh mới. Nếu đã có ảnh vật liệu bổ sung, xóa ảnh chính sẽ chuyển ảnh bổ sung đầu tiên thành ảnh chính. Các ảnh tham khảo có thể được xóa khỏi sản phẩm riêng lẻ mà không tác động ảnh dùng chung ở trang khác.

API xóa chỉ cập nhật hồ sơ sản phẩm và danh sách `hiddenImages`, không xóa tệp media dùng chung. Trong CMS, mục **Ảnh đã xóa khỏi sản phẩm** cho phép bỏ đường dẫn khỏi danh sách để ảnh tham khảo xuất hiện lại; ảnh vật liệu bổ sung đã gỡ có thể được chọn lại từ thư viện và thêm vào `gallery`. Xóa ảnh dùng cùng kiểm tra origin, quyền ghi GitHub và cơ chế cập nhật không force như khi tải ảnh.

### Quản lý ảnh và xóa sản phẩm ngay trên trang chi tiết

- Chọn nhiều tệp JPG/PNG/WebP cùng lúc (tối đa 5 MB mỗi tệp). Ảnh được làm nét nhẹ theo tùy chọn, có bản xem trước, rồi lưu lần lượt.
- Tiêu đề ảnh và ALT tự lấy từ tên, mã và thương hiệu trong bản ghi sản phẩm mới nhất; không cần nhập lại. Các trường này vẫn có thể sửa trong CMS.
- Nếu một ảnh lưu lỗi, bấm lưu lại để tiếp tục các ảnh còn lại trong hàng đợi; ảnh đã lưu thành công không gửi lại.
- Chọn một ảnh vật liệu trong thư viện rồi bấm **Đặt ảnh đang chọn làm ảnh chính**. Ảnh chính cũ chuyển vào thư viện bổ sung. Ảnh tham khảo không được dùng làm ảnh chính.
- **Xóa sản phẩm này** mở hộp xác nhận. Khi xác nhận, API xóa riêng bản ghi JSON sản phẩm khỏi nhánh `main`, giữ các tệp ảnh dùng chung và đưa người quản trị về `/vat-lieu`. Website cập nhật sau khi Cloudflare hoàn tất triển khai.
- Các thao tác lưu, đổi ảnh chính và xóa vẫn yêu cầu đăng nhập GitHub có quyền sửa repository, kiểm tra origin và cập nhật Git không dùng force. Nội dung có thể khôi phục qua lịch sử Git.

### Popup quản trị riêng trên website

Mở `/vat-lieu/?admin=1` (hoặc thêm `?admin=1` vào trang sản phẩm) rồi bấm **Đăng nhập quản trị**. Máy chủ xác minh tài khoản GitHub có quyền `push` đối với repository trước khi hiện thanh công cụ. Khách truy cập thông thường không thấy nút đăng nhập hay các thao tác quản trị; tham số `admin=1` chỉ hiện nút đăng nhập, không cấp quyền.

Trong **Quản lý sản phẩm**, chọn thương hiệu để **Thêm sản phẩm**, hoặc mở **Sửa sản phẩm này** trên trang chi tiết. Hai chức năng này dùng trình biên tập Decap hiện có trong popup, giữ nguyên luồng bản nháp/xuất bản của CMS. Decap có thể yêu cầu đăng nhập riêng trong lần mở đầu tiên; liên kết mở trong tab mới có sẵn nếu cần. **Ảnh & xóa sản phẩm** mở popup quản lý ảnh và xác nhận xóa trực tiếp.

Phiên quản trị trực tiếp được lưu trong `sessionStorage` của tab, kiểm tra lại quyền trên mỗi lần tải trang và xóa khi đăng xuất hoặc xác minh thất bại. Không truyền token qua URL. API tải ảnh, đổi ảnh chính và xóa vẫn tự kiểm tra quyền khi ghi dữ liệu; việc hiện thanh công cụ không thay thế kiểm tra máy chủ. Đăng xuất ở thanh công cụ kết thúc phiên quản trị trực tiếp; phiên đăng nhập riêng của Decap được quản lý trong Decap.

#### Đường vào quản trị dễ tìm

Dùng `/quan-tri/` để thấy nút **Đăng nhập quản trị bằng GitHub** ngay trong nội dung trang. Chế độ hiện nút đăng nhập được giữ trong tab khi chuyển sang trang vật liệu hoặc sản phẩm, nhưng không cấp quyền quản trị. Khách chưa mở chế độ quản trị vẫn không thấy các nút này. Khi vào quản trị từ tên miền `filmnoithat.vn`, trình duyệt đưa về `https://filmnoithat.pages.dev/quan-tri/` để dùng đúng origin và callback đã đăng ký của OAuth. Trang tiện ích này được đặt `noindex` và loại khỏi sitemap.

### Sửa sản phẩm trực quan

Sau khi đăng nhập, mở trang một mẫu → **Quản lý sản phẩm → Sửa sản phẩm này**. Popup tải bản ghi mới nhất từ GitHub rồi cho sửa tên, mã, thương hiệu, nhóm vật liệu, dòng bề mặt, bộ sưu tập, tông màu, quy cách, giá theo mét dài, tiêu đề/mô tả SEO và tiêu đề/ALT từng ảnh. Cột xem trước thay đổi theo dữ liệu đang nhập. Các chức năng kéo thả/tải nhiều ảnh, làm nét nhẹ, chọn ảnh chính và xóa ảnh/sản phẩm nằm bên dưới trong cùng popup.

**Lưu thay đổi** ghi trực tiếp vào `main`, giữ URL sản phẩm và các ảnh không chỉnh sửa. Đổi thương hiệu chuyển bản ghi sang thư mục tương ứng bằng một commit; đổi mã kiểm tra trùng mã trong thương hiệu. Có thể để giá trống cho bất kỳ thương hiệu nào để hiển thị liên hệ báo giá. SEO trống sử dụng nội dung tự tạo sẵn của website. Phần xem trước tìm kiếm mang tính minh họa; kết quả tìm kiếm thực tế do công cụ tìm kiếm quyết định.

API `/api/products` chỉ cho tài khoản có quyền `push` đọc/sửa. Khi lưu, API so dữ liệu gốc của từng trường và từng ảnh với bản mới nhất, báo xung đột nếu có người khác sửa cùng thông tin; các lần tải ảnh hoặc sửa trường khác được giữ nguyên. Bản đang sửa không mất khi lưu lỗi hay đóng/mở lại popup trong cùng trang. **Tải lại bản đã lưu** có xác nhận nếu có thay đổi chưa lưu. Người dùng vẫn cần chờ Cloudflare cập nhật trước khi khách thấy bản mới. **Thêm sản phẩm** tiếp tục dùng Decap; phần sửa sản phẩm không còn mở iframe Decap.

### Thứ tự ảnh sản phẩm

Các nút thao tác ảnh hiển thị cùng hàng trên máy tính, tự xuống dòng trên màn hình nhỏ. Trong popup, kéo thả thẻ ảnh hoặc dùng nút **← / →**, sau đó bấm **Lưu thứ tự**. Thẻ đầu tiên có nhãn **1 · Ảnh chính**; khi lưu, ảnh này chuyển vào trường `image` của sản phẩm để dùng nhất quán trong danh sách vật liệu, sản phẩm liên quan và các vị trí giới thiệu. Các ảnh còn lại được lưu theo thứ tự trong `gallery`; ALT, tiêu đề và kích thước được giữ lại. **Hủy sắp xếp** bỏ thay đổi thứ tự chưa lưu.

Ảnh tham khảo không nằm trong thứ tự ảnh vật liệu. API chỉ chấp nhận đầy đủ các ảnh vật liệu hiện có; nếu có ảnh mới được tải lên, xóa hoặc đổi thứ tự từ nơi khác trong khi sửa, thao tác lưu báo xung đột để tránh mất ảnh. Tải lại trang trước khi sắp xếp lại. Phần “Ứng dụng và cách chọn film dán nội thất” đã được bỏ khỏi mẫu trang chi tiết sản phẩm.

## Xóa nhanh trong danh sách mẫu vật liệu

Sau khi đăng nhập quản trị bằng tài khoản GitHub có quyền ghi, mở trang nhóm vật liệu (ví dụ `/vat-lieu/van-go/`). Mỗi thẻ mẫu có nút **Xóa sản phẩm**. Hộp xác nhận hiển thị thương hiệu và mã mẫu; bấm **Hủy** để giữ lại hoặc **Xác nhận xóa** để gỡ hồ sơ sản phẩm.

Nút sử dụng API xóa sản phẩm hiện có, tiếp tục kiểm tra quyền ghi ở máy chủ. Khi API xác nhận thành công, thẻ được ẩn ngay và số kết quả lọc được cập nhật; trang công khai cập nhật sau khi Cloudflare triển khai. Tệp ảnh được giữ lại. Khi yêu cầu thất bại, thẻ vẫn giữ nguyên và thông báo lỗi xuất hiện trong hộp xác nhận.
