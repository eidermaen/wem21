module.exports = {
  theme: {
    extend: {
      letterSpacing: {
        widest: '.4em',
      },

      borderWidth: {
        '3': '3px',
      },
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
        flyleft: {
          '0%': {
            transform: 'translateX(-2rem)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: 1,
          },
        },
      },

      animation: {
        'flyin': 'flyin .5s ease-out',
        'flyindelay': 'flyin .5s .5s ease-out forwards',
        'flyleft': 'flyleft .5s ease-out forwards',
        'flyleftdelay': 'flyleft .5s .5s ease-out forwards',
      }
    }
  }
}
