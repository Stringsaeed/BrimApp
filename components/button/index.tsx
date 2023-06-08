import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import { theme } from "themes";

import styles from "./styles";

interface ButtonProps extends Omit<TouchableOpacityProps, "children"> {
  label: string;
  labelStyle?: StyleProp<TextStyle>;
  variant?: keyof typeof theme.buttons;
}

export default function Button({
  label,
  style: overrideStyle,
  labelStyle: overrideLabelStyle,
  variant = "primary",
  ...props
}: ButtonProps) {
  const { textColor, backgroundColor } = theme.buttons[variant];

  const style = StyleSheet.flatten([
    styles.button,
    { backgroundColor },
    overrideStyle,
  ]);

  const labelStyle = StyleSheet.flatten([
    styles.label,
    { color: textColor },
    overrideLabelStyle,
  ]);

  return (
    <TouchableOpacity {...props} style={style}>
      <LinearGradient
        colors={[backgroundColor, "transparent"]}
        style={[styles.lg, StyleSheet.absoluteFill]}
      />
      <Text style={labelStyle}>{label}</Text>
    </TouchableOpacity>
  );
}
