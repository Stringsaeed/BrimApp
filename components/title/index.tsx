import React from "react";
import { Text } from "react-native";

import { theme } from "themes";

interface TitleProps {
  children: React.ReactNode;
}

export default function Title({ children }: TitleProps) {
  return <Text style={theme.textVariants.heading}>{children}</Text>;
}
