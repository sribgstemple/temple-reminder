/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#D4AF37',
          600: '#B8860B',
          700: '#92690A',
          900: '#5C3A00',
        },
        cream: {
          50: '#FFFEF7',
          100: '#FDF8F0',
          200: '#FAF0E6',
          300: '#F5E8D0',
          400: '#EDD9B4',
        },
        maroon: {
          600: '#7B1C1C',
          700: '#6B1C1C',
          800: '#5A1515',
          900: '#400E0E',
        },
        temple: {
          blue: '#0A1628',
          navy: '#1A2B4A',
          silver: '#C0C0C0',
          steel: '#B0C4DE',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
        display: ['Cormorant Garamond', 'Playfair Display', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
