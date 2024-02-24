/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import "react-native-gesture-handler/jestSetup";
import "@testing-library/react-native/extend-expect";
import React from "react";
import { setUpTests } from "react-native-reanimated";
import mockSafeAreaContext from "react-native-safe-area-context/jest/mock";

setUpTests();

jest.mock("react-native-safe-area-context", () => mockSafeAreaContext);

jest.mock("@gorhom/bottom-sheet", () => {
  const RN = jest.requireActual("react-native");
  const BottomSheetModal = ({
    backdropComponent,
    handleComponent,
    footerComponent,
    children,
    ...props
  }) => {
    return (
      <RN.View {...props}>
        {backdropComponent && backdropComponent()}
        {handleComponent && handleComponent()}
        {children}
        {footerComponent && footerComponent()}
      </RN.View>
    );
  };
  return {
    __esModule: true,
    ...jest.requireActual("@gorhom/bottom-sheet/mock"),
    ...jest.requireActual("react-native-reanimated/mock"),
    TouchableOpacity: jest.requireActual("react-native").TouchableOpacity,
    BottomSheetBackdrop: jest.requireActual("react-native").View,
    BottomSheetHandle: jest.requireActual("react-native").View,
    BottomSheetFooter: jest.requireActual("react-native").View,
    BottomSheetModal,
  };
});

export {};
