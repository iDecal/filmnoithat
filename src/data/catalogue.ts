import samples from "./catalogue.json";
export const rollSpecification = "1,23 m × 30 m";
export const catalogue = samples.map(sample => ({ ...sample, title: `${sample.name} — ${sample.color.name.toLowerCase()}` }));
export type CatalogueSample = typeof catalogue[number];
export const samplesForMaterial = (category: string) => catalogue.filter(sample => sample.category === category);
export const sampleHref = (sample: CatalogueSample) => `/vat-lieu/mau/${sample.slug}/`;
export const cataloguePdf = "/catalogues/infeel-2026.pdf";

// Group only the same catalogue series and named surface, up to six samples.
// This is a browsing aid, not a claim that technical specifications are identical.
const variantBuckets = new Map<string, CatalogueSample[]>();
for (const sample of catalogue) {
  const key = `${sample.category}:${sample.code.split(" ")[0]}:${sample.group}`;
  const bucket = variantBuckets.get(key) || [];
  bucket.push(sample);
  variantBuckets.set(key, bucket);
}
export const sampleFamilies = [...variantBuckets.values()].flatMap(bucket => {
  const sorted = [...bucket].sort((a,b) => a.code.localeCompare(b.code));
  return Array.from({ length: Math.ceil(sorted.length / 6) }, (_, index) => ({
    id: sorted[index * 6].slug,
    name: sorted[0].name,
    group: sorted[0].group,
    category: sorted[0].category,
    variants: sorted.slice(index * 6, index * 6 + 6),
  }));
});
export const familiesForMaterial = (category: string) => sampleFamilies.filter(family => family.category === category);
export const variantsForSample = (slug: string) => sampleFamilies.find(family => family.variants.some(sample => sample.slug === slug))?.variants || [];
