import { colors } from "./colors";
import { palette } from "./palette";
import { fonts, textVariants } from "./typography";

const theme = {
  buttons: {
    success: {
      backgroundColor: palette.eucalyptus,
      borderColor: palette.eucalyptus,
      textColor: palette.white,
    },
    secondary: {
      backgroundColor: palette.lightBlue,
      borderColor: palette.lightBlue,
      textColor: palette.white,
    },
    info: {
      backgroundColor: palette.easternBlue,
      borderColor: palette.easternBlue,
      textColor: palette.white,
    },
    primary: {
      backgroundColor: palette.bondiBlue,
      borderColor: palette.bondiBlue,
      textColor: palette.white,
    },
    danger: {
      backgroundColor: palette.ceriseRed,
      borderColor: palette.ceriseRed,
      textColor: palette.white,
    },
    warning: {
      backgroundColor: palette.amber,
      borderColor: palette.amber,
      textColor: palette.white,
    },
  },
  shadowVariants: {
    large: {
      shadowOffset: { height: 8, width: 0 },
      shadowColor: palette.black,
      shadowOpacity: 0.1,
      shadowRadius: 16,
      elevation: 8,
    },
    medium: {
      shadowOffset: { height: 4, width: 0 },
      shadowColor: palette.black,
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    small: {
      shadowOffset: { height: 2, width: 0 },
      shadowColor: palette.black,
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
  },
  borderRadius: {
    large: 12,
    medium: 8,
    small: 4,
  },
  spacing: {
    medium: 16,
    large: 24,
    small: 8,
  },
  textVariants,
  colors,
  fonts,
};

export default theme;
