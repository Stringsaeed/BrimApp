import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import styles from "./styles";

interface ButtonProps extends Omit<TouchableOpacityProps, "children"> {
  label: string;
  labelStyle?: StyleProp<TextStyle>;
}

export default function Button({
  label,
  style: overrideStyle,
  labelStyle: overrideLabelStyle,
  ...props
}: ButtonProps) {
  const style = StyleSheet.flatten([styles.button, overrideStyle]);

  const labelStyle = StyleSheet.flatten([styles.label, overrideLabelStyle]);

  return (
    <TouchableOpacity {...props} style={style}>
      <Text style={labelStyle}>{label}</Text>
    </TouchableOpacity>
  );
}
