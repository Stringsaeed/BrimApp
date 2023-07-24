import { StyleSheet } from "react-native";

export default StyleSheet.create({
  button: {
    justifyContent: "center",
    paddingHorizontal: 16,
    overflow: "hidden",
    borderRadius: 12,
    width: "100%",
    height: 56,
  },
  label: {
    textTransform: "capitalize",
  },
  lg: { borderRadius: 12, height: 56 },
  disabled: {
    opacity: 0.5,
  },
});
