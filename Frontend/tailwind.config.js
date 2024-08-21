/** @type {import('tailwindcss').Config} */
export default {
  // by using tailwind+vite documentation
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    base: false, // Disable DaisyUI's base styles (preflight)
  },
  // daisyui: {
  //   themes: [
  //     {
  //       mytheme: {
  //         "primary": "#570DF8",
  //         "secondary": "#F000B8",
  //         "accent": "#37CDBE",
  //         "neutral": "#3D4451",
  //         "base-100": "#ffffff",
  //       },
  //     },
  //   ],
  // },
}

