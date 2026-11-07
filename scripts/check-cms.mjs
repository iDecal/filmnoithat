import { readFileSync, existsSync } from 'node:fs';
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
for (const collection of config.collections) for (const file of collection.files) {
  const data = read(file.file);
  for (const field of file.fields) assert.ok(Object.hasOwn(data, field.name), `${file.file}: missing root field ${field.name}`);
}
console.log(`PASS CMS content: ${allPosts.length} posts, ${services.length} services, ${materials.length} material groups; valid routes, image files and editor data roots.`);
