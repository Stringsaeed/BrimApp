import {
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { ForwardedRef, useCallback } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack, useTheme } from "tamagui";

import BlurBackdrop from "./blur-backdrop";

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
    (props: BottomSheetBackdropProps) => <BlurBackdrop {...props} />,
    []
  );

  return (
    <BottomSheetModal
      enablePanDownToClose={true}
      enableDynamicSizing={true}
      detached={true}
      bottomInset={bottom + 32}
      {...props}
      style={[props.style, { marginHorizontal: 16, borderRadius: 20 }]}
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
          shadowColor="$accent"
          shadowOffset={{ height: -2, width: 0 }}
          shadowOpacity={0.1}
          shadowRadius={4}
          elevationAndroid={4}
          borderRadius={20}
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
