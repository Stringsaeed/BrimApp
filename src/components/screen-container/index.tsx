import React, { useMemo } from "react";
import {
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  View,
  ViewProps,
} from "react-native";

import AnimatedKeyboardView from "components/animated-keyboard-view";
import { useScreenContainerContentStyle } from "hooks";
import { theme } from "themes";

type BaseProps<T> = T extends "scroll"
  ? ScrollViewProps
  : T extends "fixed"
  ? ViewProps
  : never;

type Props<T extends "scroll" | "fixed"> = BaseProps<T> & {
  type: T;
  centered?: boolean;
  withoutBeautifulPadding?: boolean;
  handleKeyboard?: boolean;
  handleHeaderHeight?: boolean;
  handleSafeArea?: false | "top" | "bottom" | ["top", "bottom"];
};

function FixedScreen({
  withoutBeautifulPadding,
  style: overrideStyle,
  handleHeaderHeight,
  handleSafeArea,
  handleKeyboard,
  centered,
  ...restProps
}: Props<"fixed">) {
  const Wrapper = handleKeyboard ? AnimatedKeyboardView : View;

  const contentStyle = useScreenContainerContentStyle({
    overrideStyle: overrideStyle,
    withoutBeautifulPadding,
    handleHeaderHeight,
    handleSafeArea,
    centered,
  });

  const containerStyle = useMemo(() => {
    return StyleSheet.flatten([styles.flex, styles.background, contentStyle]);
  }, [contentStyle]);

  return <Wrapper {...restProps} style={containerStyle} />;
}

function ScrollScreen({
  contentContainerStyle: overrideContentStyle,
  withoutBeautifulPadding,
  style: overrideStyle,
  handleHeaderHeight,
  handleKeyboard,
  handleSafeArea,
  centered,
  ...restProps
}: Props<"scroll">) {
  const Wrapper = handleKeyboard ? AnimatedKeyboardView : View;
  const containerStyle = useMemo(
    () => StyleSheet.flatten([styles.flex, styles.background, overrideStyle]),
    [overrideStyle]
  );

  const contentStyle = useScreenContainerContentStyle({
    overrideStyle: overrideContentStyle,
    withoutBeautifulPadding,
    handleHeaderHeight,
    handleSafeArea,
    centered,
  });

  return (
    <Wrapper style={styles.flex}>
      <ScrollView
        {...restProps}
        style={containerStyle}
        contentContainerStyle={contentStyle}
      />
    </Wrapper>
  );
}

export default function ScreenContainer<T extends "scroll" | "fixed">({
  type,
  ...restProps
}: Props<T>) {
  if (type === "fixed") {
    return <FixedScreen type={type} {...restProps} />;
  }

  if (type === "scroll") {
    return <ScrollScreen type={type} {...restProps} />;
  }

  return null;
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.background,
  },
  flex: {
    flex: 1,
  },
});
