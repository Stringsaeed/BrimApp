import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { setBackgroundColorAsync } from "expo-system-ui";
import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TamaguiProvider } from "tamagui";

import { tamaguiConfig } from "config";
import { AuthProvider, NotesProvider, QueryProvider } from "contexts";
import { useUserTheme } from "hooks";
import { AppNavigator } from "navigation";

import NavigationProvider from "./navigation-provider";

export default function AppContainer() {
  const { theme } = useUserTheme();

  useEffect(() => {
    setBackgroundColorAsync(theme === "dark" ? "#000" : "#fff");
  }, [theme]);

  return (
    <TamaguiProvider defaultTheme={theme ?? "dark"} config={tamaguiConfig}>
      <StatusBar
        translucent={true}
        hidden={false}
        backgroundColor="transparent"
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
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
