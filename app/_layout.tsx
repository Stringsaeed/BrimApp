import React from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_400Regular_Italic,
  DMSans_500Medium,
  DMSans_500Medium_Italic,
  DMSans_700Bold,
  DMSans_700Bold_Italic,
} from "@expo-google-fonts/dm-sans";

import { AuthProvider, NotesProvider, QueryProvider } from "contexts";
import { fonts, theme } from "themes";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [loaded] = useFonts({
    [fonts.semiBoldItalic]: DMSans_500Medium_Italic,
    [fonts.regularItalic]: DMSans_400Regular_Italic,
    [fonts.boldItalic]: DMSans_700Bold_Italic,
    [fonts.semiBold]: DMSans_500Medium,
    [fonts.regular]: DMSans_400Regular,
    [fonts.bold]: DMSans_700Bold,
  });

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
          </Stack>
        </NotesProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
