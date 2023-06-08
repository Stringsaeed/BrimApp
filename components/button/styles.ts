import { StyleSheet } from "react-native";

import { theme } from "themes";

export default StyleSheet.create({
  button: {
    borderRadius: 12,
    paddingHorizontal: 16,
    width: "100%",
    height: 56,
    justifyContent: "center",
    overflow: "hidden",
  },
  lg: { height: 56, borderRadius: 12 },
  label: {
    textAlign: "center",
    textTransform: "capitalize",
    ...theme.textVariants.Body,
    fontFamily: theme.fonts.bold,
  },
});
