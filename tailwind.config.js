/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
        pulse: 'pulse 0.3s cubic-bezier(0.4, 0, 0.6, 1)'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(-5px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        }
      },
      colors: {
        blue: {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#bae0ff',
          300: '#7cc8fc',
          400: '#36aff7',
          500: '#0c96e6',
          600: '#0066CC', // iMazing primary blue
          700: '#0055a3',
          800: '#004785',
          900: '#03386e'
        }
      },
      boxShadow: {
        'inner-sm': 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)'
      }
    }
  },
  plugins: []
};
