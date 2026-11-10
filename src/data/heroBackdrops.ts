// Decorative hero backdrops are separate from product photos and project evidence.
// Prefer landscape originals large enough for the photographic side of the hero.
const kitchen = "/images/blog/tu-bep/film-noi-that-tu-bep-van-go-trung-tinh-voi-dao-bep-va-ghe-tron.webp"; // 1448 × 1086
const film = "/images/cong-trinh/banner-film-dan-noi-that.jpg"; // 2560 × 1438
const wood = "/images/vat-lieu/van-go/CAD402.jpg"; // 6720 × 4480
const table = "/images/cong-trinh/dan-film-noi-that-mat-ban.jpg"; // 1280 × 820
const elevator = "/images/cong-trinh/dan-film-noi-that-thang-may.jpg"; // 1280 × 720

export function heroBackdrop(path: string) {
  if (path.includes("/vat-lieu/van-go")) return wood;
  if (path.includes("/dich-vu/dan-film-ban")) return table;
  if (path.includes("/dich-vu/dan-film-thang-may")) return elevator;
  if (path === "/" || path.includes("tu-bep") || path.startsWith("/gioi-thieu") || path.startsWith("/lien-he") || path === "/dich-vu/dan-film-noi-that/") return kitchen;
  return film;
}
