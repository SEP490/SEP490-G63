/** @type {import('tailwindcss').Config} */
import flowbite from 'flowbite-react/tailwind'
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', flowbite.content()],
  theme: {
    extend: {
      backgroundImage: {
        'login-img': "url('/src/assets/images/login.jpg')",
        'footer-texture': "url('/img/footer-texture.png')"
      }
    }
  },
  plugins: [flowbite.plugin()]
}
