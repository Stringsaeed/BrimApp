import {
  Code,
  Link,
  ListBullets,
  ListNumbers,
  TextBolder,
  TextItalic,
  TextStrikethrough,
  TextUnderline,
  LineSegment,
} from "phosphor-react-native";
import React from "react";
import { actions } from "react-native-pell-rich-editor";

interface ToolbarIconMapper {
  [key: string]: (props: { tintColor: string }) => JSX.Element;
}

export function getToolbarIconMapper(): ToolbarIconMapper {
  return {
    [actions.setStrikethrough]: ({ tintColor }) => (
      <TextStrikethrough color={tintColor} />
    ),
    [actions.insertOrderedList]: ({ tintColor }) => (
      <ListNumbers color={tintColor} />
    ),
    [actions.insertBulletsList]: ({ tintColor }) => (
      <ListBullets color={tintColor} />
    ),
    [actions.setUnderline]: ({ tintColor }) => (
      <TextUnderline color={tintColor} />
    ),
    [actions.setItalic]: ({ tintColor }) => <TextItalic color={tintColor} />,
    [actions.setBold]: ({ tintColor }) => <TextBolder color={tintColor} />,
    [actions.line]: ({ tintColor }) => <LineSegment color={tintColor} />,
    [actions.insertLink]: ({ tintColor }) => <Link color={tintColor} />,
    [actions.code]: ({ tintColor }) => <Code color={tintColor} />,
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
