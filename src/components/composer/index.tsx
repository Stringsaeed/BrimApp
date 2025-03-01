import React, { useImperativeHandle, useState, type ForwardedRef } from "react";
import { Stack } from "tamagui";

// import { useUserAccent } from "hooks";

import TiptapInput from "components/tiptap-input";

import type { ComposerComponentProps, ComposerRef } from "./types";
import useNoteComposer from "./use-note-composer";

function ComposerComponent(
  _: ComposerComponentProps,
  ref: ForwardedRef<ComposerRef>
) {
  // const theme = useTheme();
  // const { accent } = useUserAccent();
  const [isFocused, setIsFocused] = useState(false);
  const { onChangeText, onBlur, value } = useNoteComposer();

  useImperativeHandle(ref, () => ({
    isFocused: () => {
      return isFocused;
    },
    focus: () => {
      setIsFocused(true);
    },
    blur: () => {
      setIsFocused(false);
    },
  }));

  return (
    <Stack flex={1} flexGrow={1}>
      <TiptapInput
        content={value}
        onChange={(content) => onChangeText(content)}
        onBlur={onBlur}
      />
    </Stack>
  );
}

const Composer = React.forwardRef(ComposerComponent);
export default Composer;
