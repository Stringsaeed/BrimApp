import { useFormikContext } from "formik";
import React, { ForwardedRef } from "react";
import { TextInput } from "react-native";
import { Input } from "tamagui";

import { NoteFormValues } from "hooks/use-note-form";

import { NoteTitleInputProps } from "./type";

function NoteTitleInputComponent(
  props: NoteTitleInputProps,
  ref: ForwardedRef<TextInput>
) {
  const { handleChange, handleBlur, values } =
    useFormikContext<NoteFormValues>();

  return (
    <Input
      ref={ref}
      px="$4"
      py="$2"
      borderWidth={0}
      borderBottomWidth={1}
      accessibilityLabel="Text input field"
      placeholder="Wanna title your note? 😒"
      value={values.title}
      onChangeText={handleChange("title")}
      onBlur={handleBlur("title")}
      textAlignVertical="center"
      {...props}
    />
  );
}

const NoteTitleInput = React.forwardRef(NoteTitleInputComponent);
export default NoteTitleInput;
