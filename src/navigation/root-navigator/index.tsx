import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SizableText, useTheme, useThemeName } from "tamagui";

import { useAuth } from "contexts";
import createAppGroup from "navigation/app-group";
import createAuthGroup from "navigation/auth-group";
import { RootStackParamList } from "routers";

const RootNavigatorCreator = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { user } = useAuth();
  const themeName = useThemeName();
  const authGroup = createAuthGroup(RootNavigatorCreator, themeName);
  const appGroup = createAppGroup(RootNavigatorCreator, themeName);
  const renderer = user ? appGroup : authGroup;
  const theme = useTheme();
  const foregroundColor = theme.color.get();

  return (
    <RootNavigatorCreator.Navigator
      screenOptions={{
        headerTitle(props) {
          return (
            <SizableText size="$5" color={props.tintColor}>
              {props.children}
            </SizableText>
          );
        },
        headerTintColor: foregroundColor,
        headerBackTitleVisible: false,
        headerBackTitle: "",
      }}
    >
      {renderer}
    </RootNavigatorCreator.Navigator>
  );
}
