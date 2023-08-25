import React, { ForwardedRef } from "react";
import { TextInput } from "react-native";
import { Input, TextArea } from "tamagui";

interface ComposerComponentProps {
  onUserInput: (input: string) => void;
  onLoadEnd?: () => void;
  onTitleChange: (title: string) => void;
  title: string;
}

function ComposerComponent(
  { onTitleChange, onUserInput, title }: ComposerComponentProps,
  ref: ForwardedRef<TextInput>
) {
  return (
    <>
      <Input
        px="$4"
        py="$2"
        borderWidth={0}
        borderBottomWidth={1}
        accessibilityLabel="Text input field"
        placeholder="Wanna title your note? 😒"
        value={title}
        onChangeText={onTitleChange}
      />
      <TextArea
        accessibilityLabel="Text input field"
        ref={ref}
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
