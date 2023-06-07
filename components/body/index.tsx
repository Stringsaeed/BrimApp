import React from "react";
import { Text } from "react-native";

import { theme } from "themes";

interface BodyProps {
  children: React.ReactNode;
}
export default function Body({ children }: BodyProps) {
  return <Text style={theme.textVariants.body}>{children}</Text>;
}
