import { RichText } from "@10play/tentap-editor";
import { ForwardedRef, forwardRef, useImperativeHandle, useRef } from "react";
import { TextInput } from "react-native";

import { TiptapInputProps } from "./types";
import { useInputEditorSetup } from "./use-input-editor-setup";

function TiptapInputComponent(
  { onChange, content }: TiptapInputProps,
  ref: ForwardedRef<TextInput>
) {
  const inputRef = useRef<TextInput>(null);

  const { editor } = useInputEditorSetup({
    onChange,
    content,
  });

  useImperativeHandle(ref, () => inputRef.current!);

  return <RichText cacheEnabled editor={editor} />;
}

const TiptapInput = forwardRef(TiptapInputComponent);
export default TiptapInput;
