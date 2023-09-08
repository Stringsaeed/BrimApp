import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetHandleProps,
  BottomSheetModal,
  BottomSheetProps,
} from "@gorhom/bottom-sheet";
import React, { ForwardedRef, useCallback } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "tamagui";

import Handle from "./handle";

interface Props extends BottomSheetProps {
  title?: string;
}

// TODO: add footer component

// component
const BottomSheet = (
  { children, title, ...props }: Props,
  ref: ForwardedRef<BottomSheetModal>
) => {
  const { top } = useSafeAreaInsets();

  const theme = useTheme();

  const renderHandle = useCallback(
    (props: BottomSheetHandleProps) => {
      return <Handle title={title} {...props} />;
    },
    [title]
  );

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
      {...props}
      ref={ref}
      topInset={top}
      backgroundStyle={{ backgroundColor: theme.background.get() }}
      handleComponent={renderHandle}
      backdropComponent={renderBackdrop}
    >
      {children}
    </BottomSheetModal>
  );
};

// forward ref
export default React.forwardRef(BottomSheet);
