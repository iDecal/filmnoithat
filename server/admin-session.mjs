export async function adminSession({request, env}, fetcher = fetch) {
  const headers = {'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
  const reply = (status, data) => Response.json(data, {status, headers});
  if (request.method !== 'GET') return reply(405, {message:'Phương thức không hợp lệ.'});
  const origin = new URL(env.CMS_SITE_URL || 'https://filmnoithat.pages.dev').origin;
  if (new URL(request.url).origin !== origin || (request.headers.has('Origin') && request.headers.get('Origin') !== origin)) return reply(403,{message:'Nguồn yêu cầu không hợp lệ.'});
  const authorization = request.headers.get('Authorization') || '';
  if (!/^Bearer [^\s]+$/.test(authorization)) return reply(401,{message:'Vui lòng đăng nhập quản trị.'});
  try {
    const response = await fetcher('https://api.github.com/repos/iDecal/filmnoithat',{headers:{Authorization:authorization,Accept:'application/vnd.github+json','User-Agent':'filmnoithat-admin'}});
    if (response.status === 401) return reply(401,{message:'Phiên đăng nhập đã hết hạn.'});
    if (!response.ok) return reply(503,{message:'Chưa xác minh được quyền quản trị. Vui lòng thử lại.'});
    if (!(await response.json()).permissions?.push) return reply(403,{message:'Tài khoản chưa có quyền quản trị website.'});
    return reply(200,{admin:true});
  } catch { return reply(503,{message:'Chưa xác minh được quyền quản trị. Vui lòng thử lại.'}); }
}
