import React from "react";
import WebView from "react-native-webview";

export default function TipTapEditor() {
  return (
    <WebView
      originWhitelist={["*"]}
      style={{ flex: 1 }}
      source={{ uri: "https://tiptap.dev/examples/markdown-shortcuts" }}
    />
  );
}
