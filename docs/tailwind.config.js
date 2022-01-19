module.exports = {
  theme: {
    extend: {
      keyframes: {
        flyin: {
          '0%': {
            transform: 'translateY(2rem)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },
      },

      animation: {
        'flyin': 'flyin .5s ease-out',
        'flyindelay': 'flyin .5s .5s ease-out forwards'
      }
    }
  }
}
