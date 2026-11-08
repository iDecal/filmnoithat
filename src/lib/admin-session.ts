const key = "filmnoithat-admin-session";
let token: string | null = null;
const stored = () => { try { return sessionStorage.getItem(key); } catch { return null; } };
export const hasAdminSession = () => !!stored();
export function logoutAdmin() {
  token = null;
  try { sessionStorage.removeItem(key); } catch { /* private storage may be unavailable */ }
  window.dispatchEvent(new Event("admin-logout"));
}
async function verify(candidate: string) {
  const response = await fetch("/api/admin-session", {headers:{Authorization:`Bearer ${candidate}`},cache:"no-store"});
  const result = await response.json();
  if (!response.ok || result.admin !== true) throw new Error(result.message || "Không có quyền quản trị.");
  token = candidate;
  try { sessionStorage.setItem(key,candidate); } catch { /* current page still works */ }
  window.dispatchEvent(new Event("admin-login"));
  return candidate;
}
export async function restoreAdmin() {
  const candidate = stored(); if (!candidate) return false;
  try { await verify(candidate); return true; } catch { logoutAdmin(); return false; }
}
export async function loginAdmin() {
  if (token) return token;
  try { return await verify(await popupLogin()); } catch (error) { logoutAdmin(); throw error; }
}
const popupLogin = () => new Promise<string>((resolve, reject) => {
      const popup = window.open("/api/auth?provider=github", "product-image-login", "width=700,height=750");
      if (!popup) { reject(new Error("Hãy cho phép cửa sổ đăng nhập GitHub bật lên rồi thử lại.")); return; }
      const origin = window.location.origin;
      let finished = false;
      const cleanup = () => { finished = true; window.removeEventListener("message", receive); window.clearInterval(watch); window.clearTimeout(timeout); };
      const receive = (event: MessageEvent) => {
        if (event.origin !== origin || event.source !== popup || typeof event.data !== "string") return;
        if (event.data === "authorizing:github") { popup.postMessage(event.data, origin); return; }
        if (event.data.startsWith("authorization:github:success:")) {
          try {
            const data = JSON.parse(event.data.slice("authorization:github:success:".length));
            if (typeof data.token !== "string" || !data.token) throw new Error();
            cleanup(); popup.close(); resolve(data.token);
          } catch { cleanup(); popup.close(); reject(new Error("Không nhận được phiên đăng nhập GitHub hợp lệ.")); }
        } else if (event.data.startsWith("authorization:github:error:")) { cleanup(); popup.close(); reject(new Error("Đăng nhập GitHub chưa thành công.")); }
      };
      window.addEventListener("message", receive);
      const watch = window.setInterval(() => { if (!finished && popup.closed) { cleanup(); reject(new Error("Đã đóng đăng nhập. Bạn có thể bấm lưu để thử lại.")); } }, 500);
      const timeout = window.setTimeout(() => { cleanup(); popup.close(); reject(new Error("Đăng nhập hết thời gian. Vui lòng thử lại.")); }, 180000);
    });
