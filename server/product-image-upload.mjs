const API = 'https://api.github.com/repos/iDecal/filmnoithat';
const MAX_FILE = 5 * 1024 * 1024;
const noCache = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' };
const reply = (message, status = 400, extra = {}) => new Response(JSON.stringify({ message, ...extra }), { status, headers: noCache });
const encode = bytes => {
  let text = '';
  for (let i = 0; i < bytes.length; i += 32768) text += String.fromCharCode(...bytes.subarray(i, i + 32768));
  return btoa(text);
};
const decode = content => new TextDecoder().decode(Uint8Array.from(atob(content.replace(/\s/g, '')), c => c.charCodeAt(0)));
function imageExtension(bytes, type) {
  if (type === 'image/png' && bytes.slice(0,8).join(',') === '137,80,78,71,13,10,26,10') return 'png';
  if (type === 'image/jpeg' && bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) return 'jpg';
  if (type === 'image/webp' && new TextDecoder().decode(bytes.slice(0,4)) === 'RIFF' && new TextDecoder().decode(bytes.slice(8,12)) === 'WEBP') return 'webp';
  return null;
}
async function limitedBytes(request, maxBytes) {
  const reader = request.body?.getReader(); if (!reader) throw new Error('invalid_body');
  const chunks = []; let size = 0;
  while (true) {
    const { done, value } = await reader.read(); if (done) break;
    size += value.byteLength;
    if (size > maxBytes) { await reader.cancel(); throw new Error('too_large'); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  return bytes;
}
async function limitedForm(request) {
  const bytes = await limitedBytes(request, MAX_FILE + 65536);
  return new Response(bytes, { headers: { 'Content-Type': request.headers.get('Content-Type') || '' } }).formData();
}
export async function uploadProductImage({ request, env }, fetcher = fetch) {
  if (request.method !== 'POST') return reply('Chỉ hỗ trợ tải ảnh bằng POST.', 405);
  const siteOrigin = new URL(env.CMS_SITE_URL || 'https://filmnoithat.pages.dev').origin;
  if (request.headers.get('Origin') !== siteOrigin || new URL(request.url).origin !== siteOrigin) return reply('Nguồn yêu cầu không hợp lệ.', 403);
  const authorization = request.headers.get('Authorization') || '';
  if (!/^Bearer [^\s]+$/.test(authorization)) return reply('Vui lòng đăng nhập GitHub để lưu ảnh.', 401);
  if (!request.headers.get('Content-Type')?.startsWith('multipart/form-data;')) return reply('Vui lòng chọn tệp ảnh.');
  let form;
  try { form = await limitedForm(request); }
  catch (error) { return reply(error.message === 'too_large' ? 'Ảnh tối đa 5 MB.' : 'Không đọc được tệp ảnh.', error.message === 'too_large' ? 413 : 400); }
  const file = form.get('file');
  const slug = String(form.get('slug') || ''); const brand = String(form.get('brand') || '');
  const alt = String(form.get('alt') || '').trim(); const caption = String(form.get('caption') || '').trim();
  const width = Number(form.get('width')); const height = Number(form.get('height'));
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !['INFEEL','Corance','TODA'].includes(brand)) return reply('Sản phẩm không hợp lệ.');
  if (!alt || alt.length > 500 || caption.length > 1500) return reply('Nhập ALT từ 1–500 ký tự; chú thích tối đa 1.500 ký tự.');
  if (!file || typeof file.arrayBuffer !== 'function' || !file.size || file.size > MAX_FILE) return reply('Chọn ảnh JPG, PNG hoặc WebP, tối đa 5 MB.', file?.size > MAX_FILE ? 413 : 400);
  if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1 || width > 16000 || height > 16000 || width * height > 60000000) return reply('Kích thước ảnh không hợp lệ hoặc quá lớn.');
  const bytes = new Uint8Array(await file.arrayBuffer()); const extension = imageExtension(bytes, file.type);
  if (!extension) return reply('Tệp phải là ảnh JPG, PNG hoặc WebP.');
  const headers = { Authorization: authorization, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json', 'User-Agent': 'filmnoithat-product-upload' };
  const api = async (path, method = 'GET', data) => {
    const response = await fetcher(`${API}${path}`, { method, headers, ...(data ? { body: JSON.stringify(data) } : {}) });
    return { response, data: response.ok ? await response.json() : null };
  };
  try {
    const access = await api('');
    if (access.response.status === 401) return reply('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.', 401);
    if (!access.response.ok || !access.data?.permissions?.push) return reply('Tài khoản GitHub chưa có quyền sửa website.', 403);
    const recordPath = `src/content/products/${brand.toLowerCase()}/${slug}.json`;
    const suffix = crypto.randomUUID().replaceAll('-', '').slice(0,12);
    const imagePath = `public/images/uploads/products/${slug}/film-dan-noi-that-${brand.toLowerCase()}-${slug.replace(new RegExp(`^${brand.toLowerCase()}-`), '')}-${suffix}.${extension}`;
    const photo = { src: imagePath.slice('public'.length), alt, caption, width, height };
    let imageBlob;
    // Optimistic concurrency: a new tree always starts from the latest main HEAD.
    // Never force an update or overwrite another editor's content.
    for (let attempt = 0; attempt < 3; attempt++) {
      const head = await api('/git/ref/heads/main'); if (!head.response.ok) throw new Error('github');
      const headSha = head.data.object.sha;
      const current = await api(`/contents/${recordPath}?ref=${encodeURIComponent(headSha)}`);
      if (!current.response.ok || current.data?.encoding !== 'base64' || current.data?.type !== 'file') return reply('Không tìm thấy sản phẩm để lưu ảnh.', 404);
      const product = JSON.parse(decode(current.data.content));
      if (product.slug !== slug || product.brand !== brand || (product.gallery && !Array.isArray(product.gallery))) return reply('Thông tin sản phẩm không khớp.', 409);
      const parent = await api(`/git/commits/${headSha}`); if (!parent.response.ok) throw new Error('github');
      if (!imageBlob) {
        const result = await api('/git/blobs', 'POST', { content: encode(bytes), encoding: 'base64' });
        if (!result.response.ok) throw new Error('github'); imageBlob = result.data.sha;
      }
      product.gallery = [...(product.gallery || []), photo];
      const record = await api('/git/blobs', 'POST', { content: encode(new TextEncoder().encode(JSON.stringify(product, null, 2) + '\n')), encoding: 'base64' });
      if (!record.response.ok) throw new Error('github');
      const tree = await api('/git/trees', 'POST', { base_tree: parent.data.tree.sha, tree: [{ path: imagePath, mode: '100644', type: 'blob', sha: imageBlob }, { path: recordPath, mode: '100644', type: 'blob', sha: record.data.sha }] });
      if (!tree.response.ok) throw new Error('github');
      const commit = await api('/git/commits', 'POST', { message: `Add material photo for ${brand} ${product.code}`, parents: [headSha], tree: tree.data.sha });
      if (!commit.response.ok) throw new Error('github');
      const update = await api('/git/refs/heads/main', 'PATCH', { sha: commit.data.sha, force: false });
      if (update.response.ok) return reply('Đã lưu ảnh. Website đang cập nhật; ảnh xem trước hiện ngay trên trang này.', 201, { photo, commit: commit.data.sha });
      if (![409,422].includes(update.response.status)) throw new Error('github');
    }
    return reply('Có thay đổi mới trong lúc lưu ảnh. Vui lòng thử lại.', 409);
  } catch {
    return reply('Chưa lưu được ảnh vào website. Vui lòng thử lại.', 502);
  }
}

export async function deleteProductImage({ request, env }, fetcher = fetch) {
  if (request.method !== 'DELETE') return reply('Phương thức không hợp lệ.', 405);
  const origin = new URL(env.CMS_SITE_URL || 'https://filmnoithat.pages.dev').origin;
  if (request.headers.get('Origin') !== origin || new URL(request.url).origin !== origin) return reply('Nguồn yêu cầu không hợp lệ.', 403);
  const authorization = request.headers.get('Authorization') || '';
  if (!/^Bearer [^\s]+$/.test(authorization)) return reply('Vui lòng đăng nhập GitHub để xóa ảnh.', 401);
  let input;
  try { input = JSON.parse(new TextDecoder().decode(await limitedBytes(request, 8192))); }
  catch { return reply('Yêu cầu xóa không hợp lệ.'); }
  const { slug, brand, src } = input;
  if (typeof slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !['INFEEL','Corance','TODA'].includes(brand) || typeof src !== 'string' || !src.startsWith('/images/') || src.includes('..') || src.length > 1500) return reply('Ảnh hoặc sản phẩm không hợp lệ.');
  const headers = { Authorization: authorization, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json', 'User-Agent': 'filmnoithat-product-upload' };
  const api = async (path, method = 'GET', data) => {
    const response = await fetcher(`${API}${path}`, { method, headers, ...(data ? { body: JSON.stringify(data) } : {}) });
    return { response, data: response.ok ? await response.json() : null };
  };
  try {
    const access = await api('');
    if (access.response.status === 401) return reply('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.', 401);
    if (!access.response.ok || !access.data?.permissions?.push) return reply('Tài khoản chưa có quyền sửa website.', 403);
    const path = `src/content/products/${brand.toLowerCase()}/${slug}.json`;
    for (let attempt = 0; attempt < 3; attempt++) {
      const head = await api('/git/ref/heads/main'); if (!head.response.ok) throw new Error();
      const sha = head.data.object.sha;
      const current = await api(`/contents/${path}?ref=${encodeURIComponent(sha)}`);
      if (!current.response.ok || current.data?.type !== 'file' || current.data?.encoding !== 'base64') return reply('Không tìm thấy sản phẩm.', 404);
      const product = JSON.parse(decode(current.data.content));
      if (product.slug !== slug || product.brand !== brand) return reply('Thông tin sản phẩm không khớp.', 409);
      const hidden = new Set(product.hiddenImages || []);
      if (product.image === src) {
        const replacement = (product.gallery || []).find(photo => photo.src !== src && !hidden.has(photo.src));
        if (!replacement) return reply('Sản phẩm cần ít nhất một ảnh vật liệu. Hãy tải thêm ảnh trước khi xóa ảnh chính.', 409);
        product.image = replacement.src; product.imageAlt = replacement.alt; delete product.imageSource;
        product.imageWidth = replacement.width || 1000; product.imageHeight = replacement.height || 750;
        product.gallery = (product.gallery || []).filter(photo => photo.src !== replacement.src);
      }
      product.gallery = (product.gallery || []).filter(photo => photo.src !== src);
      hidden.add(src); product.hiddenImages = [...hidden];
      const parent = await api(`/git/commits/${sha}`); if (!parent.response.ok) throw new Error();
      const blob = await api('/git/blobs', 'POST', { content: encode(new TextEncoder().encode(JSON.stringify(product, null, 2) + '\n')), encoding: 'base64' });
      if (!blob.response.ok) throw new Error();
      // Remove the product association, never a shared catalogue/media file.
      const tree = await api('/git/trees', 'POST', { base_tree: parent.data.tree.sha, tree: [{ path, mode: '100644', type: 'blob', sha: blob.data.sha }] });
      if (!tree.response.ok) throw new Error();
      const commit = await api('/git/commits', 'POST', { message: `Remove photo from ${brand} ${product.code}`, parents: [sha], tree: tree.data.sha });
      if (!commit.response.ok) throw new Error();
      const update = await api('/git/refs/heads/main', 'PATCH', { sha: commit.data.sha, force: false });
      if (update.response.ok) return reply('Đã xóa ảnh khỏi sản phẩm. Website đang cập nhật.', 200, { deletedSrc: src, primary: product.image, galleryCount: product.gallery.length });
      if (![409,422].includes(update.response.status)) throw new Error();
    }
    return reply('Có thay đổi mới trong lúc xóa. Vui lòng thử lại.', 409);
  } catch { return reply('Chưa xóa được ảnh. Vui lòng thử lại.', 502); }
}
