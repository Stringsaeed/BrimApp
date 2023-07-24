import {
  BottomSheetBackdropProps,
  BottomSheetHandleProps,
  BottomSheetModal,
  BottomSheetProps,
} from "@gorhom/bottom-sheet";
import React, { ForwardedRef, useCallback } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BlurBackdrop from "./blur-backdrop";
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

  const renderHandle = useCallback(
    (props: BottomSheetHandleProps) => {
      return <Handle title={title} {...props} />;
    },
    [title]
  );

  //   const renderFooter = useCallback(
  //     (props: BottomSheetFooterProps) => {
  //       if (!submitLabel) {
  //         return null;
  //       }
  //       return (
  //         <BottomSheetFooter
  //           {...props}
  //           bottomInset={bottom}
  //           style={{ paddingHorizontal: 16 }}
  //         >
  //           <Button color="black" onPress={onSubmit}>
  //             {submitLabel}
  //           </Button>
  //         </BottomSheetFooter>
  //       );
  //     },
  //     [submitLabel, onSubmit]
  //   );

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => <BlurBackdrop {...props} />,
    []
  );

  return (
    <BottomSheetModal
      {...props}
      ref={ref}
      topInset={top}
      //   footerComponent={renderFooter}
      //   backgroundStyle={}
      handleComponent={renderHandle}
      backdropComponent={renderBackdrop}
    >
      {children}
    </BottomSheetModal>
  );
};

// forward ref
export default React.forwardRef(BottomSheet);
