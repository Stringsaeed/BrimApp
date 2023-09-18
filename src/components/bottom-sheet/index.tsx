import {
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { ForwardedRef, useCallback } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack, useTheme } from "tamagui";

import AccentBackdrop from "./accent-backdrop";

interface Props extends Partial<BottomSheetProps> {
  title?: string;
  children: React.ReactNode;
}

// component
const BottomSheetComponent = (
  { children, ...props }: Props,
  ref: ForwardedRef<BottomSheetModal>
) => {
  const { bottom, top } = useSafeAreaInsets();
  const theme = useTheme();

  const renderHandle = useCallback(() => {
    return null;
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => <AccentBackdrop {...props} />,
    []
  );

  return (
    <BottomSheetModal
      enablePanDownToClose
      enableDynamicSizing
      {...props}
      ref={ref}
      topInset={top}
      backgroundStyle={{
        backgroundColor: theme.backgroundTransparent.get(),
      }}
      handleComponent={renderHandle}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView>
        <Stack
          bg="$background"
          p="$4"
          borderTopRightRadius="$5"
          borderTopLeftRadius="$5"
          shadowColor="$accent"
          shadowOffset={{ height: -2, width: 0 }}
          shadowOpacity={0.1}
          shadowRadius={4}
          elevationAndroid={4}
          pb={bottom}
        >
          {children}
        </Stack>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

// forward ref
const BottomSheet = React.forwardRef(BottomSheetComponent);
export default BottomSheet;
