import { catalogue, sampleHref } from "../../data/catalogue";
import { navigation } from "../../data/site";
import { materials, materialHref } from "../../data/materials";
export const GET = () => new Response(JSON.stringify([
  ...catalogue.map(sample => ({ title: `${sample.brand} ${sample.code} — ${sample.title}`, detail: sample.group, href: sampleHref(sample), image: sample.image, type: "Sản phẩm" })),
  ...materials.map(item => ({ title: item.name, detail: item.description, href: materialHref(item), type: "Vật liệu" })),
  ...navigation.flatMap(item => [item, ...(item.children || [])]).filter((item, index, items) => items.findIndex(other => other.href === item.href) === index).map(item => ({ title: item.label, detail: "", href: item.href, type: "Trang" })),
]), { headers: { "Content-Type": "application/json; charset=utf-8" } });
