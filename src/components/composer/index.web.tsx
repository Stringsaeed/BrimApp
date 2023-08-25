import { useEditor, EditorContent } from "@tiptap/react";
import React, { ForwardedRef } from "react";
import { TextInput } from "react-native";
import { XStack, View, Input } from "tamagui";

// import { getToolbarIconMapper } from "./utilts";

interface ComposerComponentProps {
  onUserInput: (input: string) => void;
  onLoadEnd: () => void;
  onTitleChange: (title: string) => void;
  title: string;
}

function ComposerComponent(
  { onTitleChange, onUserInput, title }: ComposerComponentProps,
  ref: ForwardedRef<TextInput>
) {
  const editor = useEditor({
    onUpdate({ editor: editorProp }) {
      const json = editorProp.getJSON();
      onUserInput(JSON.stringify(json));
    },

    content: "write you note here",
    editorProps: {},
    injectCSS: true,
    autofocus: true,
    editable: true,
  });

  return (
    <XStack flex={1}>
      <View flex={1} />
      <View width="100%" maxWidth={400}>
        <Input
          ref={ref}
          px="$4"
          py="$2"
          borderWidth={0}
          borderBottomWidth={1}
          accessibilityLabel="Text input field"
          placeholder="Wanna title your note? 😒"
          value={title}
          onChangeText={onTitleChange}
        />
        <EditorContent editor={editor} />
      </View>
      <View flex={1} />
    </XStack>
  );
}

const Composer = React.forwardRef(ComposerComponent);
export default Composer;
