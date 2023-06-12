import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";

interface SpacingProps extends ViewProps {
  size?: number;
  horizontal?: boolean;
}

const factor = 4.0;

export default function Spacing({
  style: overrideStyle,
  horizontal = false,
  size = 4,
  ...props
}: SpacingProps) {
  const style = StyleSheet.flatten([
    horizontal ? { width: size * factor } : { height: size * factor },
    overrideStyle,
  ]);

  return <View {...props} style={style} />;
}
