import React, { ForwardedRef } from "react";
import { TextInput } from "react-native";
import { Input, TextArea } from "tamagui";

interface ComposerComponentProps {
  onUserInput: (input: string) => void;
  onLoadEnd?: () => void;
  onTitleChange: (title: string) => void;
  title: string;
  note: string;
}

function ComposerComponent(
  { onTitleChange, onUserInput, title, note }: ComposerComponentProps,
  ref: ForwardedRef<TextInput>
) {
  return (
    <>
      <Input
        px="$4"
        py="$2"
        fontSize="$7"
        borderWidth={0}
        borderBottomWidth={1}
        accessibilityLabel="Text input field"
        placeholder="Wanna title your note? 😒"
        value={title}
        onChangeText={onTitleChange}
      />
      <TextArea
        px="$4"
        py="$2"
        fontSize={16}
        lineHeight={24}
        borderWidth={0}
        accessibilityLabel="Text input field"
        ref={ref}
        value={note}
        onChangeText={onUserInput}
        style={$containerStyle}
      />
    </>
  );
}

const Composer = React.forwardRef(ComposerComponent);
export default Composer;

const $containerStyle = {
  minHeight: 300,
  flex: 1,
};
