import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { X } from "@tamagui/lucide-icons";
import React, {
  ForwardedRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Circle,
  Paragraph,
  SizableText,
  Stack,
  useTheme,
  XStack,
} from "tamagui";

import { useUserAccent } from "@/hooks";

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
  const innerRef = useRef<BottomSheetModal>(null);
  const { accent } = useUserAccent();
  const { bottom, top } = useSafeAreaInsets();
  const theme = useTheme();

  useImperativeHandle(ref, () => innerRef.current!);

  const renderHandle = useCallback(() => {
    return null;
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
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
      ref={innerRef}
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
              <XStack ai="center" gap="$2" jc="space-between">
                <SizableText size="$6">{title}</SizableText>
                <Circle
                  bordered
                  size="$2"
                  jc="center"
                  ai="center"
                  borderColor={"$gray7"}
                  onPress={() => innerRef.current?.close()}
                >
                  <X size="$1" />
                </Circle>
              </XStack>
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
