import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-static";
import path from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    //target: "#svelte",
    adapter: adapter(),
    vite: {
      resolve: {
        alias: {
          // these are the aliases and paths to them
          '@static': path.resolve('./static'),
          '@contents': path.resolve('./contents')
        }
      }
    }
  },
};

export default config;
