import { HeaderTitleProps } from "@react-navigation/elements";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Stack } from "expo-router";
import React, { useMemo } from "react";
import { SizableText, useTheme } from "tamagui";

function headerTitle(props: HeaderTitleProps) {
  return (
    <SizableText size="$5" color={props.tintColor}>
      {props.children}
    </SizableText>
  );
}

export default function AppGroupLayout() {
  const theme = useTheme();

  const screenOptions = useMemo<NativeStackNavigationOptions>(
    () => ({
      headerTintColor: theme.color.val,
      headerBackTitleVisible: false,
      headerShadowVisible: false,
      headerBackTitle: "",
      headerTitle,
    }),
    [theme.color.val]
  );

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name="index" options={{ title: "" }} />
      <Stack.Screen
        name="notes/[id]"
        options={{ headerTransparent: true, title: "" }}
      />
      <Stack.Screen name="notes/archived" options={{ title: "Archived" }} />
      <Stack.Screen name="notes/trashed" options={{ title: "Trash" }} />
      <Stack.Screen name="user/profile" options={{ title: "Settings" }} />
      <Stack.Screen
        name="user/account-info"
        options={{ title: "Account Information" }}
      />
      <Stack.Screen
        name="user/preferences"
        options={{ title: "Preferences" }}
      />
    </Stack>
  );
}
