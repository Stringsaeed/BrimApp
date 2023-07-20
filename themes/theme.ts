import { DefaultTheme } from "@react-navigation/native";

import { colors } from "./colors";
import { fonts, textVariants } from "./typography";

const theme = {
  buttons: {
    secondary: {
      backgroundColor: colors.secondary,
      borderColor: colors.secondary,
      textColor: colors.onSecondary,
    },
    warning: {
      backgroundColor: colors.warning,
      borderColor: colors.warning,
      textColor: colors.onWarning,
    },
    primary: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
      textColor: colors.onPrimary,
    },
    success: {
      backgroundColor: colors.success,
      borderColor: colors.success,
      textColor: colors.onSuccess,
    },
    danger: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
      textColor: colors.onDanger,
    },
    info: {
      backgroundColor: colors.info,
      borderColor: colors.info,
      textColor: colors.onInfo,
    },
  },
  shadowVariants: {
    large: {
      shadowOffset: { height: 8, width: 0 },
      shadowColor: colors.shadow,
      shadowOpacity: 0.1,
      shadowRadius: 16,
      elevation: 8,
    },
    medium: {
      shadowOffset: { height: 4, width: 0 },
      shadowColor: colors.shadow,
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    small: {
      shadowOffset: { height: 2, width: 0 },
      shadowColor: colors.shadow,
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
  navigation: DefaultTheme,
  textVariants,
  colors,
  fonts,
};

export default theme;
