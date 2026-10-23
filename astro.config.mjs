import { defineConfig } from "astro/config";

export default defineConfig({
  // GitHub Pages project site: https://abenjamin765.github.io/fifthwheel/
  site: "https://abenjamin765.github.io",
  base: "/fifthwheel/",
  output: "static",
  // Directory routes so GitHub Pages serves /landing/ from landing/index.html.
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  redirects: {
    "/": "/landing/",
  },
});
