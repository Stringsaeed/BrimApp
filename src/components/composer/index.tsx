import {
  MarkdownTextInput,
  parseExpensiMark,
} from "@expensify/react-native-live-markdown";
import React, { ForwardedRef } from "react";
import { Stack, styled, useTheme } from "tamagui";

import { useUserAccent } from "hooks";

import { ComposerComponentProps } from "./types";
import useNoteComposer from "./use-note-composer";

const TamaguiComposer = styled(
  MarkdownTextInput,
  {
    name: "TamaguiComposer",
  },
  {
    isInput: true,
  }
);
function ComposerComponent(
  _: ComposerComponentProps,
  ref: ForwardedRef<MarkdownTextInput>
) {
  const theme = useTheme();
  const { accent } = useUserAccent();
  const { onChangeText, onBlur, value } = useNoteComposer();

  return (
    <Stack flex={1} flexGrow={1}>
      <TamaguiComposer
        ref={ref}
        value={value}
        parser={parseExpensiMark}
        onChangeText={onChangeText}
        onBlur={onBlur}
        fontFamily="$body"
        p="$4"
        color="$color"
        minHeight="100%"
        verticalAlign="top"
        cursorColor={theme[accent].get()}
        selectionColor={theme[accent].get()}
        multiline
        // placeholderTextColor={theme.color.get()}
        placeholder="Write something..."
      />
    </Stack>
  );
}

const Composer = React.forwardRef(ComposerComponent);
export default Composer;
