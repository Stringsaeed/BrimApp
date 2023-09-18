import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

import { usePullToActionContext } from "contexts";

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
  const { translateY } = usePullToActionContext();
  // const { emptyScreenTranslateY } = useNotesList();
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

  const headerRight = useCallback(() => {
    return (
      <DashboardHeaderRight
        onPressProfile={onPressProfile}
        onPressCreate={onPressCreate}
        createAnimatedStyle={stylez}
      />
    );
  }, [onPressCreate, onPressProfile, stylez]);

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({ headerRight });
    }, [navigation, headerRight])
  );

  return null;
}
