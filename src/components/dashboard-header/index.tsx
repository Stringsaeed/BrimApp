import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";

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

  const headerRight = useCallback(() => {
    return (
      <DashboardHeaderRight
        onPressProfile={onPressProfile}
        onPressCreate={onPressCreate}
      />
    );
  }, [onPressCreate, onPressProfile]);

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({ headerRight });
    }, [navigation, headerRight])
  );

  return null;
}
