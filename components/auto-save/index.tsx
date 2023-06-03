import { useFormikContext } from "formik";
import React, { useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
import { Stack, Paragraph } from "tamagui";

interface AutoSaveFormikProps {
  debounceMs?: number;
}

export default function AutoSaveFormik({
  debounceMs = 1000,
}: AutoSaveFormikProps) {
  const { submitForm, values, isSubmitting, submitCount } = useFormikContext<{
    note: string;
  }>();

  const debouncedSubmit = useMemo(
    () =>
      debounce(() => {
        submitForm();
      }, debounceMs),
    [submitForm, debounceMs]
  );

  useEffect(() => debouncedSubmit, [debouncedSubmit, values.note]);

  if (isSubmitting) {
    return (
      <Stack>
        <Paragraph>Saving...</Paragraph>
      </Stack>
    );
  }

  if (submitCount > 0) {
    return (
      <Stack>
        <Paragraph>Saved {submitCount}</Paragraph>
      </Stack>
    );
  }

  return null;
}
