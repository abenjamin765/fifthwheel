import { defineConfig } from "astro/config";

export default defineConfig({
  // GitHub Pages project site (custom domain on this account).
  site: "https://www.aaronbenjamin.design",
  base: "/fifthwheel/",
  output: "static",
  // Directory routes so GitHub Pages serves /landing/ from landing/index.html.
  trailingSlash: "always",
  build: {
    format: "directory",
  },
});
