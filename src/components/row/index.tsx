import React from "react";
import { StyleSheet, View, ViewProps, ViewStyle } from "react-native";

interface RowProps extends ViewProps {
  gap?: number;
  center?: boolean;
  spaceBetween?: boolean;
}

export default function Row({
  style: overrideStyle,
  spaceBetween,
  center,
  gap,
  ...restProps
}: RowProps) {
  const style = StyleSheet.flatten<ViewStyle>([
    styles.container,
    center && styles.alignCenter,
    spaceBetween && styles.alignSpaceBetween,
    typeof gap === "number" && { gap },
    overrideStyle,
  ]);

  return <View {...restProps} style={style} />;
}

const styles = StyleSheet.create({
  alignSpaceBetween: {
    justifyContent: "space-between",
  },
  alignCenter: {
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
  },
});
