import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { PostHogProvider } from "posthog-react-native";
import React, { PropsWithChildren } from "react";
import { useTheme, useThemeName } from "tamagui";

import { Analytics, routingInstrumentation } from "services";

export default function NavigationProvider({ children }: PropsWithChildren) {
  const navigationRef = useNavigationContainerRef();
  const themeName = useThemeName();
  const theme = useTheme();
  const navigationTheme = React.useMemo(() => {
    const baseTheme = themeName === "dark" ? DarkTheme : DefaultTheme;
    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        background: theme.background.val,
        text: theme.color.val,
      },
    };
  }, [theme.background.val, theme.color.val, themeName]);

  const onReady = () => {
    routingInstrumentation.registerNavigationContainer(navigationRef);
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={onReady}
      theme={navigationTheme}
    >
      <PostHogProvider client={Analytics.postHug} autocapture>
        {children}
      </PostHogProvider>
    </NavigationContainer>
  );
}
