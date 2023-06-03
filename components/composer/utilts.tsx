import React from "react";
import { actions } from "react-native-pell-rich-editor";
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

interface ToolbarIconMapper {
  [key: string]: (props: { tintColor: string }) => JSX.Element;
}

export function getToolbarIconMapper(): ToolbarIconMapper {
  return {
    [actions.setBold]: ({ tintColor }) => <TextBolder color={tintColor} />,
    [actions.setItalic]: ({ tintColor }) => <TextItalic color={tintColor} />,
    [actions.setStrikethrough]: ({ tintColor }) => (
      <TextStrikethrough color={tintColor} />
    ),
    [actions.code]: ({ tintColor }) => <Code color={tintColor} />,
    [actions.insertLink]: ({ tintColor }) => <Link color={tintColor} />,
    [actions.insertBulletsList]: ({ tintColor }) => (
      <ListBullets color={tintColor} />
    ),
    [actions.insertOrderedList]: ({ tintColor }) => (
      <ListNumbers color={tintColor} />
    ),
    [actions.setUnderline]: ({ tintColor }) => (
      <TextUnderline color={tintColor} />
    ),
    [actions.line]: ({ tintColor }) => <LineSegment color={tintColor} />,
  };
}
