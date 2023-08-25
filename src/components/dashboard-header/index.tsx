import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { BlurEffectTypes } from "react-native-screens";
import { useThemeName } from "tamagui";

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
  const navigation = useNavigation();
  const themeName = useThemeName();
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

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerBlurEffect: themeName as BlurEffectTypes,
        headerRight: renderHeaderRight,
        headerTransparent: true,
        headerShown: true,
        title: "",
      });
    }, [])
  );

  return null;
}
