import {
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { ForwardedRef, useCallback } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Paragraph, SizableText, Stack, useTheme } from "tamagui";

import { useUserAccent } from "hooks";

import BlurBackdrop from "./blur-backdrop";
import styles from "./styles";

interface Props extends Partial<BottomSheetProps> {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}

// component
const BottomSheetComponent = (
  { children, subtitle, title, ...props }: Props,
  ref: ForwardedRef<BottomSheetModal>
) => {
  const { accent } = useUserAccent();
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
      style={[props.style, styles.bottomSheetStyle]}
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
          shadowColor={`$${accent}`}
          shadowOffset={{ height: -3, width: 0 }}
          shadowOpacity={0.2}
          shadowRadius={5}
          elevationAndroid={4}
          borderRadius={20}
        >
          {!!title && (
            <Stack mb="$4">
              <SizableText size="$6">{title}</SizableText>
              {!!subtitle && <Paragraph color="$gray9">{subtitle}</Paragraph>}
            </Stack>
          )}
          {children}
        </Stack>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

// forward ref
const BottomSheet = React.forwardRef(BottomSheetComponent);
export default BottomSheet;
