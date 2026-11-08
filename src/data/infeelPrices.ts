/** Published retail prices in VND per linear metre; no supplier costs. */
const retailByPrefix: Record<string, number> = {
  WD: 214500, SL: 214500, SD: 235950,
  SE: 243100, LW: 243100, FB: 243100, ST: 243100,
  MW: 300300, SM: 300300, MD: 300300, MT: 300300,
  PS: 286000, MS: 286000, EH: 286000, AT: 286000,
  NI: 371800, HG: 371800, AS: 357500, AB: 429000,
  LT: 943800, PW: 943800,
};
const retailByCode: Record<string, number> = {
  LW353: 271700, LW888: 271700, LW889: 271700, LW890: 271700,
  MT725: 500500, MT726: 500500, MT729: 500500, MT762: 500500, MT782: 500500,
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
