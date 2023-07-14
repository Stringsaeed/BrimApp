import { X } from "phosphor-react-native";
import React, { ComponentProps } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Animated, { FadeInUp, useAnimatedStyle } from "react-native-reanimated";

import { useLayout } from "hooks";
import { globalStyles, ColorProp, getColorValue } from "themes";

interface BannerProps extends ColorProp<"color"> {
  children: NonNullable<React.ReactNode>;
  shownValue?: Animated.SharedValue<0 | 1>;
  existing?: ComponentProps<typeof Animated.View>["exiting"];
  onClose?: () => void;
}

export default function Banner({
  existing = FadeInUp,
  color = "warning",
  shownValue,
  children,
  onClose,
}: BannerProps) {
  const bg = getColorValue(color);
  const { onLayout, height } = useLayout();
  const stylez = useAnimatedStyle(() => {
    if (!shownValue) return {};
    const isExpanded = shownValue.value === 1;
    const translateY = isExpanded ? 0 : -height;

    return {
      height: height ? shownValue.value * height : undefined,
      transform: [{ translateY }],
      opacity: shownValue.value,
    };
  }, []);

  return (
    <Animated.View
      onLayout={onLayout}
      exiting={existing}
      style={[styles.emailContainer, { backgroundColor: bg }, stylez]}
    >
      {children}
      <TouchableOpacity
        onPress={onClose}
        accessibilityRole="button"
        style={styles.xIcon}
      >
        <X size={20} />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  emailContainer: {
    ...globalStyles.centered,
    borderRadius: 8,
    padding: 16,
  },
  xIcon: {
    position: "absolute",
    right: 8,
    top: 8,
  },
});
