// import { Stack } from "expo-router";
// import React from "react";
// import { Platform } from "react-native";
// import { BlurEffectTypes } from "react-native-screens";
// import { useTheme, useThemeName } from "tamagui";

// import { ArchivedNotesHeaderBackground } from "components";

// const ArchivedHeaderBackground = () => <ArchivedNotesHeaderBackground />;

export default function MainNavigation() {
  // const themeName = useThemeName();
  // const theme = useTheme();
  // const text = theme.color.get();

  return null;
}

/**
 *  <Stack
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: text,
        headerBackTitle: "",
      }}
    >
      <Stack.Screen
        name="(user)/profile"
        options={{
          headerBackTitleVisible: false,
          headerBackTitle: "",
          title: "Profile",
        }}
      />
      <Stack.Screen
        name="(user)/account-info"
        options={{
          headerBackTitleVisible: false,
          title: "Account Information",
          headerBackTitle: "",
        }}
      />
      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="notes/[id]"
        options={{
          headerBlurEffect: themeName as BlurEffectTypes,
          headerTransparent: true,
          headerShown: true,
          title: "",
        }}
      />
      <Stack.Screen
        name="notes/archive"
        options={{
          headerBackground:
            Platform.OS !== "ios" ? ArchivedHeaderBackground : undefined,
          headerBlurEffect: themeName as BlurEffectTypes,
          headerTransparent: true,
          title: "Archived",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="notes/trash"
        options={{
          headerBackground:
            Platform.OS !== "ios" ? ArchivedHeaderBackground : undefined,
          headerBlurEffect: themeName as BlurEffectTypes,
          headerTransparent: true,
          headerShown: true,
          title: "Trash",
        }}
      />
    </Stack>
 */
