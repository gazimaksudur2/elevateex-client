/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mulish: '"Mulish", sans-serif',
        roboto: '"Roboto Slab", serif',
      },
      backgroundImage: {
        'hero-img': "url('https://images.unsplash.com/photo-1508394522741-82ac9c15ba69?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=748&q=80')",
        'footer-texture': "url('/img/footer-texture.png')",
      }
    },
  },
  plugins: [require('daisyui')],
  
}

