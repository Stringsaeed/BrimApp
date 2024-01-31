import { HeaderTitleProps } from "@react-navigation/elements";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import React, { useMemo } from "react";
import { SizableText, useTheme, useThemeName } from "tamagui";

import createAppGroup from "navigation/app-group";
import { RootStackParamList } from "routers";

// import { useAuth } from "contexts";
// import createAuthGroup from "navigation/auth-group";

const RootNavigatorCreator = createNativeStackNavigator<RootStackParamList>();

function headerTitle(props: HeaderTitleProps) {
  return (
    <SizableText size="$5" color={props.tintColor}>
      {props.children}
    </SizableText>
  );
}

export default function RootNavigator() {
  // const { user } = useAuth();
  const themeName = useThemeName();
  // const authGroup = createAuthGroup(RootNavigatorCreator, themeName);
  const appGroup = createAppGroup(RootNavigatorCreator, themeName);

  const theme = useTheme();
  const foregroundColor = theme.color.get();

  const screenOptions = useMemo<NativeStackNavigationOptions>(
    () => ({
      headerTintColor: foregroundColor,
      headerBackTitleVisible: false,
      headerShadowVisible: false,
      headerBackTitle: "",
      headerTitle,
    }),
    [foregroundColor]
  );

  return (
    <RootNavigatorCreator.Navigator screenOptions={screenOptions}>
      {appGroup}
    </RootNavigatorCreator.Navigator>
  );
}
