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
      paddingHorizontal="$4"
      paddingVertical={0}
      borderWidth={0}
      borderBottomWidth={1}
      accessibilityLabel="Text input field"
      placeholder="Wanna title your note? 😒"
      value={values.title}
      onChangeText={handleChange("title")}
      onBlur={handleBlur("title")}
      textAlignVertical="center"
      fontSize="$8"
      lineHeight={undefined}
      // height={undefined}
      // minHeight="$10"
      // height="auto"
      {...props}
    />
  );
}

const NoteTitleInput = React.forwardRef(NoteTitleInputComponent);
export default NoteTitleInput;
