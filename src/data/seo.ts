export function breadcrumbSchema(origin: URL, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Trang chủ", path: "/" }, ...items].map((item, index) => ({
      "@type": "ListItem", position: index + 1, name: item.name, item: new URL(item.path, origin).href,
    })),
  };
}
