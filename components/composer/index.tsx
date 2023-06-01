import React from "react";
import { RichEditor } from "react-native-pell-rich-editor";

interface ComposerComponentProps {
  onUserInput: (input: string) => void;
  onLoadEnd: () => void;
}

function ComposerComponent(
  { onUserInput, onLoadEnd }: ComposerComponentProps,
  ref: React.Ref<RichEditor>
) {
  return (
    <RichEditor
      ref={ref}
      // styleWithCSS={false}
      onChange={onUserInput}
      editorStyle={$editorStyle}
      style={$rootStyle}
      containerStyle={$containerStyle}
      onLoadEnd={onLoadEnd}
    />
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
