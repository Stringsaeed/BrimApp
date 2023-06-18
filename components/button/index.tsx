import { LinearGradient } from "expo-linear-gradient";
import React from "react";
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

// type Props = {
//   mode: "Light" | "Dark";
//   style: "Borderless" | "BezeledGray" | "Belezed" | "Filled";
//   size: "Small" | "Medium" | "Large";
//   iconOnly: boolean;
// };

export default function Button({
  labelStyle: overrideLabelStyle,
  style: overrideStyle,
  variant = "primary",
  disabled,
  label,
  ...props
}: ButtonProps) {
  const { backgroundColor, textColor } = theme.buttons[variant];

  const style = StyleSheet.flatten([
    styles.button,
    { backgroundColor },
    disabled && styles.disabled,
    overrideStyle,
  ]);

  const labelStyle = StyleSheet.flatten([
    styles.label,
    { color: textColor },
    overrideLabelStyle,
  ]);

  return (
    <TouchableOpacity {...props} disabled={disabled} style={style}>
      <LinearGradient
        colors={[backgroundColor, "transparent"]}
        style={[styles.lg, StyleSheet.absoluteFill]}
      />
      <Text style={labelStyle}>{label}</Text>
    </TouchableOpacity>
  );
}
