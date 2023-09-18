import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import React from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TamaguiProvider } from "tamagui";

import {
  AuthProvider,
  NotesProvider,
  PullToActionProvider,
  QueryProvider,
} from "contexts";
import { useUserTheme } from "hooks";
import { AppNavigator } from "navigation";
import { themeConfig } from "themes";

import NavigationProvider from "./navigation-provider";

export default function AppContainer() {
  const { theme } = useUserTheme();

  return (
    <TamaguiProvider defaultTheme={theme} config={themeConfig}>
      <QueryProvider>
        <AuthProvider>
          <NotesProvider>
            <GestureHandlerRootView style={styles.rootView}>
              <SafeAreaProvider>
                <BottomSheetModalProvider>
                  <PullToActionProvider>
                    <NavigationProvider>
                      <AppNavigator />
                    </NavigationProvider>
                  </PullToActionProvider>
                </BottomSheetModalProvider>
              </SafeAreaProvider>
            </GestureHandlerRootView>
          </NotesProvider>
        </AuthProvider>
      </QueryProvider>
    </TamaguiProvider>
  );
}

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
});
