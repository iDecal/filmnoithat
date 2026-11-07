import { infeelPrice } from "./infeelPrices";
import samples from "./catalogue.json";
import corance from "./corance.json";
export const rollSpecification = "1,23 m × 50 m";
export const cataloguePdf = "/catalogues/infeel-2026.pdf";
export const catalogue = [
  ...samples.map(sample => ({ ...sample, brand: "INFEEL", collection: "INFEEL 2026", pdf: cataloguePdf, ...infeelPrice(sample.code) })),
  ...corance.map(sample => ({ ...sample, imageSource: undefined, pricePerMetre: undefined })),
].map(sample => ({ ...sample, title: `${sample.name} — ${sample.color.name.toLowerCase()}` }));
export type CatalogueSample = typeof catalogue[number];
export const samplesForMaterial = (category: string) => catalogue.filter(sample => sample.category === category);
export const sampleHref = (sample: CatalogueSample) => `/vat-lieu/mau/${sample.slug}/`;
