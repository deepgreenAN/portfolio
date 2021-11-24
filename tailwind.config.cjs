const config = {
  // mode: "jit",
  purge: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      zIndex: {
        '-10':'-10',
      },
      width: {
        '1/10':'10%',
        '2/10':'20%',
        '3/10':'30%',
        '4/10':'40%',
        '5/10':'50%',
        '6/10':'60%',
        '7/10':'70%',
        '8/10':'80%',
        '9/10':'90%'
      },
      inset: {
        '0.5':'0.125rem'
      },
      colors: {
        primary: "#374151",
        bgcolor: "#d1d5db",
        border: "#374151",
        darkprimary: "#d1d5db",
        darkbgcolor: "#374151",
        darkborder: "#d1d5db"
      }
    }
  },
  variants: {
    borderWidth: ['last'],
  },
  
  plugins: [
  ],
};

module.exports = config;
