import {
  RenderOptions,
  render as rtlRender,
} from "@testing-library/react-native";
import React, { PropsWithChildren } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TamaguiProvider } from "tamagui";

import config from "@/themes/theme";

export default function render<T>(
  component: Readonly<React.ReactElement<T>>,
  options?: Omit<RenderOptions, "wrapper">
) {
  const wrapper = ({ children }: Readonly<PropsWithChildren>) => {
    return (
      <SafeAreaProvider>
        <TamaguiProvider config={config}>{children}</TamaguiProvider>
      </SafeAreaProvider>
    );
  };

  return rtlRender(component, {
    ...options,
    wrapper,
  });
}
