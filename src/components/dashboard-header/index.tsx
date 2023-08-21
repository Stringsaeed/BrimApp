import { Stack } from "expo-router";
import React from "react";
import {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

import { useNotesList } from "contexts";

import DashboardHeaderRight from "./right";

interface Props {
  onPressCreate: () => void;
  onPressProfile: () => void;
}

export default function DashboardHeader({
  onPressProfile,
  onPressCreate,
}: Props) {
  const { emptyScreenTranslateY: translateY } = useNotesList();
  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            translateY.value,
            [0, 100],
            [1, 1.3],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  }, []);

  function renderHeaderRight() {
    return (
      <DashboardHeaderRight
        onPressProfile={onPressProfile}
        onPressCreate={onPressCreate}
        createAnimatedStyle={stylez}
      />
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: renderHeaderRight,
          headerBlurEffect: "light",
          headerTransparent: true,
          headerShown: true,
          title: "",
        }}
      />
    </>
  );
}
