import {
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import React, { ForwardedRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { YGroup } from "tamagui";

import BottomSheet from "components/bottom-sheet";

import SelectThemeItem from "./select-theme-item";

interface Props {
  value: "system" | "light" | "dark";
  onChange: (value: "system" | "light" | "dark") => void;
}

const snapPoints = ["CONTENT_HEIGHT", "CONTENT_HEIGHT"];

function SelectThemeComponent(
  { onChange, value }: Props,
  ref: ForwardedRef<BottomSheetModal>
) {
  const { bottom } = useSafeAreaInsets();
  const {
    animatedContentHeight,
    animatedHandleHeight,
    handleContentLayout,
    animatedSnapPoints,
  } = useBottomSheetDynamicSnapPoints(snapPoints);

  const createOnPress = (value: "system" | "light" | "dark") => () => {
    onChange(value);
  };

  return (
    <BottomSheet
      ref={ref}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      snapPoints={animatedSnapPoints}
      title="Select Theme"
    >
      <BottomSheetView
        style={{ paddingBottom: bottom }}
        onLayout={handleContentLayout}
      >
        <YGroup>
          <SelectThemeItem
            title="System"
            onPress={createOnPress("system")}
            selected={value === "system"}
          />
          <SelectThemeItem
            title="Light"
            onPress={createOnPress("light")}
            selected={value === "light"}
          />
          <SelectThemeItem
            title="Dark"
            onPress={createOnPress("dark")}
            selected={value === "dark"}
          />
        </YGroup>
      </BottomSheetView>
    </BottomSheet>
  );
}

const SelectTheme = React.forwardRef(SelectThemeComponent);

export default SelectTheme;
