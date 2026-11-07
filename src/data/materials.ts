import content from "./materials.json";

export interface Material {
  slug: string;
  name: string;
  shortName: string;
  mood: "warm" | "neutral" | "reflective";
  moodLabel: string;
  description: string;
  intro: string;
  image?: string;
  preview?: "stone" | "mirror";
  colors: { name: string; value: string }[];
  applications: { title: string; text: string }[];
  notes: string[];
  services: string[];
}

export const materials: Material[] = content.materials as Material[];

export const materialHref = (material: Material) => `/vat-lieu/${material.slug}/`;

export const findMaterials = (slugs: string[]): Material[] => slugs.map(slug => {
  const material = materials.find(item => item.slug === slug);
  if (!material) throw new Error(`Unknown material: ${slug}`);
  return material;
});
