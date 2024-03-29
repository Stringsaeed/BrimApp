import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { ForwardedRef, Fragment } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Form, Label } from "tamagui";
import { z } from "zod";

import BottomSheet from "components/bottom-sheet";
import BottomSheetInput from "components/bottom-sheet-input";
import FieldError from "components/field-error";
import { useUserAccent } from "hooks";

// import { Auth } from "services";

const updateAccountSchema = z.union([
  z.object({
    displayName: z.string().min(3).max(30),
  }),
  z.object({
    email: z.string().email(),
  }),
]);
type KeysOfUnion<T> = T extends T ? keyof T : never;

type UpdateAccountSchema = z.infer<typeof updateAccountSchema>;

interface Props {
  type: KeysOfUnion<UpdateAccountSchema>;
}

function UpdateAccountSheetComponent(
  { type }: Props,
  sheetRef?: ForwardedRef<BottomSheetModal>
) {
  const { accent } = useUserAccent();
  const { handleSubmit, control } = useForm<UpdateAccountSchema>({
    defaultValues: { [type]: "" },
  });

  const onSubmit = handleSubmit((data) => {
    if ("displayName" in data) {
      // Auth.updateProfile({
      //   displayName: data.displayName,
      // });
    } else if ("email" in data) {
      // Auth.updateEmail(data.email);
    }
  });

  return (
    <BottomSheet ref={sheetRef}>
      <Form space="$4" minHeight={100} onSubmit={onSubmit}>
        {type === "displayName" ? (
          <>
            <Controller
              name={type}
              control={control}
              render={({ fieldState: { error }, field }) => (
                <Fragment>
                  <Label htmlFor="displayName">Display Name</Label>
                  <BottomSheetInput
                    id="displayName"
                    autoComplete="name"
                    textContentType="name"
                    inputMode="text"
                    placeholder="Display Name"
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                  />
                  <FieldError message={error?.message} />
                </Fragment>
              )}
            />
          </>
        ) : type === "email" ? (
          <>
            <Controller
              name={type}
              control={control}
              render={({ fieldState: { error }, field }) => (
                <Fragment>
                  <Label htmlFor="email">Display Name</Label>
                  <BottomSheetInput
                    id="email"
                    autoComplete="email"
                    textContentType="emailAddress"
                    inputMode="email"
                    placeholder="Email"
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                  />
                  <FieldError message={error?.message} />
                </Fragment>
              )}
            />
          </>
        ) : null}
        <Form.Trigger asChild>
          <Button bg={`$${accent}`}>Update</Button>
        </Form.Trigger>
      </Form>
    </BottomSheet>
  );
}

const UpdateAccountSheet = React.forwardRef(UpdateAccountSheetComponent);
export default UpdateAccountSheet;
