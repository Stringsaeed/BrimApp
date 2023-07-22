import { StyleSheet } from "react-native";

import { theme } from "themes";

export default StyleSheet.create({
  input: {
    backgroundColor: "#eaeaea",
    borderColor: "#eaeaea",
    paddingHorizontal: 16,
    textAlign: "center",
    paddingVertical: 16,
    paddingBottom: 16,
    borderRadius: 16,
    paddingTop: 16,
    borderWidth: 1,
    width: "100%",
    ...theme.textVariants.Body,
  },
});
