import {
  FormatType,
  RefRichTextEditor,
  RefRichTextToolbar,
  RichTextEditor,
  RichTextToolbar,
} from "@ankipro/react-native-rich-text/src";
import { View } from "dripsy";
import React, { ForwardedRef, RefObject, useRef } from "react";
import {
  // InputAccessoryView,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
} from "react-native";
// import {
//   actions,
//   RichEditor,
//   RichToolbar,
// } from "react-native-pell-rich-editor";

import Button from "components/button";
import { theme } from "themes";

import { getToolbarIconMapper } from "./utilts";

interface ComposerComponentProps {
  onUserInput: (input: string) => void;
  onLoadEnd: () => void;
  onTitleChange: (title: string) => void;
  title: string;
}

const ACTIONS = [
  FormatType.bold,
  FormatType.italic,
  FormatType.underline,
  FormatType.strike,
  FormatType.orderedList,
  FormatType.bulletList,
];

function ComposerComponent(
  { onTitleChange, onUserInput, onLoadEnd, title }: ComposerComponentProps,
  ref: ForwardedRef<RefRichTextEditor>
) {
  const toolbarRef = useRef<RefRichTextToolbar>(null);
  const toolbarIcons = getToolbarIconMapper();

  return (
    <>
      <TextInput
        accessibilityLabel="Text input field"
        placeholder="Wanna title your note? 😒"
        style={$titleInputStyle}
        value={title}
        onChangeText={onTitleChange}
      />
      <RichTextEditor
        ref={ref}
        hideKeyboardAccessoryView={true}
        onChangeContent={({ html, json }) => {
          console.log(JSON.stringify(json));

          onUserInput(html);
        }}
        enterKeyHint="done"
        style={$containerStyle}
        containerStyle={$containerStyle}
        onLoadEnd={onLoadEnd}
        keyboardDisplayRequiresUserAction={true}
      />
      <KeyboardAvoidingView keyboardVerticalOffset={100} behavior="position">
        <RichTextToolbar
          ref={toolbarRef}
          editorRef={ref as RefObject<RefRichTextEditor>}
        >
          {({ handleFormatPress, state }) => (
            <View
              variant="layout.row"
              style={[$toolbarStyle, { borderColor: theme.colors.secondary }]}
            >
              {ACTIONS.map((action) => {
                const isActive = !!state?.[action];
                const handlePress = handleFormatPress(action);
                const Icon = toolbarIcons[action];

                return (
                  <Button iconOnly key={action} onPress={handlePress}>
                    <Icon
                      tintColor={
                        isActive ? theme.colors.primary : theme.colors.text
                      }
                    />
                  </Button>
                );
              })}
            </View>
          )}
        </RichTextToolbar>
      </KeyboardAvoidingView>
    </>
  );
}

const Composer = React.forwardRef(ComposerComponent);
export default Composer;

const $containerStyle = {
  minHeight: 300,
  // padding: 16,
  flex: 1,
};

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

const $toolbarStyle = {
  backgroundColor: theme.colors.background,
  borderRightWidth: 0,
  borderLeftWidth: 0,
  borderWidth: 1,
};

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
