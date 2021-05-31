module.exports = {
  theme: {
    container: {
      center: true,
    },
    colors: {
      gray: "#ebebeb",
      primary: "#3ab7a6",
      
    },
    fontFamily: {
      primary: ['Montserrat', 'sans-serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  variants: {
    extend: {
      borderColor: ['focus-visible'],
      opacity: ['disabled'],
    }
  }
}