import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('..', import.meta.url));
const read = name => JSON.parse(readFileSync(resolve(root, name), 'utf8'));
const kitchen = read('src/data/kitchenPosts.json').posts;
const guides = read('src/data/guidePosts.json').posts;
const services = read('src/data/services.json').services;
const materials = read('src/data/materials.json').materials;
const serviceSlugs = ['dan-film-noi-that','dan-film-tu-bep','dan-film-ban','dan-film-tuong','dan-film-tran','dan-film-thang-may'];
const materialSlugs = ['van-go','don-sac','van-vai','be-tong','kim-loai','da-cam-thach','trang-guong'];
assert.deepEqual(services.map(item => item.slug).sort(), [...serviceSlugs].sort(), 'Keep the six existing service routes');
assert.deepEqual(materials.map(item => item.slug).sort(), [...materialSlugs].sort(), 'Keep the seven existing material routes');
const allPosts = [...kitchen, ...guides];
assert.equal(new Set(allPosts.map(post => post.slug)).size, allPosts.length, 'Article slugs must be unique across both collections');
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const image = src => {
  assert.equal(typeof src, 'string', 'Image path must be a string');
  assert.ok(src.startsWith('/images/') && !src.includes('..'), `Use an uploaded image path: ${src}`);
  assert.ok(existsSync(resolve(root, 'public', src.slice(1))), `Image file missing: ${src}`);
};
for (const post of allPosts) {
  assert.match(post.slug, slugPattern); assert.ok(post.title?.trim() && post.description?.trim() && post.intro?.trim(), `${post.slug}: title, description and intro are required`);
  assert.match(post.date, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(new Date(`${post.date}T00:00:00Z`).toISOString().slice(0,10), post.date);
  image(post.image);
  assert.ok(Array.isArray(post.sections) && post.sections.length, `${post.slug}: add at least one section`);
  assert.equal(new Set(post.sections.map(section => section.id)).size, post.sections.length, `${post.slug}: duplicate section anchor`);
  for (const section of post.sections) {
    assert.match(section.id, slugPattern); assert.ok(section.title?.trim());
    assert.ok(Array.isArray(section.paragraphs), `${post.slug}: section paragraphs must be a list`);
    if (section.image) {
      image(section.image.src); assert.ok(section.image.alt?.trim() && section.image.caption?.trim(), `${post.slug}: inline image needs ALT and caption`);
      assert.ok(section.image.width > 0 && section.image.height > 0, `${post.slug}: invalid image dimensions`);
    }
  }
  assert.ok(Array.isArray(post.materials) && post.materials.every(slug => materialSlugs.includes(slug)), `${post.slug}: unknown material`);
  assert.ok(Array.isArray(post.services) && post.services.every(slug => serviceSlugs.includes(slug)), `${post.slug}: unknown service`);
}
for (const service of services) {
  image(service.image);
  for (const name of ['sections','preparation','materials','faqs']) assert.ok(Array.isArray(service[name]), `${service.slug}: ${name} must be a list`);
}
// Every configured file must have the object structure expected by Decap's file collections.
const config = read('public/admin/config.yml');
for (const collection of config.collections) for (const file of collection.files || []) {
  const data = read(file.file);
  for (const field of file.fields) assert.ok(Object.hasOwn(data, field.name), `${file.file}: missing root field ${field.name}`);
}
console.log(`PASS CMS content: ${allPosts.length} posts, ${services.length} services, ${materials.length} material groups; valid routes, image files and editor data roots.`);

const products = [];
for (const folder of ['infeel', 'corance', 'toda']) {
  const directory = `src/content/products/${folder}`;
  for (const file of readdirSync(resolve(root, directory)).filter(file => file.endsWith('.json'))) {
    const product = read(`${directory}/${file}`);
    assert.equal(file, `${product.slug}.json`, `Product filename must match slug: ${file}`);
    assert.match(product.slug, slugPattern);
    assert.equal(product.brand.toLowerCase(), folder, `${file}: incorrect brand folder`);
    assert.ok(materialSlugs.includes(product.category), `${file}: invalid material category`);
    for (const key of ['code','name','group','collection','rollSpecification']) assert.ok(product[key]?.trim(), `${file}: missing ${key}`);
    image(product.image);
    assert.ok(!product.hiddenImages || (Array.isArray(product.hiddenImages) && product.hiddenImages.every(src => typeof src === 'string' && src.startsWith('/images/') && !src.includes('..'))), `${file}: invalid hidden images`);
    assert.ok(!(product.hiddenImages || []).includes(product.image), `${file}: primary image cannot be hidden`);
    if (product.application) image(product.application);
    assert.ok(!product.gallery || Array.isArray(product.gallery), `${file}: gallery must be a list`);
    for (const photo of product.gallery || []) {
      image(photo.src); assert.ok(photo.alt?.trim(), `${file}: additional image needs ALT`);
      for (const dimension of ['width','height']) if (photo[dimension] != null) assert.ok(Number.isInteger(photo[dimension]) && photo[dimension] > 0, `${file}: invalid image ${dimension}`);
    }
    assert.ok(Number.isInteger(product.imageWidth) && product.imageWidth > 0 && Number.isInteger(product.imageHeight) && product.imageHeight > 0, `${file}: invalid dimensions`);
    assert.ok(Number.isInteger(product.sourcePage) && product.sourcePage > 0 && Number.isInteger(product.order) && product.order >= 0, `${file}: invalid catalogue page or sort order`);
    assert.match(product.color.value, /^#[0-9a-fA-F]{6}$/);
    assert.ok(product.color.name?.trim() && product.color.family?.trim(), `${file}: missing color labels`);
    assert.ok(product.pdf?.startsWith('/catalogues/') && !product.pdf.includes('..') && existsSync(resolve(root,'public',product.pdf.slice(1))), `${file}: missing catalogue PDF`);
    if (product.brand === 'INFEEL') assert.ok(Number.isInteger(product.pricePerMetre) && product.pricePerMetre > 0, `${file}: INFEEL requires a positive VND price per metre`);
    else assert.ok(!product.pricePerMetre, `${file}: Corance and TODA currently use contact pricing`);
    products.push(product);
  }
}
assert.equal(new Set(products.map(product => product.slug)).size, products.length, 'Product slugs must be unique across brands');
assert.equal(new Set(products.map(product => `${product.brand}:${product.code.toUpperCase().replace(/\s/g,'')}`)).size, products.length, 'Product codes must be unique per brand');
assert.ok(products.some(product => product.brand === 'INFEEL'), 'Homepage needs at least one INFEEL price');
const home = read('src/data/homeContent.json');
for (const pic of [home.hero.image, home.benefits.image]) {
  image(pic.src); assert.ok(pic.alt?.trim() && pic.width > 0 && pic.height > 0, 'Homepage images need ALT and dimensions');
}
for (const value of [home.brandName,home.seoTitle,home.seoDescription,home.hero.titleLead,home.hero.titleAccent,home.hero.description]) assert.ok(typeof value === 'string' && value.trim(), 'Homepage metadata and hero text are required');
for (const href of [home.hero.primaryHref,home.hero.secondaryHref]) assert.match(href,/^(?:\/(?!\/)|#[a-zA-Z0-9_-]+|https:\/\/)[^\s]*$/, 'Homepage CTA must use an internal URL, anchor or HTTPS URL');
assert.ok(home.collections.items.length > 0 && home.collections.items.every(item => materialSlugs.includes(item.slug)), 'Homepage featured material is unknown');
for (const item of home.benefits.items) assert.ok(['check','swatches','phone'].includes(item.icon), 'Unknown homepage benefit icon');
assert.ok(Array.isArray(home.steps.items) && Array.isArray(home.faqs.items), 'Homepage steps and FAQs must be lists');
const spaces = read('src/data/spacesContent.json').spaces;
assert.ok(spaces.length >= 3, 'Homepage needs at least three reference spaces');
for (const space of spaces) {
  image(space.image);
  assert.ok(serviceSlugs.some(slug => space.service === `/dich-vu/${slug}/`), 'Space points to an unknown service');
  assert.ok(materialSlugs.some(slug => space.material === `/vat-lieu/${slug}/`), 'Space points to an unknown material');
}
console.log(`PASS homepage and products: ${products.length} products, valid prices, images, material links and homepage content.`);
