import {
  ChangeContentArgs,
  RefRichTextEditor,
  RichTextEditor,
} from "@brim-app/composer";
import React, { ForwardedRef, useImperativeHandle, useRef } from "react";
import { useTheme } from "tamagui";

import styles from "./styles";
import { ComposerComponentProps, ComposerRef } from "./types";
import useNoteComposer from "./use-note-composer";

function ComposerComponent(
  { onLoadEnd }: ComposerComponentProps,
  ref: ForwardedRef<ComposerRef>
) {
  const [focused, setFocused] = React.useState(false);
  const { onChangeText, value } = useNoteComposer();
  const innerRef = useRef<RefRichTextEditor>(null);
  const theme = useTheme();

  const htmlStyles = {
    CSS: `
      html {
        color: ${theme.color.get()};
        font-size: 16px;
      }
      `,
    placeholderColor: theme.gray10.get(),
    caretColor: theme.color.get(),
  };

  const onFocus = () => {
    setFocused(true);
  };

  const onBlur = () => {
    setFocused(false);
  };

  const onChangeContent = ({ html }: ChangeContentArgs) => {
    onChangeText(html);
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
    <RichTextEditor
      containerStyle={styles.containerStyle}
      onChangeContent={onChangeContent}
      placeholder="Write something..."
      initialHTMLContent={value}
      htmlStyles={htmlStyles}
      onLoadEnd={onLoadEnd}
      style={styles.style}
      onFocus={onFocus}
      onBlur={onBlur}
      ref={innerRef}
      scrollEnabled
    />
  );
}

const Composer = React.forwardRef(ComposerComponent);
export default Composer;
