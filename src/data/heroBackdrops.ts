// Decorative reference interiors are separate from product photographs and project evidence.
const kitchen = "/images/perspectives/ivory-oak-kitchen.webp";
const wood = "/images/perspectives/oak-living-room.webp";
const reception = "/images/perspectives/modern-reception.webp";
const metal = "/images/perspectives/champagne-metal-reception.webp";
export function heroBackdrop(path: string) {
  if (path.includes("/dich-vu/dan-film-thang-may")) return "/images/perspectives/walnut-elevator.webp";
  if (path.includes("/dich-vu/dan-film-tran")) return "/images/perspectives/oak-ceiling-living-room.webp";
  if (path.includes("/dich-vu/dan-film-ban")) return "/images/perspectives/light-oak-workspace.webp";
  if (path.includes("kim-loai")) return metal;
  if (path.includes("van-go") || path.includes("dan-film-tuong") || path.includes("gioi-thieu")) return wood;
  if (path.includes("tu-bep") || path.includes("don-sac") || path.startsWith("/lien-he") || path.startsWith("/blog") || path === "/vat-lieu/" || path === "/dich-vu/dan-film-noi-that/") return kitchen;
  return reception;
}
