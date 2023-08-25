import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { RootStackParamList } from "routers";
import { LoginScreen, VerifyScreen } from "screens";

export default function createAuthGroup(
  creator: ReturnType<typeof createNativeStackNavigator<RootStackParamList>>
) {
  return (
    <creator.Group screenOptions={{ headerShown: false }}>
      <creator.Screen name="login" component={LoginScreen} />
      <creator.Screen name="verify" component={VerifyScreen} />
    </creator.Group>
  );
}
