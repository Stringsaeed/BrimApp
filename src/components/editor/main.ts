import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";

export type EditorState = {
  html: string;
  canBold: boolean;
  canItalic: boolean;
  canStrike: boolean;
  canSinkListItem: boolean;
  canLiftListItem: boolean;
  isBulletListActive: boolean;
  isBoldActive: boolean;
  isItalicActive: boolean;
  isStrikeActive: boolean;
};

export type WebViewMessage =
  | {
      kind: "editorStateUpdate";
      payload: EditorState;
    }
  | { kind: "editorInitialised" };

function sendMessageFromWebView(params: WebViewMessage) {
  (window as any).ReactNativeWebView?.postMessage(JSON.stringify(params));
}

function getEditorState(editor: Editor): EditorState {
  return {
    // @ts-expect-error
    canStrike: editor.can().chain().focus().toggleStrike().run(),
    // @ts-expect-error
    canItalic: editor.can().chain().focus().toggleItalic().run(),
    // @ts-expect-error
    canBold: editor.can().chain().focus().toggleBold().run(),
    canLiftListItem: editor.can().liftListItem("listItem"),
    canSinkListItem: editor.can().sinkListItem("listItem"),
    isBulletListActive: editor.isActive("bulletList"),
    isStrikeActive: editor.isActive("strike"),
    isItalicActive: editor.isActive("italic"),
    isBoldActive: editor.isActive("bold"),
    html: editor.getHTML(),
  };
}

const editor = new Editor({
  onSelectionUpdate: ({ editor }) => {
    sendMessageFromWebView({
      payload: getEditorState(editor),
      kind: "editorStateUpdate",
    });
  },
  onUpdate: ({ editor }) => {
    sendMessageFromWebView({
      payload: getEditorState(editor),
      kind: "editorStateUpdate",
    });
  },
  onCreate: () => {
    sendMessageFromWebView({ kind: "editorInitialised" });
  },
  element: document.getElementById("editor")!,
  extensions: [StarterKit],
});

type EditorAction =
  | "toggleBold"
  | "toggleItalic"
  | "toggleStrike"
  | "toggleListItem"
  | "sinkListItem"
  | "liftListItem";

const editorActions: Record<EditorAction, VoidFunction> = {
  sinkListItem: () => editor.chain().focus().sinkListItem("listItem").run(),
  liftListItem: () => editor.chain().focus().liftListItem("listItem").run(),
  // @ts-expect-error
  toggleListItem: () => editor.chain().focus().toggleBulletList().run(),
  // @ts-expect-error
  toggleStrike: () => editor.chain().focus().toggleStrike().run(),
  // @ts-expect-error
  toggleItalic: () => editor.chain().focus().toggleItalic().run(),
  // @ts-expect-error
  toggleBold: () => editor.chain().focus().toggleBold().run(),
};

export type NativeMessage =
  | { kind: "action"; payload: EditorAction }
  | { kind: "editor"; payload: "focus" | "blur" }
  | { kind: "initialContent"; payload: string };

function handleMessageEvent(event: MessageEvent | Event) {
  const message: { data: string } = event as { data: string };
  const nativeMessage: NativeMessage = JSON.parse(message.data);
  if (nativeMessage.kind === "action") {
    const fn = editorActions[nativeMessage.payload];
    fn();
  }
  if (nativeMessage.kind === "initialContent") {
    editor.commands.setContent(nativeMessage.payload);
  }
  if (nativeMessage.kind === "editor") {
    if (nativeMessage.payload === "focus") {
      editor.commands.focus();
    }
    if (nativeMessage.payload === "blur") {
      editor.commands.blur();
    }
  }
}

window.addEventListener("message", handleMessageEvent);

document.addEventListener("message", handleMessageEvent);
