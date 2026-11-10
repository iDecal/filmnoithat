/** Published retail prices in VND per linear metre, rounded up to 5,000 VND; no supplier costs. */
const retailByPrefix: Record<string, number> = {
  WD: 215000, SL: 215000, SD: 240000,
  SE: 245000, LW: 245000, FB: 245000, ST: 245000,
  MW: 305000, SM: 305000, MD: 305000, MT: 305000,
  PS: 290000, MS: 290000, EH: 290000, AT: 290000,
  NI: 375000, HG: 375000, AS: 360000, AB: 430000,
  LT: 945000, PW: 945000,
};
const retailByCode: Record<string, number> = {
  LW353: 275000, LW888: 275000, LW889: 275000, LW890: 275000,
  MT725: 505000, MT726: 505000, MT729: 505000, MT762: 505000, MT782: 505000,
};
export function infeelPrice(code: string) {
  const normalized = code.toUpperCase().replace(/\s+/g, "");
  const prefix = normalized.match(/^[A-Z]+/)?.[0] || "";
  const pricePerMetre = retailByCode[normalized] ?? retailByPrefix[prefix];
  if (!pricePerMetre) throw new Error(`Missing INFEEL retail price: ${code}`);
  return {
    pricePerMetre,
    rollSpecification: "1,23 m × 50 m",
  };
}
export const formatRetailPrice = (price: number) => `${new Intl.NumberFormat("vi-VN").format(price)}đ`;
