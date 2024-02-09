import {
  MarkdownStyle,
  MarkdownTextInput,
} from "@expensify/react-native-live-markdown";
import React, {
  ForwardedRef,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { TextInput, TextStyle } from "react-native";
import { Stack, styled, useTheme } from "tamagui";

import { ComposerComponentProps, ComposerRef } from "./types";
import useNoteComposer from "./use-note-composer";

const StyledMarkdownTextInput = styled(MarkdownTextInput, {
  bg: "$backgroundTransparent",
  textAlignVertical: "top",
  borderRadius: "$0",
  borderWidth: "$0",
  // flex: 1,
  py: "$2.5",
  px: "$3",
});

const markdownStyle: MarkdownStyle = {
  blockquote: {
    borderColor: "gray",
    borderWidth: 6,
    paddingLeft: 6,
    marginLeft: 6,
  },
  code: {
    backgroundColor: "lightgray",
    fontFamily: "monospace",
    color: "black",
  },
  pre: {
    backgroundColor: "lightgray",
    fontFamily: "monospace",
    color: "black",
  },
  mentionHere: {
    backgroundColor: "lime",
    color: "green",
  },
  mentionUser: {
    backgroundColor: "cyan",
    color: "blue",
  },
  syntax: {
    color: "gray",
  },
  link: {
    color: "blue",
  },
  h1: {
    fontSize: 25,
  },
};

function ComposerComponent(
  _: ComposerComponentProps,
  ref: ForwardedRef<ComposerRef>
) {
  const [focused, setFocused] = React.useState(false);
  const { onChangeText, value } = useNoteComposer();
  const innerRef = useRef<TextInput>(null);
  const { color } = useTheme();
  const inputStyle = useMemo<TextStyle>(
    () => ({
      textAlignVertical: "top",
      textAlign: "left",
      color: color.val,
    }),
    [color.val]
  );

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
    <Stack flex={1} flexGrow={1}>
      <StyledMarkdownTextInput
        onChangeText={onChangeText}
        placeholder="Write something..."
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={innerRef}
        scrollEnabled
        style={inputStyle}
        numberOfLines={50}
        multiline
        markdownStyle={markdownStyle}
      />
    </Stack>
  );
}

const Composer = React.forwardRef(ComposerComponent);
export default Composer;
