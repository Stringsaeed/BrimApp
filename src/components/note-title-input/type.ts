import { Ref } from "react";
import { TextInput } from "react-native";
import { InputProps } from "tamagui";

export type NoteTitleInputProps = Partial<InputProps> & {
  ref?: Ref<TextInput> | null;
};
