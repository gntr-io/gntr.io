// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://gntr.io",
  // Static output works with Cloudflare Pages without an adapter
  output: "static",
});
