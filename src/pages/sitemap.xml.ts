import type { APIRoute } from "astro";
import { posts, postHref } from "../data/posts";

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error("Configure the production site URL before generating the sitemap");
  const staticPages = Object.keys(import.meta.glob("./**/*.astro")).filter(path => !path.includes("[")).map(path => {
    const route = path.replace(/^\.\//, "/").replace(/index\.astro$/, "").replace(/\.astro$/, "/");
    return new URL(route, site).href;
  });
  const urls = [...new Set([...staticPages, ...posts.map(post => new URL(postHref(post), site).href)])].sort();
  const escapeXml = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(url => `<url><loc>${escapeXml(url)}</loc></url>`).join("")}</urlset>`, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
