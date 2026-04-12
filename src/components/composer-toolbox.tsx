import { BlurView } from "expo-blur";
import { SymbolView } from "expo-symbols";
import {
  EnrichedTextInputInstance,
  OnChangeStateEvent,
} from "react-native-enriched";
import { KeyboardToolbar } from "react-native-keyboard-controller";
import { ScrollView } from "react-native-reanimated/src/Animated";
import { Button, useTheme, XGroup } from "tamagui";
import tinycolor from "tinycolor2";
import useUserAccent from "@/hooks/use-user-accent";

const STYLE_ITEMS = [
  {
    name: "bold",
    icon: "bold",
  },
  {
    name: "italic",
    icon: "italic",
  },
  {
    name: "underline",
    icon: "underline",
  },
  {
    name: "strikethrough",
    icon: "strikethrough",
  },
  {
    name: "quote",
    icon: "quote.opening",
  },
  {
    name: "code-block",
    icon: "curlybraces.square",
  },
  {
    name: "unordered-list",
    icon: "list.dash",
  },
  {
    name: "ordered-list",
    icon: "list.number",
  },
  {
    name: "checkbox-list",
    icon: "checkmark.square",
  },
] as const;

type Item = (typeof STYLE_ITEMS)[number];

export default function ComposerToolbox({
  editorRef,
  stylesState,
}: {
  editorRef: React.RefObject<EnrichedTextInputInstance | null>;
  stylesState: OnChangeStateEvent;
}) {
  const { accent } = useUserAccent();
  const theme = useTheme();
  const accentColor = tinycolor(theme[accent]?.val).toHex();

  const handlePress = (item: Item) => {
    const currentRef = editorRef?.current;
    if (!currentRef) return;

    switch (item.name) {
      case "bold":
        editorRef.current?.toggleBold();
        break;
      case "italic":
        editorRef.current?.toggleItalic();
        break;
      case "underline":
        editorRef.current?.toggleUnderline();
        break;
      case "strikethrough":
        editorRef.current?.toggleStrikeThrough();
        break;
      case "code-block":
        editorRef?.current?.toggleCodeBlock();
        break;
      case "quote":
        editorRef?.current?.toggleBlockQuote();
        break;
      case "unordered-list":
        editorRef.current?.toggleUnorderedList();
        break;
      case "ordered-list":
        editorRef.current?.toggleOrderedList();
        break;
      case "checkbox-list":
        editorRef.current?.toggleCheckboxList(true);
        break;
    }
  };

  const isDisabled = (item: Item) => {
    switch (item.name) {
      case "bold":
        return stylesState.bold.isBlocking;
      case "italic":
        return stylesState.italic.isBlocking;
      case "underline":
        return stylesState.underline.isBlocking;
      case "strikethrough":
        return stylesState.strikeThrough.isBlocking;
      case "code-block":
        return stylesState.codeBlock.isBlocking;
      case "quote":
        return stylesState.blockQuote.isBlocking;
      case "unordered-list":
        return stylesState.unorderedList.isBlocking;
      case "ordered-list":
        return stylesState.orderedList.isBlocking;
      case "checkbox-list":
        return stylesState.checkboxList.isBlocking;
      default:
        return false;
    }
  };

  const isActive = (item: Item) => {
    switch (item.name) {
      case "bold":
        return stylesState.bold.isActive;
      case "italic":
        return stylesState.italic.isActive;
      case "underline":
        return stylesState.underline.isActive;
      case "strikethrough":
        return stylesState.strikeThrough.isActive;
      case "quote":
        return stylesState.blockQuote.isActive;
      case "unordered-list":
        return stylesState.unorderedList.isActive;
      case "ordered-list":
        return stylesState.orderedList.isActive;
      case "checkbox-list":
        return stylesState.checkboxList.isActive;
      default:
        return false;
    }
  };

  return (
    <KeyboardToolbar opacity="4F">
      <KeyboardToolbar.Background>
        <BlurView
          intensity={32}
          tint="systemChromeMaterial"
          style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}
        />
      </KeyboardToolbar.Background>
      <KeyboardToolbar.Content>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <XGroup>
            {STYLE_ITEMS.map((item) => (
              <XGroup.Item key={item.name}>
                <Button
                  onPress={() => handlePress(item)}
                  disabled={isDisabled(item)}
                  bg={isActive(item) ? "$backgroundPress" : undefined}
                  icon={(props) => (
                    <SymbolView
                      name={item.icon}
                      size={props.size}
                      tintColor={props.color || accentColor}
                    />
                  )}
                />
              </XGroup.Item>
            ))}
          </XGroup>
        </ScrollView>
      </KeyboardToolbar.Content>
    </KeyboardToolbar>
  );
}
