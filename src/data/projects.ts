export interface ProjectPhoto { src: string; alt: string }
export interface ProjectComparison { title: string; before?: ProjectPhoto; after?: ProjectPhoto }
export interface CompletedProject {
  id: string;
  title: string;
  services: string[];
  sampleSlugs?: string[];
  image: string;
  summary: string;
  location?: string;
  startDate?: string;
  completionDate?: string;
  beforeAfter?: ProjectComparison[];
  scope: string[];
  materials: string[];
  gallery?: { src: string; alt: string }[];
}

// Chỉ thêm công trình đã xác nhận hoàn thành và có ảnh được phép sử dụng.
// services dùng slug trong services.ts để tự hiển thị đúng trang dịch vụ.
export const completedProjects: CompletedProject[] = [];

export const projectsForService = (slug: string) =>
  completedProjects.filter(project => slug === "dan-film-noi-that" || project.services.includes(slug));
