import samples from "./catalogue.json";
export const rollSpecification = "1,23 m × 30 m";
export const catalogue = samples.map(sample => ({ ...sample, title: `${sample.name} — ${sample.color.name.toLowerCase()}` }));
export type CatalogueSample = typeof catalogue[number];
export const samplesForMaterial = (category: string) => catalogue.filter(sample => sample.category === category);
export const sampleHref = (sample: CatalogueSample) => `/vat-lieu/mau/${sample.slug}/`;
export const cataloguePdf = "/catalogues/infeel-2026.pdf";
