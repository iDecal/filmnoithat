// Decorative reference interiors are separate from product photographs and project evidence.
const kitchen = "/images/perspectives/ivory-oak-kitchen.webp";
const wood = "/images/perspectives/oak-living-room.webp";
const reception = "/images/perspectives/modern-reception.webp";
const metal = "/images/perspectives/champagne-metal-reception.webp";
export function heroBackdrop(path: string) {
  if (path.includes("kim-loai") || path.includes("thang-may")) return metal;
  if (path.includes("van-go") || path.includes("dan-film-tuong") || path.includes("gioi-thieu")) return wood;
  if (path.includes("tu-bep") || path.includes("don-sac") || path.startsWith("/lien-he") || path.startsWith("/blog") || path === "/vat-lieu/" || path === "/dich-vu/dan-film-noi-that/") return kitchen;
  return reception;
}
