import React from "react";
import { Text, TextProps, TextStyle } from "react-native";

import { ColorProp, getColorValue } from "themes";

export type BaseTextProps = TextProps &
  ColorProp & {
    align?: TextStyle["textAlign"];
  };

export default function BaseText({
  style: overrideStyle,
  color = "text",
  align,
  ...restProps
}: BaseTextProps) {
  const colorValue = getColorValue(color);
  const style = [{ color: colorValue, textAlign: align }, overrideStyle];

  return <Text {...restProps} style={style} />;
}
