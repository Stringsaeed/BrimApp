import { StyleSheet } from "react-native";

import { theme } from "themes";

export default StyleSheet.create({
  container: {
    shadowOffset: {
      height: 2,
      width: 2,
    },
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: theme.colors.info,
    borderColor: theme.colors.info,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderRadius: 8,
    elevation: 3,
    padding: 16,
  },
});
