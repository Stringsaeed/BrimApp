import React from "react";
import { StyleSheet, View } from "react-native";

import { theme } from "themes";

export default function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.info,
    alignSelf: "stretch",
  },
});
