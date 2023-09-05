import React, { ForwardedRef, useImperativeHandle, useRef } from "react";
import { TextInput } from "react-native";
import { TextArea } from "tamagui";

import { ComposerComponentProps, ComposerRef } from "./types";
import useNoteComposer from "./use-note-composer";

function ComposerComponent(
  { onLoadEnd }: ComposerComponentProps,
  ref: ForwardedRef<ComposerRef>
) {
  const { onChangeText, onBlur, value } = useNoteComposer();
  const innerRef = useRef<TextInput>(null);

  useImperativeHandle(ref, () => {
    return {
      isFocused() {
        return !!innerRef.current?.isFocused();
      },
      focus() {
        innerRef.current?.focus();
      },
      blur() {
        innerRef.current?.blur();
      },
    };
  });

  return (
    <TextArea
      px="$4"
      py="$2"
      fontSize={16}
      lineHeight={24}
      borderWidth={0}
      accessibilityLabel="Text input field"
      ref={innerRef}
      value={value}
      onChangeText={onChangeText}
      textAlignVertical="top"
      textAlign="left"
      onLayout={onLoadEnd}
      flex={1}
      minHeight={300}
      onBlur={onBlur}
    />
  );
}

const Composer = React.forwardRef(ComposerComponent);
export default Composer;
