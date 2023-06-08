import { colors } from "./colors";
import { palette } from "./palette";
import { fonts, textVariants } from "./typography";

const theme = {
  colors,
  buttons: {
    primary: {
      backgroundColor: palette.bondiBlue,
      textColor: palette.white,
      borderColor: palette.bondiBlue,
    },
    secondary: {
      backgroundColor: palette.lightBlue,
      textColor: palette.white,
      borderColor: palette.lightBlue,
    },
    success: {
      backgroundColor: palette.eucalyptus,
      textColor: palette.white,
      borderColor: palette.eucalyptus,
    },
    danger: {
      backgroundColor: palette.ceriseRed,
      textColor: palette.white,
      borderColor: palette.ceriseRed,
    },
    warning: {
      backgroundColor: palette.amber,
      textColor: palette.white,
      borderColor: palette.amber,
    },
    info: {
      backgroundColor: palette.easternBlue,
      textColor: palette.white,
      borderColor: palette.easternBlue,
    },
  },
  fonts,
  textVariants,
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
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    large: {
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.1,
      shadowRadius: 16,
      elevation: 8,
    },
  },
};

export default theme;
