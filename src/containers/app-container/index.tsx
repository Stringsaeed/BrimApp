import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
// import { PostHogProvider } from "posthog-react-native";
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
// import { Analytics } from "services";
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
                      {/* <PostHogProvider autocapture client={Analytics.postHug}> */}
                      <AppNavigator />
                      {/* </PostHogProvider> */}
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
