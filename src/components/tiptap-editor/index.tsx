import React, { useRef, useState } from "react";
import WebView from "react-native-webview";

import editorHtml from "components/editor/dist/index.html";
import type {
  EditorState,
  NativeMessage,
  WebViewMessage,
} from "components/editor/main";

export default function TipTapEditor({ content }: { content: string }) {
  const webViewRef = useRef<WebView>(null);
  const [, setEditorState] = useState<EditorState>({
    isBulletListActive: false,
    canLiftListItem: false,
    canSinkListItem: false,
    isStrikeActive: false,
    isItalicActive: false,
    isBoldActive: false,
    canStrike: false,
    canItalic: false,
    canBold: false,
    html: "",
  });

  // useEffect(() => {
  //   sendMessageToWebView({ kind: "initialContent", payload: content });
  // }, [content]);

  function sendMessageToWebView(message: NativeMessage) {
    webViewRef?.current?.postMessage(JSON.stringify(message));
  }

  return (
    <WebView
      originWhitelist={["*"]}
      style={{ flex: 1 }}
      onMessage={(event) => {
        const webViewMessage = JSON.parse(
          event.nativeEvent.data
        ) as WebViewMessage;

        if (webViewMessage.kind === "editorStateUpdate") {
          setEditorState(webViewMessage.payload);
        }
        if (webViewMessage.kind === "editorInitialised") {
          sendMessageToWebView({
            kind: "initialContent",
            payload: content,
          });
        }
      }}
      source={{ html: `${editorHtml}` }}
    />
  );
}
