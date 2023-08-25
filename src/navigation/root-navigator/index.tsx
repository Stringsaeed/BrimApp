import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { useAuth } from "contexts";
import createAppGroup from "navigation/app-group";
import createAuthGroup from "navigation/auth-group";
import { RootStackParamList } from "routers";

const RootNavigatorCreator = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { user } = useAuth();
  const authGroup = createAuthGroup(RootNavigatorCreator);
  const appGroup = createAppGroup(RootNavigatorCreator);
  const renderer = user ? appGroup : authGroup;

  return (
    <RootNavigatorCreator.Navigator>{renderer}</RootNavigatorCreator.Navigator>
  );
}
