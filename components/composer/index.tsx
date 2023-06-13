import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { actions } from "react-native-pell-rich-editor";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";

import { FontFamilyStylesheet, getToolbarIconMapper } from "./utilts";
import { theme } from "themes";

interface ComposerComponentProps {
  onUserInput: (input: string) => void;
  onLoadEnd: () => void;
  onTitleChange: (title: string) => void;
  title: string;
}

function ComposerComponent(
  { onTitleChange, onUserInput, onLoadEnd, title }: ComposerComponentProps,
  ref: React.Ref<RichEditor>
) {
  return (
    <>
      <RichToolbar
        editor={ref}
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.setStrikethrough,
          actions.code,
          actions.insertLink,
          actions.insertOrderedList,
          actions.insertBulletsList,
          actions.setUnderline,
          actions.line,
        ]}
        style={[$toolbarStyle, { borderColor: theme.colors.secondary }]}
        iconMap={getToolbarIconMapper()}
      />
      <TextInput
        accessibilityLabel="Text input field"
        placeholder="Wanna title your note? 😒"
        style={$titleInputStyle}
        value={title}
        onChangeText={onTitleChange}
      />
      <RichEditor
        ref={ref}
        onChange={onUserInput}
        editorStyle={$editorStyle}
        style={$rootStyle}
        containerStyle={$containerStyle}
        onLoadEnd={onLoadEnd}
      />
    </>
  );
}

const Composer = React.forwardRef(ComposerComponent);
export default Composer;

const $containerStyle = {
  flex: 1,
};

const $rootStyle = {
  flex: 1,
};

const $editorStyle = {
  contentCSSText: `font-family: Lato; font-size: 16px; background: white; padding: 16px;`,
  cssText: `font-family: Lato;background: white;`,
  initialCSSText: `${FontFamilyStylesheet}`,
  backgroundColor: theme.colors.background,
  flex: 1,
};

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
