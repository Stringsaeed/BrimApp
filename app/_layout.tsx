import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { Platform } from "react-native";

import ArchivedNotesHeaderBackground from "components/archived-notes-header/background";
import { AuthProvider, NotesProvider, QueryProvider } from "contexts";
import { useLoadAssets } from "hooks";
import { theme } from "themes";

SplashScreen.preventAutoHideAsync();

const ArchivedHeaderBackground = () => <ArchivedNotesHeaderBackground />;

export default function Layout() {
  const loaded = useLoadAssets();

  if (!loaded) {
    return null;
  }

  return (
    <QueryProvider>
      <AuthProvider>
        <NotesProvider>
          <Stack
            screenOptions={{
              headerTitleStyle: theme.textVariants.Headline,
              headerBackTitleVisible: false,
              headerTintColor: "#000",
            }}
          >
            <Stack.Screen
              name="(user)/profile"
              options={{ title: "Profile" }}
            />
            <Stack.Screen
              name="auth"
              options={{
                headerBackground: () => null,
                headerTransparent: true,
                headerShown: false,
              }}
            />
            <Stack.Screen name="notes/[id]" options={{ title: "" }} />
            <Stack.Screen
              name="notes/archive"
              options={{
                headerBackground:
                  Platform.OS !== "ios" ? ArchivedHeaderBackground : undefined,
                headerBlurEffect: "light",
                headerTransparent: true,
                title: "Archived",
                headerShown: true,
              }}
            />
          </Stack>
        </NotesProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
