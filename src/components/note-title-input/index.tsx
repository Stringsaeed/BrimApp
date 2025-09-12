import { useFormikContext } from "formik";
import React, { ForwardedRef } from "react";
import { TextInput } from "react-native";
import { Input, useTheme } from "tamagui";

import { useUserAccent } from "@/hooks";
import { NoteFormValues } from "@/hooks/use-note-form";

import { NoteTitleInputProps } from "./type";

function NoteTitleInputComponent(
  props: NoteTitleInputProps,
  ref: ForwardedRef<TextInput>
) {
  const theme = useTheme();
  const { accent } = useUserAccent();
  const { handleChange, handleBlur, values } =
    useFormikContext<NoteFormValues>();

  return (
    <Input
      ref={ref}
      borderWidth={0}
      accessibilityLabel="Text input field"
      placeholder="Wanna title your note? 😒"
      value={values.title}
      onChangeText={handleChange("title")}
      onBlur={handleBlur("title")}
      verticalAlign="center"
      fontSize="$7"
      fontWeight="bold"
      lineHeight={undefined}
      cursorColor={theme[accent]?.val}
      selectionColor={theme[accent]?.val}
      unstyled
      px="$3"
      py="$2.5"
      color="$gray12"
      {...props}
    />
  );
}

const NoteTitleInput = React.forwardRef(NoteTitleInputComponent);
export default NoteTitleInput;
