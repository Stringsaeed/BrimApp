import { TextInputProps } from "react-native";

export interface TiptapInputProps {
  content: string;
  onChange: (content: string) => void;
  onBlur: TextInputProps["onBlur"];
}
