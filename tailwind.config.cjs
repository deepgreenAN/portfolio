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
      // inset: {
      //   '-1': '-0.25rem',
      //   '-2': '-0.5rem',
      //   '-3': '-0.75rem',
      //   '-4': '-1.0rem'
      // }
    }
  },
  
  plugins: [],
};

module.exports = config;
