import React from "react";
import { actions } from "react-native-pell-rich-editor";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { useTheme } from "tamagui";

import { getToolbarIconMapper } from "./utilts";

interface ComposerComponentProps {
  onUserInput: (input: string) => void;
  onLoadEnd: () => void;
}

function ComposerComponent(
  { onUserInput, onLoadEnd }: ComposerComponentProps,
  ref: React.Ref<RichEditor>
) {
  const theme = useTheme();
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
        style={[$toolbarStyle, { borderColor: theme.purple5.val }]}
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
  backgroundColor: "beige",
  cssText: `font-family: 'Inter', monospace;background: beige;`,
  initialCSSText: `font-family: 'Inter', monospace;background: beige;`,
  contentCSSText: `font-family: 'Inter', monospace;background: beige;`,
};

const $toolbarStyle = {
  backgroundColor: "beige",
  borderWidth: 1,
  borderLeftWidth: 0,
  borderRightWidth: 0,
};
