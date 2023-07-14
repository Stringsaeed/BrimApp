import { StyleSheet } from "react-native";

import theme from "./theme";

const globalStyles = StyleSheet.create({
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  baseScreen: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  background: {
    backgroundColor: theme.colors.background,
  },
  keyboardContainer: {
    gap: 24,
    flex: 1,
  },
  row: {
    flexDirection: "row",
  },
  container: {
    flex: 1,
  },
  grow: {
    flexGrow: 1,
  },
  gap: {
    gap: 24,
  },
});

export default globalStyles;

export function combineStyles<T extends keyof typeof globalStyles>(
  ...styles: T[]
) {
  return StyleSheet.flatten(styles.map((style) => globalStyles[style]));
}
