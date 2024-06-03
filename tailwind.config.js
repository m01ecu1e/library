module.exports = {
    theme: {
      extend: {
        colors: {
          'accessible-bg': '#000',
          'accessible-text': '#fff',
        },
        fontSize: {
          'accessible-lg': '1.5rem',
        },
      },
    },
    variants: {
      extend: {
        backgroundColor: ['accessible'],
        textColor: ['accessible'],
        fontSize: ['accessible'],
      },
    },
    plugins: [
      function ({ addVariant, e }) {
        addVariant('accessible', ({ modifySelectors, separator }) => {
          modifySelectors(({ className }) => {
            return `.${e(`accessible${separator}${className}`)}`;
          });
        });
      },
    ],
  };