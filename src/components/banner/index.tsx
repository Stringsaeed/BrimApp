import { AnimatePresence, MotiView, useDynamicAnimation } from "moti";
import { X } from "phosphor-react-native";
import React from "react";
import { LayoutChangeEvent, TouchableOpacity } from "react-native";

import Spacing from "components/spacing";
import { Subheadline } from "components/typography";
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
  const animation = useDynamicAnimation(() => ({ minHeight: 100 }));

  const onLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    // @ts-expect-error
    animation.animateTo({
      ...animation.current,
      height: nativeEvent.layout.height,
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <MotiView
          onLayout={onLayout}
          style={[styles.container, { backgroundColor: bg }]}
          state={animation}
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
        </MotiView>
      )}
    </AnimatePresence>
  );
}
