import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

import styles from "./styles";

function InputComponent(
  { style: overrideStyle, ...props }: TextInputProps,
  ref?: React.Ref<TextInput>
) {
  const style = StyleSheet.flatten([styles.input, overrideStyle]);

  return (
    <TextInput
      placeholderTextColor="#777777"
      textAlign="center"
      {...props}
      ref={ref}
      style={style}
    />
  );
}

const Input = React.forwardRef(InputComponent);

export default Input;
