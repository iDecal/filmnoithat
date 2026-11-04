import samples from "./catalogue.json";
export const catalogue = samples;
export type CatalogueSample = typeof samples[number];
export const samplesForMaterial = (category: string) => catalogue.filter(sample => sample.category === category);
export const sampleHref = (sample: CatalogueSample) => `/vat-lieu/mau/${sample.slug}/`;
export const cataloguePdf = "/catalogues/infeel-2026.pdf";
