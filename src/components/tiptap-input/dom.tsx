"use dom";

import { Content, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useMemo } from "react";

import "./index.css";

const extensions = [StarterKit];

const ComposerView = ({
  onChange,
  content,
  onFocus,
  onBlur,
}: {
  content: string;
  onChange: (content: string) => void;
  onBlur: () => void;
  onFocus: () => void;
  dom?: import("expo/dom").DOMProps;
}) => {
  const parsedContent = useMemo(() => {
    try {
      return JSON.parse(content) as Content;
    } catch {
      return content;
    }
  }, [content]);

  const editor = useEditor({
    onUpdate: ({ editor }) => {
      onChange(JSON.stringify(editor.getJSON()));
    },
    onFocus: () => {
      onFocus();
    },
    onBlur: () => {
      onBlur();
    },
    content: parsedContent,
    extensions,
  });

  if (!editor) {
    return null;
  }

  return <EditorContent className="editor" editor={editor} />;
};

export default ComposerView;
