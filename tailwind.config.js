  /** @type {import('tailwindcss').Config} */
  const { fontFamily } = require('tailwindcss/defaultTheme')

  module.exports = {
    content: [
      // Or if using `src` directory:
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    // mode: 'jit',
    // purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        fontFamily: {
          mont: ['var(--font-mont)', ...fontFamily.sans],
        },
        colors: {
          dark: "#1b1b1b",
          light: "#f5f5f5",
          primary: "#B63E96", // 240,86,199
          primaryDark: "#58E6D9", // 80,230,217
        },
        animation: {
          'spin-slow': 'spin 8s linear infinite',
        },
        backgroundImage: {
          circularLight: 'repeating-radial-gradient(rgba(0, 0, 0, 0.4), 2px,#f5f5f5 5px,#f5f5f5 100px);',
          circularLightLg: 'repeating-radial-gradient(rgba(0, 0, 0, 0.4), 2px,#f5f5f5 5px,#f5f5f5 80px);',
          circularLightMd: 'repeating-radial-gradient(rgba(0, 0, 0, 0.4), 2px,#f5f5f5 5px,#f5f5f5 60px);',
          circularLightSm: 'repeating-radial-gradient(rgba(0, 0, 0, 0.4), 2px,#f5f5f5 5px,#f5f5f5 40px);'
        }
      },

      screens: {
        "2xl": { max: "1535px" },
        // => @media (max-width: 1535px) { ... }

        xl: { max: "1279px" },
        // => @media (max-width: 1279px) { ... }

        lg: { max: "1023px" },
        // => @media (max-width: 1023px) { ... }

        md: { max: "767px" },
        // => @media (max-width: 767px) { ... }

        sm: { max: "639px" },
        // => @media (max-width: 639px) { ... }

        xs: { max: "479px" },
        // => @media (max-width: 479px) { ... }
      },

    },
    plugins: [],
  }

