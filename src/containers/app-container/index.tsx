import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { setBackgroundColorAsync } from "expo-system-ui";
import React, { useEffect } from "react";
import { StatusBar, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TamaguiProvider } from "tamagui";

import { tamaguiConfig } from "config";
import { AuthProvider, NotesProvider, QueryProvider } from "contexts";
import { AppNavigator } from "navigation";

import NavigationProvider from "./navigation-provider";

export default function AppContainer() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    setBackgroundColorAsync(colorScheme === "dark" ? "#000" : "#fff");
  }, [colorScheme]);

  return (
    <TamaguiProvider
      defaultTheme={colorScheme ?? "dark"}
      config={tamaguiConfig}
    >
      <StatusBar
        translucent={true}
        hidden={false}
        backgroundColor="transparent"
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <QueryProvider>
        <AuthProvider>
          <NotesProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <SafeAreaProvider>
                <BottomSheetModalProvider>
                  <NavigationProvider>
                    <AppNavigator />
                  </NavigationProvider>
                </BottomSheetModalProvider>
              </SafeAreaProvider>
            </GestureHandlerRootView>
          </NotesProvider>
        </AuthProvider>
      </QueryProvider>
    </TamaguiProvider>
  );
}
