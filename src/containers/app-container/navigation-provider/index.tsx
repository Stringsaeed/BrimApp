import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import React, { PropsWithChildren } from "react";
import { useTheme, useThemeName } from "tamagui";

export default function NavigationProvider({ children }: PropsWithChildren) {
  const themeName = useThemeName();
  const theme = useTheme();
  const bgColor = theme.background.get();
  const textColor = theme.color.get();
  const navigationTheme = React.useMemo(
    () =>
      themeName === "dark"
        ? {
            ...DarkTheme,
            colors: {
              ...DarkTheme.colors,
              background: bgColor,
              text: textColor,
            },
          }
        : {
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              background: bgColor,
              text: textColor,
            },
          },
    [bgColor, textColor, themeName]
  );

  return (
    <NavigationContainer theme={navigationTheme}>
      {children}
    </NavigationContainer>
  );
}
