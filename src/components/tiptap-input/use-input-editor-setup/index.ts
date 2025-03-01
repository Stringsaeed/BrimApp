import {
  darkEditorTheme,
  TenTapStartKit,
  useEditorBridge,
} from "@10play/tentap-editor";
import { Content } from "@tiptap/react";
import { useMemo } from "react";
import { useThemeName } from "tamagui";

import { editorCss } from "./css";

export const useInputEditorSetup = ({
  onChange,
  content,
}: {
  content: string;
  onChange: (content: string) => void;
}) => {
  const themeName = useThemeName();
  const isDark = themeName === "dark";

  const parsedContent = useMemo(() => {
    try {
      return JSON.parse(content) as Content;
    } catch {
      return content;
    }
  }, [content]);

  const editor = useEditorBridge({
    async onChange() {
      onChange(JSON.stringify(await editor.getJSON()));
    },
    bridgeExtensions: [...TenTapStartKit, ...editorCss(isDark)],
    theme: isDark ? darkEditorTheme : undefined,
    initialContent: parsedContent as object,
    avoidIosKeyboard: true,
    autofocus: true,
  });

  return {
    editor,
  };
};
