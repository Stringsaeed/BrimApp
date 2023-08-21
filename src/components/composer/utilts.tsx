import { FormatType } from "@ankipro/react-native-rich-text/src";
import {
  // Code,
  // Link,
  ListBullets,
  ListNumbers,
  TextBolder,
  TextItalic,
  TextStrikethrough,
  TextUnderline,
  // LineSegment,
} from "phosphor-react-native";
import React from "react";

interface ToolbarIconMapper {
  [key: string]: (props: { tintColor: string }) => JSX.Element;
}

export function getToolbarIconMapper(): ToolbarIconMapper {
  return {
    [FormatType.strike]: ({ tintColor }) => (
      <TextStrikethrough color={tintColor} />
    ),
    [FormatType.underline]: ({ tintColor }) => (
      <TextUnderline color={tintColor} />
    ),
    [FormatType.orderedList]: ({ tintColor }) => (
      <ListNumbers color={tintColor} />
    ),
    [FormatType.bulletList]: ({ tintColor }) => (
      <ListBullets color={tintColor} />
    ),
    [FormatType.italic]: ({ tintColor }) => <TextItalic color={tintColor} />,
    [FormatType.bold]: ({ tintColor }) => <TextBolder color={tintColor} />,
    // [FormatType.]: ({ tintColor }) => <LineSegment color={tintColor} />,
    // [FormatType]: ({ tintColor }) => <Link color={tintColor} />,
    // [actions.code]: ({ tintColor }) => <Code color={tintColor} />,
  };
}

export const FontFamilyStylesheet = `
@font-face {
  font-family: Montserrat; 
  src: url("https://github.com/Stringsaeed/fonts-cdn/raw/main/Montserrat-VariableFont_wght.ttf") format('truetype');
  font-style: normal;
  font-display: swap;
}
`;
