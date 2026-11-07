import content from "./services.json";

export interface Service {
  slug: string;
  name: string;
  heading: string;
  title: string;
  description: string;
  intro: string;
  image: string;
  imageAlt?: string;
  sections: { title: string; text: string }[];
  preparation: string[];
  materials: string[];
  faqs: { question: string; answer: string }[];
}

export const services: Service[] = content.services as Service[];

export const serviceHref = (service: Service) => `/dich-vu/${service.slug}/`;
