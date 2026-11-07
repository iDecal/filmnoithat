import { productHeading } from "./seoTitles";
import { site as business, internationalPhone } from "./site";
import { catalogue, sampleHref } from "./catalogue";
import { materials, materialHref } from "./materials";
import { services, serviceHref } from "./services";
import { posts, postHref } from "./posts";
import { projectStories, storyHref, storyLabel } from "./projectStories";

type Node = Record<string, unknown>;
export interface SchemaPage {
  origin: URL; path: string; title: string; description: string; image: string;
  businessName?: string;
  supplied?: Node[]; faqs?: { question: string; answer: string }[];
}
export function websiteSchema({ origin, path, title, description, image, supplied = [], faqs = [], businessName = business.name }: SchemaPage) {
  const absolute = (value: string) => new URL(value, origin).href;
  const url = absolute(path);
  const orgId = absolute("/#organization");
  const siteId = absolute("/#website");
  const pageId = url + "#webpage";
  const ref = (id: string) => ({ "@id": id });
  const graph: Node[] = [
    { "@type": "Organization", "@id": orgId, name: businessName, url: origin.href, description: business.tagline,
      telephone: internationalPhone, email: business.email, areaServed: { "@type": "Country", name: "Việt Nam" },
      contactPoint: { "@type": "ContactPoint", telephone: internationalPhone, email: business.email, contactType: "customer service", availableLanguage: "vi", url: business.zaloHref } },
    { "@type": "WebSite", "@id": siteId, url: origin.href, name: businessName, inLanguage: "vi-VN", publisher: ref(orgId) },
  ];
  const page: Node = { "@type": "WebPage", "@id": pageId, url, name: title, description, inLanguage: "vi-VN",
    isPartOf: ref(siteId), publisher: ref(orgId), primaryImageOfPage: ref(url + "#primaryimage") };
  graph.push(page, { "@type": "ImageObject", "@id": url + "#primaryimage", url: absolute(image), contentUrl: absolute(image) });
  const breadcrumb = supplied.find(item => item["@type"] === "BreadcrumbList");
  if (breadcrumb) {
    const { "@context": _context, ...values } = breadcrumb;
    graph.push({ ...values, "@id": url + "#breadcrumb" });
    page.breadcrumb = ref(url + "#breadcrumb");
  }
  const addList = (entries: { name: string; path: string }[]) => {
    page["@type"] = "CollectionPage";
    page.mainEntity = ref(url + "#itemlist");
    graph.push({ "@type": "ItemList", "@id": url + "#itemlist", numberOfItems: entries.length,
      itemListElement: entries.map((entry,index) => ({ "@type": "ListItem", position: index+1, name: entry.name, url: absolute(entry.path) })) });
  };
  if (path === "/") page.about = ref(orgId);
  if (path === "/gioi-thieu/") { page["@type"] = "AboutPage"; page.mainEntity = ref(orgId); }
  if (path === "/lien-he/") { page["@type"] = "ContactPage"; page.mainEntity = ref(orgId); }
  if (path === "/vat-lieu/") addList(materials.map(material => ({name:material.name,path:materialHref(material)})));
  const material = materials.find(material => materialHref(material) === path);
  if (material) {
    addList(catalogue.filter(sample => sample.category === material.slug).map(sample => ({ name:`${sample.title} ${sample.code}`, path:sampleHref(sample) })));
    page.about = { "@type": "Thing", name: material.name };
  }
  const sample = catalogue.find(sample => sampleHref(sample) === path);
  if (sample) {
    const productId = url + "#product";
    page.mainEntity = ref(productId);
    graph.push({ "@type": "Product", "@id": productId, name: productHeading(sample), url,
      description, sku: sample.code, brand: { "@type": "Brand", name: sample.brand },
      category: materials.find(material => material.slug === sample.category)!.name,
      ...(sample.pricePerMetre ? { offers: { "@type": "Offer", url, price: sample.pricePerMetre, priceCurrency: "VND", seller: ref(orgId),
        priceSpecification: { "@type": "UnitPriceSpecification", price: sample.pricePerMetre, priceCurrency: "VND",
          referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MTR", unitText: "mét dài" } } } } : {}),
      color: sample.color.name, image: [absolute(sample.image), ...(sample.application ? [absolute(sample.application)] : [])],
      additionalProperty: [{ "@type": "PropertyValue", name: "Quy cách cuộn", value: sample.rollSpecification },
        { "@type": "PropertyValue", name: "Dòng bề mặt", value: sample.group },
        { "@type": "PropertyValue", name: "Tông màu", value: `${sample.color.name} (tham khảo)` }], mainEntityOfPage: ref(pageId) });
  }
  const service = services.find(service => serviceHref(service) === path);
  if (service) {
    page.mainEntity = ref(url + "#service");
    graph.push({ "@type": "Service", "@id": url + "#service", url, name:service.heading, serviceType:service.heading,
      description:service.description, image:absolute(service.image), provider:ref(orgId), areaServed:{"@type":"Country",name:"Việt Nam"}, mainEntityOfPage:ref(pageId) });
    if (service.slug === "dan-film-noi-that") {
      const children = services.filter(item => item.slug !== service.slug);
      graph.push({ "@type":"ItemList", "@id":url+"#services", numberOfItems:children.length,
        itemListElement:children.map((item,index)=>({"@type":"ListItem",position:index+1,name:item.name,url:absolute(serviceHref(item))})) });
      page.mentions = ref(url + "#services");
    }
  }
  if (path === "/blog/") {
    addList(posts.map(post=>({name:post.title,path:postHref(post)})));
    page.about = ref(url + "#blog");
    graph.push({ "@type":"Blog", "@id":url+"#blog", url, name:"Kiến thức film nội thất", inLanguage:"vi-VN", publisher:ref(orgId),
      blogPost:posts.map(post=>ref(absolute(postHref(post))+"#article")) });
  }
  const post = posts.find(post => postHref(post) === path);
  if (post) {
    page.mainEntity = ref(url + "#article");
    graph.push({ "@type":"BlogPosting", "@id":url+"#article", url, headline:post.title, description:post.description,
      datePublished:post.date, image:[absolute(post.image), ...post.sections.flatMap(section => section.image ? [absolute(section.image.src)] : [])], inLanguage:"vi-VN", author:ref(orgId), publisher:ref(orgId),
      isPartOf:ref(absolute("/blog/#blog")), mainEntityOfPage:ref(pageId),
      about:post.materials.map(slug=>({"@type":"Thing",name:materials.find(item=>item.slug===slug)?.name || slug})) });
  }
  if (path === "/cong-trinh/") addList(projectStories.slice(0,6).map(story=>({name:story.title,path:storyHref(story)})));
  const story = projectStories.find(story => storyHref(story) === path);
  if (story) {
    page["@type"] = "ImageGallery";
    page.genre = storyLabel(story);
    const images = story.images.map((photo,index) => ({ "@type":"ImageObject", "@id":url+`#gallery-image-${index+1}`,
      url:absolute(photo.src), contentUrl:absolute(photo.src), caption:photo.alt, description:story.kind === "completed" ? photo.alt : `${storyLabel(story)}. ${photo.alt}`, isPartOf:ref(pageId) }));
    page.hasPart = images.map(image=>ref(image["@id"])); graph.push(...images);
    if (story.sampleSlugs.length) page.about = story.sampleSlugs.map(slug=>ref(absolute(`/vat-lieu/mau/${slug}/`)+"#product"));
  }
  if (faqs.length) {
    const faqId = url+"#faq";
    graph.push({ "@type":"FAQPage", "@id":faqId, inLanguage:"vi-VN", isPartOf:ref(pageId),
      mainEntity:faqs.map(faq=>({"@type":"Question",name:faq.question,acceptedAnswer:{"@type":"Answer",text:faq.answer}})) });
    page.hasPart = [...(Array.isArray(page.hasPart) ? page.hasPart : []), ref(faqId)];
  }
  return { "@context":"https://schema.org", "@graph":graph };
}
