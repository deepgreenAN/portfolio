const config = {
  // mode: "jit",
  purge: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      zIndex: {
        '-10':'-10'
      }
    }
  },
  
  plugins: [],
};

module.exports = config;
