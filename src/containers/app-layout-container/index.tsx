import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ThemeProvider } from "@react-navigation/native";
import { DripsyProvider } from "dripsy";
import { StatusBar } from "expo-status-bar";
import React, { PropsWithChildren } from "react";
import { TamaguiProvider } from "tamagui";

import { tamaguiConfig } from "config";
import { AuthProvider, NotesProvider, QueryProvider } from "contexts";
import { useLoadAssets } from "hooks";
import { theme, dripsyTheme } from "themes";

export default function AppLayoutContainer({ children }: PropsWithChildren) {
  const loaded = useLoadAssets();

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <DripsyProvider theme={dripsyTheme}>
        <QueryProvider>
          <AuthProvider>
            <NotesProvider>
              <BottomSheetModalProvider>
                <StatusBar backgroundColor="#fff" translucent />
                <ThemeProvider value={theme.navigation}>
                  {children}
                </ThemeProvider>
              </BottomSheetModalProvider>
            </NotesProvider>
          </AuthProvider>
        </QueryProvider>
      </DripsyProvider>
    </TamaguiProvider>
  );
}
