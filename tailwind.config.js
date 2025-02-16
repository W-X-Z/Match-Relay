module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        'slide-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-20%)' }
        },
        'slide-to-board': {
          '0%': { 
            transform: 'translate(0, 0)',
            opacity: '1'
          },
          '100%': { 
            transform: 'translate(-50%, -100%)',
            opacity: '0'
          }
        }
      },
      animation: {
        'slide-left': 'slide-left 0.3s ease-in-out forwards',
        'slide-to-board': 'slide-to-board 0.3s ease-in-out forwards'
      }
    }
  },
  plugins: [],
} 