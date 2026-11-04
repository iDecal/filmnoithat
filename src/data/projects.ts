export interface CompletedProject {
  id: string;
  title: string;
  services: string[];
  image: string;
  summary: string;
  location?: string;
  scope: string[];
  materials: string[];
  gallery?: { src: string; alt: string }[];
}

// Chỉ thêm công trình đã xác nhận hoàn thành và có ảnh được phép sử dụng.
// services dùng slug trong services.ts để tự hiển thị đúng trang dịch vụ.
export const completedProjects: CompletedProject[] = [];

export const projectsForService = (slug: string) =>
  completedProjects.filter(project => slug === "dan-film-noi-that" || project.services.includes(slug));
