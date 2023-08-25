import React from "react";
import { ScrollViewProps, View, ViewProps } from "react-native";
import { ScrollView } from "tamagui";

import AnimatedKeyboardView from "components/animated-keyboard-view";
import { useScreenContainerContentStyle } from "hooks";

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

  return <Wrapper {...restProps} flex={1} style={contentStyle} />;
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

  const contentStyle = useScreenContainerContentStyle({
    overrideStyle: overrideContentStyle,
    withoutBeautifulPadding,
    handleHeaderHeight,
    handleSafeArea,
    centered,
  });

  return (
    <Wrapper flex={1}>
      <ScrollView
        {...restProps}
        style={overrideStyle}
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
