import { ParamListBase } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { Routes } from "routers";
import { AuthScreens } from "screens";

export default function createAuthGroup<
  ParamsList extends ParamListBase,
  ThemeName extends "light" | "dark" | (string & {})
>(
  creator: ReturnType<typeof createNativeStackNavigator<ParamsList>>,
  _: ThemeName
) {
  return (
    <creator.Group screenOptions={{ headerShown: false }}>
      <creator.Screen name={Routes.Login} component={AuthScreens.Login} />
      <creator.Screen
        name={Routes.Verify}
        component={AuthScreens.Verify}
        options={{ headerShown: true, title: "" }}
      />
    </creator.Group>
  );
}
