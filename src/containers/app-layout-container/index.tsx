import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  ThemeProvider,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { PropsWithChildren, useMemo } from "react";
import { useColorScheme } from "react-native";
import { TamaguiProvider } from "tamagui";

import { tamaguiConfig } from "config";
import { AuthProvider, NotesProvider, QueryProvider } from "contexts";
import { useLoadAssets } from "hooks";

export default function AppLayoutContainer({ children }: PropsWithChildren) {
  const loaded = useLoadAssets();
  const colorScheme = useColorScheme() ?? "dark";
  const navigationTheme = useMemo(
    () =>
      colorScheme === "dark"
        ? DarkTheme
        : {
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              background: "#fff",
            },
          },
    [colorScheme]
  );

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider
      defaultTheme={colorScheme ?? "dark"}
      config={tamaguiConfig}
    >
      <ThemeProvider value={navigationTheme}>
        <QueryProvider>
          <AuthProvider>
            <NotesProvider>
              <BottomSheetModalProvider>
                <StatusBar
                  style={colorScheme === "dark" ? "light" : "dark"}
                  translucent
                />
                {children}
              </BottomSheetModalProvider>
            </NotesProvider>
          </AuthProvider>
        </QueryProvider>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
