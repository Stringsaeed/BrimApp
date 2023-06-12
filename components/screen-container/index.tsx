import React, { useMemo } from "react";
import {
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  View,
  ViewProps,
} from "react-native";

import AnimatedKeyboardView from "components/animated-keyboard-view";
import { theme } from "themes";
import { useHeaderHeight } from "@react-navigation/elements";

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
};

function FixedScreen({
  withoutBeautifulPadding,
  style: overrideStyle,
  handleHeaderHeight,
  handleKeyboard,
  centered,
  ...restProps
}: Props<"fixed">) {
  const Wrapper = handleKeyboard ? AnimatedKeyboardView : View;

  const headerHeight = useHeaderHeight();
  const paddingTop = handleHeaderHeight ? headerHeight : 0;

  const containerStyle = useMemo(
    () =>
      StyleSheet.flatten([
        styles.flex,
        styles.background,
        !withoutBeautifulPadding && styles.beautifulPadding,
        centered && styles.centered,
        { paddingTop },
        overrideStyle,
      ]),
    [centered, overrideStyle, paddingTop, withoutBeautifulPadding]
  );

  return <Wrapper {...restProps} style={containerStyle} />;
}

function ScrollScreen({
  contentContainerStyle: overrideContentStyle,
  withoutBeautifulPadding,
  style: overrideStyle,
  handleHeaderHeight,
  handleKeyboard,
  centered,
  ...restProps
}: Props<"scroll">) {
  const Wrapper = handleKeyboard ? AnimatedKeyboardView : View;
  const containerStyle = useMemo(
    () => StyleSheet.flatten([styles.flex, styles.background, overrideStyle]),
    [overrideStyle]
  );

  const headerHeight = useHeaderHeight();

  const contentContainerStyle = useMemo(
    () =>
      StyleSheet.flatten([
        !withoutBeautifulPadding && styles.beautifulPadding,
        centered && styles.centered,
        centered && styles.grow,
        { paddingTop: handleHeaderHeight ? headerHeight : 0 },
        overrideContentStyle,
      ]),
    [
      centered,
      handleHeaderHeight,
      headerHeight,
      overrideContentStyle,
      withoutBeautifulPadding,
    ]
  );

  return (
    <Wrapper style={styles.flex}>
      <ScrollView
        {...restProps}
        style={containerStyle}
        contentContainerStyle={contentContainerStyle}
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
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    backgroundColor: theme.colors.background,
  },
  beautifulPadding: {
    paddingHorizontal: 16,
  },
  grow: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
});
