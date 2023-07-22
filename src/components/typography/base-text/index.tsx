import React from "react";
import { Text, TextProps } from "react-native";

import { ColorProp, getColorValue } from "themes";

export type BaseTextProps = TextProps & ColorProp;

export default function BaseText({
  style: overrideStyle,
  color = "text",
  ...restProps
}: BaseTextProps) {
  const colorValue = getColorValue(color);
  const style = [{ color: colorValue }, overrideStyle];

  return <Text {...restProps} style={style} />;
}