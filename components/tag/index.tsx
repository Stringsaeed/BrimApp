import React from "react";
import { TouchableOpacity } from "react-native";

import { Body } from "components/typography";
import { ColorProp, getColorValue } from "themes";

interface TagProps extends ColorProp {
  onPress?: () => void;
  children: string;
}

export default function Tag({
  color = "primary",
  children,
  onPress,
}: TagProps) {
  const style = {
    backgroundColor: getColorValue(color),
    paddingHorizontal: 16,
    borderRadius: 20,
    padding: 8,
  };
  return (
    <TouchableOpacity
      style={style}
      accessibilityRole="button"
      onPress={onPress}
    >
      <Body color="white">{children}</Body>
    </TouchableOpacity>
  );
}
