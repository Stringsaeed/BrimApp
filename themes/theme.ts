const palette = {
  lightBlue: "#b3cbce",
  mediumBlue: "#468499",
  darkBlue: "#005b74",
  bondiBlue: "#0093A7",
};

const theme = {
  colors: {
    primary: palette.bondiBlue,
    secondary: palette.lightBlue,
    success: "#28a745",
    danger: "#dc3545",
    warning: "#ffc107",
    info: "#17a2b8",
    light: "#f8f9fa",
    dark: "#343a40",
    background: "#ffffff",
  },
  buttons: {
    primary: {
      backgroundColor: palette.bondiBlue,
      textColor: "#000000",
      borderColor: palette.bondiBlue,
    },
    secondary: {
      backgroundColor: palette.lightBlue,
      textColor: "#ffffff",
      borderColor: palette.lightBlue,
    },
    success: {
      backgroundColor: "#28a745",
      textColor: "#ffffff",
      borderColor: "#28a745",
    },
    danger: {
      backgroundColor: "#dc3545",
      textColor: "#ffffff",
      borderColor: "#dc3545",
    },
    warning: {
      backgroundColor: "#ffc107",
      textColor: "#ffffff",
      borderColor: "#ffc107",
    },
    info: {
      backgroundColor: "#17a2b8",
      textColor: "#ffffff",
      borderColor: "#17a2b8",
    },
  },
  textVariants: {
    heading: {
      fontFamily: "Lato-Bold",
      fontSize: 24,
      color: "#000000",
    },
    body: {
      fontFamily: "Lato",
      fontSize: 16,
      color: "#000000",
    },
    caption: {
      fontFamily: "Lato",
      fontSize: 12,
      color: "#6c757d",
    },
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
  shadowVariants: {
    small: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    large: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.1,
      shadowRadius: 16,
      elevation: 8,
    },
  },
};

export default theme;
