import React, { ForwardedRef, useImperativeHandle, useRef } from "react";
import { TextInput } from "react-native";
import { TextArea } from "tamagui";

import { ComposerComponentProps, ComposerRef } from "./types";
import useNoteComposer from "./use-note-composer";

function ComposerComponent(
  _: ComposerComponentProps,
  ref: ForwardedRef<ComposerRef>
) {
  const [focused, setFocused] = React.useState(false);
  const { onChangeText, value } = useNoteComposer();
  const innerRef = useRef<TextInput>(null);

  const onFocus = () => {
    setFocused(true);
  };

  const onBlur = () => {
    setFocused(false);
  };

  useImperativeHandle(ref, () => {
    return {
      focus() {
        innerRef.current?.focus();
      },
      blur() {
        innerRef.current?.blur();
      },
      isFocused() {
        return focused;
      },
    };
  });

  return (
    <TextArea
      onChangeText={onChangeText}
      placeholder="Write something..."
      value={value}
      onFocus={onFocus}
      onBlur={onBlur}
      ref={innerRef}
      scrollEnabled
      bg="$backgroundTransparent"
      borderRadius="$0"
      flex={1}
      textAlignVertical="top"
      borderWidth="$0"
    />
  );
}

const Composer = React.forwardRef(ComposerComponent);
export default Composer;
