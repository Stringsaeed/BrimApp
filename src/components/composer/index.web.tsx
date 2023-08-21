import { useEditor, EditorContent } from "@tiptap/react";
import { View } from "dripsy";
import React, { ForwardedRef } from "react";
import { StyleSheet, TextInput } from "react-native";

import { theme } from "themes";

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
    <View variants={["layout.flex", "layout.row"]}>
      <View variant="layout.flex" />
      <View style={{ width: "100%", maxWidth: 400 }}>
        <TextInput
          accessibilityLabel="Text input field"
          placeholder="Wanna title your note? 😒"
          style={$titleInputStyle}
          value={title}
          ref={ref}
          onChangeText={onTitleChange}
        />
        <EditorContent
          style={{
            height: "100%",
            width: "100%",
          }}
          className="editor"
          editor={editor}
        />
      </View>
      <View variant="layout.flex" />
    </View>
  );
}

const Composer = React.forwardRef(ComposerComponent);
export default Composer;

// const $containerStyle = {
//   minHeight: 300,
//   // padding: 16,
//   flex: 1,
// };

// const $rootStyle = {
//   flex: 1,
// };

// const $editorStyle = {
//   contentCSSText: `font-family: 'Red Hat Text', sans-serif;font-size: 16px; background: white; padding: 16px;`,
//   cssText: `font-family: 'Red Hat Text', sans-serif;background: white;`,
//   initialCSSText: `${FontFamilyStylesheet}`,
//   backgroundColor: theme.colors.background,
//   color: "#000",
//   flex: 1,
// };

// const $toolbarStyle = {
//   backgroundColor: theme.colors.background,
//   borderRightWidth: 0,
//   borderLeftWidth: 0,
//   borderWidth: 1,
// };

const $titleInputStyle = {
  paddingHorizontal: 16,
  paddingVertical: 8,
  ...theme.textVariants.Headline,
  borderWidth: StyleSheet.hairlineWidth,
  borderColor: theme.colors.secondary,
};

// const x = {
//   type: "doc",
//   content: [
//     {
//       type: "orderedList",
//       attrs: { start: 1 },
//       content: [
//         {
//           type: "listItem",
//           content: [
//             { type: "paragraph", content: [{ type: "text", text: "dasdas" }] },
//           ],
//         },
//         {
//           type: "listItem",
//           content: [
//             { type: "paragraph", content: [{ type: "text", text: "vvvv" }] },
//           ],
//         },
//         {
//           type: "listItem",
//           content: [
//             { type: "paragraph", content: [{ type: "text", text: "mmm" }] },
//           ],
//         },
//         { type: "listItem", content: [{ type: "paragraph" }] },
//       ],
//     },
//   ],
// };
