import kitchenContent from "./kitchenPosts.json";
import guideContent from "./guidePosts.json";

export interface PostImage {
  src: string; alt: string; caption: string; width: number; height: number; title?: string;
}

export interface Post {
  slug: string;
  category?: string;
  title: string;
  description: string;
  date: string;
  image: string;
  intro: string;
  imageAlt?: string;
  imageTitle?: string;
  imageCaption?: string;
  imageWidth?: number;
  imageHeight?: number;
  focusKeyword?: string;
  faqs?: { question: string; answer: string }[];
  sections: {
    id: string; title: string; paragraphs: string[]; bullets?: string[];
    image?: PostImage;
    subsections?: { title: string; paragraphs: string[] }[];
    links?: { label: string; href: string }[];
  }[];
  materials: string[];
  services: string[];
}

export const posts: Post[] = [...kitchenContent.posts, ...guideContent.posts];

export const postHref = (post: Post) => `/blog/${post.slug}/`;
export const formatDate = (date: string) => new Intl.DateTimeFormat("vi-VN", { dateStyle: "long", timeZone: "Asia/Ho_Chi_Minh" }).format(new Date(`${date}T00:00:00+07:00`));
