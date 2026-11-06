import { catalogue, type CatalogueSample } from "./catalogue";
import { completedProjects } from "./projects";
import { spaces } from "./spaces";

export interface ProjectStory {
  slug: string;
  title: string;
  kind: "completed" | "catalogue" | "reference";
  description: string;
  images: { src: string; alt: string }[];
  sampleSlugs: string[];
  categories: string[];
  location?: string;
  scope: string[];
  materials: string[];
  sourcePage?: number;
}
const catalogueStories: ProjectStory[] = catalogue.filter(sample => sample.application).map(sample => ({
  slug: `ung-dung-${sample.slug}`, title: `Gợi ý ứng dụng ${sample.name.toLowerCase()} ${sample.code}`,
  kind: "catalogue", description: `Phối cảnh minh họa cho mẫu ${sample.code} trong catalogue ${sample.collection}. Tham khảo cách đặt chất liệu trong không gian và đối chiếu với mẫu thật trước khi chọn.`,
  images: [{ src: sample.application!, alt: `Phối cảnh mẫu ${sample.code} từ catalogue ${sample.collection}` }],
  sampleSlugs: [sample.slug], categories: [sample.category], scope: [], materials: [sample.title], sourcePage: sample.sourcePage,
}));
const referenceStories: ProjectStory[] = spaces.map((space,index) => ({
  slug: `khong-gian-tham-khao-${index + 1}`, title: space.title, kind: "reference",
  description: space.text, images: [{ src: space.image, alt: space.title }], sampleSlugs: [],
  categories: [space.material.split("/").filter(Boolean).at(-1)!], scope: [], materials: [],
}));
const actualStories: ProjectStory[] = completedProjects.map(project => ({
  slug: project.id, title: project.title, kind: "completed", description: project.summary,
  images: [{ src: project.image, alt: project.title }, ...(project.gallery || [])],
  sampleSlugs: project.sampleSlugs || [], categories: [...new Set((project.sampleSlugs || []).map(slug => catalogue.find(sample => sample.slug === slug)?.category).filter((category): category is string => !!category))],
  location: project.location, scope: project.scope, materials: project.materials,
}));
export const projectStories = [...actualStories, ...catalogueStories, ...referenceStories];
export const storyHref = (story: ProjectStory) => `/cong-trinh/${story.slug}/`;
export const storyLabel = (story: ProjectStory) => ({ completed: "Công trình thực tế", catalogue: "Ảnh ứng dụng catalogue", reference: "Không gian tham khảo" })[story.kind];
export const storiesForSample = (sample: CatalogueSample) => {
  const exact = projectStories.filter(story => story.sampleSlugs.includes(sample.slug));
  const related = projectStories.filter(story => !exact.includes(story) && story.categories.includes(sample.category) && (story.kind !== "catalogue" || story.sampleSlugs.some(slug => catalogue.find(item => item.slug === slug)?.brand === sample.brand)));
  return [...exact, ...related].slice(0, 5);
};
