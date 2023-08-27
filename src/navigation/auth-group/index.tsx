import { ParamListBase } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import LoginPage from "app/(auth)/login";
import VerifyPage from "app/(auth)/verify";

export default function createAuthGroup<
  ParamsList extends ParamListBase,
  ThemeName extends "light" | "dark" | (string & {})
>(
  creator: ReturnType<typeof createNativeStackNavigator<ParamsList>>,
  _: ThemeName
) {
  return (
    <creator.Group screenOptions={{ headerShown: false }}>
      <creator.Screen name="login" component={LoginPage} />
      <creator.Screen name="verify" component={VerifyPage} />
    </creator.Group>
  );
}
