import { projectStories, storyHref } from "../data/projectStories";
import type { APIRoute } from "astro";
import { posts, postHref } from "../data/posts";
import { catalogue, sampleHref } from "../data/catalogue";

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error("Configure the production site URL before generating the sitemap");
  const staticPages = Object.keys(import.meta.glob("./**/*.astro")).filter(path => !path.includes("[")).map(path => {
    const route = path.replace(/^\.\//, "/").replace(/index\.astro$/, "").replace(/\.astro$/, "/");
    return new URL(route, site).href;
  });
  const urls = [...new Set([...staticPages, ...posts.map(post => new URL(postHref(post), site).href), ...catalogue.map(sample => new URL(sampleHref(sample), site).href), ...projectStories.map(story => new URL(storyHref(story), site).href)])].sort();
  const escapeXml = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${urls.map(url => `<url><loc>${escapeXml(url)}</loc>${(() => {
    const post = posts.find(post => new URL(postHref(post), site).href === url);
    const images = post ? [post.image, ...post.sections.flatMap(section => section.image ? [section.image.src] : [])] : [];
    return [...new Set(images)].map(image => `<image:image><image:loc>${escapeXml(new URL(image, site).href)}</image:loc></image:image>`).join("");
  })()}</url>`).join("")}</urlset>`, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
