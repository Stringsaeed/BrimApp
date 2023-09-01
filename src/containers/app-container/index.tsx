import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import React from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TamaguiProvider } from "tamagui";

import { tamaguiConfig } from "config";
import { AuthProvider, NotesProvider, QueryProvider } from "contexts";
import { AppNavigator } from "navigation";

import NavigationProvider from "./navigation-provider";

export default function AppContainer() {
  const colorScheme = useColorScheme();

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
                <NavigationProvider>
                  <AppNavigator />
                </NavigationProvider>
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </NotesProvider>
        </AuthProvider>
      </QueryProvider>
    </TamaguiProvider>
  );
}
