import { X } from "phosphor-react-native";
import React, { ComponentProps } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  FadeInUp,
  Layout,
  useAnimatedStyle,
} from "react-native-reanimated";

import Spacing from "components/spacing";
import { Subheadline } from "components/typography";
import { useLayout } from "hooks";
import { globalStyles, ColorProp, getColorValue } from "themes";

interface BannerProps extends ColorProp<"color"> {
  children: NonNullable<React.ReactNode>;
  shownValue?: Animated.SharedValue<0 | 1>;
  existing?: ComponentProps<typeof Animated.View>["exiting"];
  onClose?: () => void;
  label?: string;
}

function checkIfNumber(value: unknown): value is number {
  "worklet";
  return typeof value === "number";
}

export default function Banner({
  existing = FadeInUp,
  color = "warning",
  shownValue,
  children,
  onClose,
  label,
}: BannerProps) {
  const bg = getColorValue(color);
  const { onLayout, height } = useLayout();

  const stylez = useAnimatedStyle(() => {
    if (!shownValue) return {};
    if (height === undefined) return {};
    const isExpanded = shownValue.value === 1;
    const translateY = isExpanded ? 0 : -height;

    return {
      height: checkIfNumber(height) ? shownValue.value * height : undefined,
      transform: [{ translateY }],
      opacity: shownValue.value,
    };
  }, []);

  return (
    <Animated.View
      onLayout={onLayout}
      exiting={existing}
      layout={Layout.springify()}
      style={[styles.emailContainer, { backgroundColor: bg }, stylez]}
    >
      {!!label && (
        <>
          <Subheadline>{label}</Subheadline>
          <Spacing size={2} />
        </>
      )}
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
