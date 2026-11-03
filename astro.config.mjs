import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://filmnoithat.pages.dev",
  trailingSlash: "always",
  integrations: [tailwind()],
});
