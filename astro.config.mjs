import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  experimental: {
    assets: true
   },
   image: {
    service: "astro/assets/services/sharp",
  },
  integrations: [tailwind(), image()]
});