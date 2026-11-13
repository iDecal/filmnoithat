import { categoryIcon, type IconName } from "./icons";
import type { Material } from "./materials";
import { services, serviceHref } from "./services";

export const colorGuideHref = "/huong-dan-phoi-mau/";
const destinations: Record<string, string[]> = {
  "van-go": ["dan-film-tu-bep", "dan-film-ban", "dan-film-tuong"],
  "don-sac": ["dan-film-tu-bep", "dan-film-ban", "phoi-mau"],
  "van-vai": ["dan-film-tu-bep", "dan-film-tuong", "phoi-mau"],
  "be-tong": ["dan-film-tuong", "dan-film-ban", "phoi-mau"],
  "kim-loai": ["dan-film-thang-may", "dan-film-tu-bep", "dan-film-tuong"],
  "da-cam-thach": ["dan-film-tuong", "dan-film-ban", "dan-film-ban"],
  "trang-guong": ["dan-film-tuong", "dan-film-tu-bep", "phoi-mau"],
};
export function applicationLinks(material: Material) {
  return material.applications.map((item, index) => {
    const destination = destinations[material.slug]?.[index];
    const service = services.find(service => service.slug === destination);
    return {
      ...item,
      href: service ? serviceHref(service) : colorGuideHref,
      icon: (service ? categoryIcon(service.slug) : "swatches") as IconName,
      linkLabel: service ? `Xem dịch vụ ${service.name.toLowerCase()}` : "Xem hướng dẫn phối màu",
    };
  });
}
