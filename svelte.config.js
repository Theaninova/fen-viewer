import adapter from "@sveltejs/adapter-static"
import preprocess from "svelte-preprocess"

/** @type {import("@sveltejs/kit").Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),
    inlineStyleThreshold: 16_384,
    paths: {
      base: process.env.BASE_HREF || "",
    },
    prerender: {
      default: true,
    },
  },
}

export default config