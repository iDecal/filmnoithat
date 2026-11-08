export const rollSpecification = "1,23 m × 50 m";
export const cataloguePdf = "/catalogues/infeel-2026.pdf";
export interface ProductRecord {
  slug: string; code: string; name: string; group: string; category: string;
  brand: "INFEEL" | "Corance" | "TODA"; collection: string; pdf: string;
  image: string; imageAlt?: string; imageWidth: number; imageHeight: number;
  gallery?: { src: string; alt: string; caption?: string; width?: number; height?: number }[];
  application?: string | null; applicationAlt?: string;
  sourcePage: number; imageSource?: { pdf: string; page: number };
  pricePerMetre?: number | null; rollSpecification: string;
  color: { name: string; family: string; value: string };
  seoTitle?: string; seoDescription?: string; order: number;
}
const records = Object.values(import.meta.glob<ProductRecord>("../content/products/**/*.json", { eager: true, import: "default" }));
export const catalogue = records.sort((a,b) => a.order-b.order || a.slug.localeCompare(b.slug)).map(sample => ({
  ...sample, application: sample.application || null, pricePerMetre: sample.pricePerMetre || undefined,
  title: `${sample.name} — ${sample.color.name.toLowerCase()}`,
}));
export type CatalogueSample = typeof catalogue[number];
export const samplesForMaterial = (category: string) => catalogue.filter(sample => sample.category === category);
export const sampleHref = (sample: CatalogueSample) => `/vat-lieu/mau/${sample.slug}/`;
