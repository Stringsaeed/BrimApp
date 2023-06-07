import React from "react";
import { actions } from "react-native-pell-rich-editor";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";

import { theme } from "themes";

import { FontFamilyStylesheet, getToolbarIconMapper } from "./utilts";

interface ComposerComponentProps {
  onUserInput: (input: string) => void;
  onLoadEnd: () => void;
}

function ComposerComponent(
  { onUserInput, onLoadEnd }: ComposerComponentProps,
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
  flex: 1,
  backgroundColor: theme.colors.background,
  cssText: `font-family: Lato;background: white;`,
  initialCSSText: `${FontFamilyStylesheet}`,
  contentCSSText: `font-family: Lato; font-size: 16px; background: white;`,
};

const $toolbarStyle = {
  backgroundColor: theme.colors.background,
  borderWidth: 1,
  borderLeftWidth: 0,
  borderRightWidth: 0,
};
