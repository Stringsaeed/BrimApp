import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { ForwardedRef, useCallback } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack, useTheme } from "tamagui";

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
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      enablePanDownToClose
      enableDynamicSizing
      {...props}
      ref={ref}
      topInset={top}
      backgroundStyle={{ backgroundColor: theme.backgroundTransparent.get() }}
      handleComponent={renderHandle}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView>
        <Stack
          bg="$background"
          p="$4"
          borderTopRightRadius="$5"
          borderTopLeftRadius="$5"
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
