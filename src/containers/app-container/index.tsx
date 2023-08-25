import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useMemo } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TamaguiProvider } from "tamagui";

import { tamaguiConfig } from "config";
import { AuthProvider, NotesProvider, QueryProvider } from "contexts";
import { AppNavigator } from "navigation";

function useTheming() {
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

  return { navigationTheme, colorScheme };
}

export default function AppContainer() {
  const { navigationTheme, colorScheme } = useTheming();

  return (
    <TamaguiProvider
      defaultTheme={colorScheme ?? "dark"}
      config={tamaguiConfig}
    >
      <QueryProvider>
        <AuthProvider>
          <NotesProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <BottomSheetModalProvider>
                <StatusBar
                  style={colorScheme === "dark" ? "light" : "dark"}
                  translucent
                />
                <NavigationContainer theme={navigationTheme}>
                  <AppNavigator />
                </NavigationContainer>
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </NotesProvider>
        </AuthProvider>
      </QueryProvider>
    </TamaguiProvider>
  );
}
