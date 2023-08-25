import { X } from "phosphor-react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";
import { H4 } from "tamagui";

import Row from "components/row";
import Spacing from "components/spacing";
import { ColorProp, getColorValue } from "themes";

import styles from "./styles";

interface BannerProps extends ColorProp<"color"> {
  children: NonNullable<React.ReactNode>;
  isVisible?: boolean;
  onClose?: () => void;
  label?: string;
}

export default function Banner({
  color = "warning",
  isVisible,
  children,
  onClose,
  label,
}: BannerProps) {
  const bg = getColorValue(color);

  if (!isVisible) return <></>;

  return (
    <Animated.View
      exiting={FadeOutUp}
      entering={FadeInDown}
      style={[styles.container, { backgroundColor: bg }]}
    >
      <Row center spaceBetween>
        {!!label && (
          <>
            <H4>{label}</H4>
          </>
        )}
        <TouchableOpacity onPress={onClose} accessibilityRole="button">
          <X size={20} />
        </TouchableOpacity>
      </Row>
      <Spacing size={4} />
      {children}
    </Animated.View>
  );
}
