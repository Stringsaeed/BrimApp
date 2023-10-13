import { MotiPressable } from "moti/interactions";
import React, { useMemo } from "react";
import { StyleProp, ViewStyle } from "react-native";

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  activeScale?: number;
  onLongPress?: () => void;
}

export default function PressableScale({
  activeScale = 0.94,
  disabled = false,
  children,
  ...props
}: Props) {
  return (
    <MotiPressable
      animate={useMemo(
        () =>
          ({ pressed }) => {
            "worklet";
            if (disabled) {
              return {};
            }
            return {
              scale: pressed ? activeScale : 1,
            };
          },
        [disabled, activeScale]
      )}
      accessibilityRole="button"
      disabled={disabled}
      transition={{ type: "spring" }}
      {...props}
    >
      {children}
    </MotiPressable>
  );
}
