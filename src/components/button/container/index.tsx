import React from "react";

import PressableScale from "components/pressable-scale";

import { useButtonContext } from "../context";

interface ButtonContainerProps {
  children: React.ReactNode;
}

export function ButtonContainer({ children }: ButtonContainerProps) {
  const { onLongPress, buttonStyle, disabled, onPress, style } =
    useButtonContext();

  return (
    <PressableScale
      onPress={onPress}
      disabled={disabled}
      onLongPress={onLongPress}
      style={[buttonStyle.container, style]}
    >
      {children}
    </PressableScale>
  );
}
