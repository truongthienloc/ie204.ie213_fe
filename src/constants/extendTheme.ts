const extendTheme = {
  transitionProperty: {
    width: 'width',
  },
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  borderRadius: {
    lg: '8px',
    md: '6px',
    sm: '4px',
  },
  animation: {
    fadeIn: 'fadeIn 0.5s ease-in-out',
  },
  keyframes: {
    fadeIn: {
      from: { opacity: '0' },
      to: { opacity: '1' },
    },
  },
  fontFamily: {
    roboto: 'Roboto',
  },
  boxShadow: {
    fadeBottom: 'rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset',
    borderLine: 'rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px',
    floating: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  },
};

export default extendTheme;
