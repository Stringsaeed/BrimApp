import { useEditor, EditorContent } from "@tiptap/react";
import React, { ForwardedRef, useImperativeHandle } from "react";

import { ComposerComponentProps, ComposerRef } from "./types";
import useNoteComposer from "./use-note-composer";

function ComposerComponent(
  { onLoadEnd }: ComposerComponentProps,
  ref: ForwardedRef<ComposerRef>
) {
  const { onChangeText, onBlur, value } = useNoteComposer();

  const editor = useEditor({
    onUpdate({ editor: editorProp }) {
      const json = editorProp.getJSON();
      onChangeText(JSON.stringify(json));
    },
    onCreate() {
      onLoadEnd?.();
    },
    autofocus: true,
    injectCSS: true,
    editorProps: {},
    editable: true,
    content: value,
    onBlur,
  });

  useImperativeHandle(ref, () => {
    return {
      isFocused() {
        return !!editor?.isFocused;
      },
      focus() {
        editor?.chain().focus().run();
      },
      blur() {
        editor?.chain().blur().run();
      },
    };
  });

  return <EditorContent editor={editor} />;
}

const Composer = React.forwardRef(ComposerComponent);
export default Composer;
