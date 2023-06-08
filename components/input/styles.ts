import { StyleSheet } from "react-native";

import { theme } from "themes";

export default StyleSheet.create({
  input: {
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#eaeaea",
    borderRadius: 16,
    paddingVertical: 16,
    paddingTop: 16,
    paddingBottom: 16,
    width: "100%",
    textAlign: "center",
    ...theme.textVariants.Body,
  },
});
