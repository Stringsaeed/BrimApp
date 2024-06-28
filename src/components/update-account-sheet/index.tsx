import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { ForwardedRef, Fragment, useImperativeHandle } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInputProps } from "react-native";
import { Button, Form, Label } from "tamagui";
import { z } from "zod";

import BottomSheet from "components/bottom-sheet";
import BottomSheetInput from "components/bottom-sheet-input";
import FieldError from "components/field-error";
import { useUserAccent } from "hooks";
import supabaseClient from "services/supabase";

// import { Auth } from "services";

const updateAccountSchema = z.union([
  z.object({
    displayName: z.string().min(3).max(30),
  }),
  z.object({
    email: z.string().email(),
  }),
  z.object({
    phone: z.string().min(10).max(15),
  }),
]);
type KeysOfUnion<T> = T extends T ? keyof T : never;

type UpdateAccountSchema = z.infer<typeof updateAccountSchema>;

interface Props {
  type: KeysOfUnion<UpdateAccountSchema>;
  defaultValue: string;
}

const fieldsMap = {
  displayName: {
    inputProps: {
      placeholder: "Display Name",
      textContentType: "name",
      autoComplete: "name",
      inputMode: "text",
    } satisfies TextInputProps,
    label: "Display Name",
    id: "displayName",
  },
  phone: {
    inputProps: {
      textContentType: "telephoneNumber",
      placeholder: "Phone Number",
      autoComplete: "tel",
      inputMode: "tel",
    } satisfies TextInputProps,
    label: "Phone Number",
    id: "phone",
  },
  email: {
    inputProps: {
      textContentType: "emailAddress",
      autoComplete: "email",
      placeholder: "Email",
      inputMode: "email",
    } satisfies TextInputProps,
    label: "Email",
    id: "email",
  },
};

function UpdateAccountSheetComponent(
  { defaultValue, type }: Props,
  sheetRef?: ForwardedRef<BottomSheetModal>
) {
  const innerRef = React.useRef<BottomSheetModal>(null);
  const { accent } = useUserAccent();
  const { inputProps, label, id } = fieldsMap[type];
  const { handleSubmit, control } = useForm<UpdateAccountSchema>({
    defaultValues: { [type]: defaultValue },
  });

  const onSubmit = handleSubmit(async (data) => {
    if ("displayName" in data) {
      const result = await supabaseClient.auth.updateUser({
        data: {
          displayName: data.displayName,
        },
      });

      if (result.error) {
        return result.error;
      }

      innerRef?.current?.dismiss();
    } else if ("email" in data) {
      const result = await supabaseClient.auth.updateUser({
        email: data.email,
      });

      if (result.error) {
        return result.error;
      }

      innerRef?.current?.dismiss();
    } else if ("phone" in data) {
      const result = await supabaseClient.auth.updateUser({
        phone: data.phone,
      });

      if (result.error) {
        return result.error;
      }

      innerRef?.current?.dismiss();
    }
  });

  useImperativeHandle(sheetRef, () => innerRef.current as BottomSheetModal);

  return (
    <BottomSheet ref={innerRef}>
      <Form space="$4" minHeight={100} onSubmit={onSubmit}>
        <Controller
          name={type}
          control={control}
          render={({ fieldState: { error }, field }) => (
            <Fragment>
              <Label htmlFor={id}>{label}</Label>
              <BottomSheetInput
                id={id}
                {...inputProps}
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
              />
              <FieldError message={error?.message} />
            </Fragment>
          )}
        />

        <Form.Trigger asChild>
          <Button bg={`$${accent}`}>Update</Button>
        </Form.Trigger>
      </Form>
    </BottomSheet>
  );
}

const UpdateAccountSheet = React.forwardRef(UpdateAccountSheetComponent);
export default UpdateAccountSheet;
