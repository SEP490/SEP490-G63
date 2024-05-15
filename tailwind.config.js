/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'login-img': "url('/src/assets/images/login.jpg')",
        'footer-texture': "url('/img/footer-texture.png')"
      },
      colors: {
        // primary: "#00c3c7",
        primary: '#0287a8',
        secondary: '#00c3c7',
        dark: '#ffcf22'
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem'
        }
      }
    }
  },
  plugins: []
}
