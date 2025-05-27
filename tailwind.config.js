/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      textShadow: {
        'glow': '0 0 10px rgba(209, 250, 229, 0.5), 0 0 20px rgba(209, 250, 229, 0.3)',
        'glow-sm': '0 0 5px rgba(216, 180, 254, 0.5), 0 0 10px rgba(216, 180, 254, 0.3)'
      },
      boxShadow: {
        'glow-line': '0 0 10px rgba(216, 180, 254, 0.7), 0 0 20px rgba(216, 180, 254, 0.4)',
        'glow-line-strong': '0 0 15px rgba(216, 180, 254, 0.9), 0 0 30px rgba(216, 180, 254, 0.6)',
        'card-glow': '0 0 15px rgba(216, 180, 254, 0.5), 0 0 30px rgba(216, 180, 254, 0.3)',
        'card': '0 10px 30px -5px rgba(0, 0, 0, 0.3)'
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 10px rgba(216, 180, 254, 0.7), 0 0 20px rgba(216, 180, 254, 0.4)' },
          '50%': { opacity: 0.8, boxShadow: '0 0 15px rgba(216, 180, 254, 0.9), 0 0 30px rgba(216, 180, 254, 0.6)' }
        },
        'glitch-line': {
          '0%': { top: '0', opacity: 0 },
          '5%': { opacity: 0.5 },
          '10%': { top: '100%', opacity: 0 },
          '100%': { opacity: 0 }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0) translateX(0)', opacity: 0 },
          '5%': { opacity: 0.3 },
          '50%': { transform: 'translateY(-20px) translateX(10px)', opacity: 0.6 },
          '95%': { opacity: 0.3 },
          '100%': { transform: 'translateY(-40px) translateX(20px)', opacity: 0 }
        }
      },
      animation: {
        'pulse': 'pulse 2s infinite',
        'glitch-line': 'glitch-line 3s linear infinite',
        'float': 'float 5s ease-in-out infinite'
      },
      backgroundImage: {
        'glitch-gradient': 'linear-gradient(90deg, transparent, rgba(216, 180, 254, 0.8), transparent)'
      },
      transitionTimingFunction: {
        'card-flip': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-glow': {
          textShadow: '0 0 10px rgba(209, 250, 229, 0.5), 0 0 20px rgba(209, 250, 229, 0.3)'
        },
        '.text-shadow-glow-sm': {
          textShadow: '0 0 5px rgba(216, 180, 254, 0.5), 0 0 10px rgba(216, 180, 254, 0.3)'
        },
        '.transform-style-3d': {
          transformStyle: 'preserve-3d'
        },
        '.backface-visible': {
          backfaceVisibility: 'visible'
        },
        '.backface-hidden': {
          backfaceVisibility: 'hidden'
        },
        '.perspective': {
          perspective: '1000px'
        },
        '.perspective-1200': {
          perspective: '1200px'
        },
        '.rotate-y-180': {
          transform: 'rotateY(180deg)'
        },
        '.line-clamp-3': {
          display: '-webkit-box',
          '-webkit-line-clamp': '3',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden'
        },
        '.scrollbar-thin': {
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent'
        }
      }
      addUtilities(newUtilities)
    }
  ],
}