import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";

import ArchivedNotesHeaderBackground from "components/archived-notes-header/background";
import { AuthProvider, NotesProvider, QueryProvider } from "contexts";
import { useLoadAssets } from "hooks";
import { theme } from "themes";

const ArchivedHeaderBackground = () => <ArchivedNotesHeaderBackground />;

export default function Layout() {
  const loaded = useLoadAssets();

  if (!loaded) {
    return <View />;
  }

  return (
    <QueryProvider>
      <AuthProvider>
        <NotesProvider>
          <ThemeProvider value={theme.navigation}>
            <Stack
              screenOptions={{
                headerTitleStyle: theme.textVariants.Headline,
                headerTintColor: theme.colors.text,
                headerBackTitleVisible: false,
              }}
            >
              <Stack.Screen
                name="(user)/profile"
                options={{ title: "Profile" }}
              />
              <Stack.Screen
                name="(user)/account-info"
                options={{ title: "Account Information" }}
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
                    Platform.OS !== "ios"
                      ? ArchivedHeaderBackground
                      : undefined,
                  headerBlurEffect: "light",
                  headerTransparent: true,
                  title: "Archived",
                  headerShown: true,
                }}
              />
            </Stack>
          </ThemeProvider>
        </NotesProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
