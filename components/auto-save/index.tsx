import { useFormikContext } from "formik";
import React, { useCallback, useEffect } from "react";
import debounce from "lodash.debounce";
import { Stack as RouterStack } from "expo-router";

interface AutoSaveFormikProps {
  debounceMs?: number;
}

export default function AutoSaveFormik({
  debounceMs = 1000,
}: AutoSaveFormikProps) {
  const { submitForm, dirty, values, isSubmitting, submitCount } =
    useFormikContext<{
      note: string;
    }>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSubmit = useCallback(debounce(submitForm, debounceMs), [
    submitForm,
    debounceMs,
  ]);

  useEffect(() => {
    dirty && debouncedSubmit();
  }, [debouncedSubmit, dirty, values.note]);

  return (
    <RouterStack.Screen
      options={{
        title: isSubmitting
          ? "Saving..."
          : submitCount > 0
          ? `Saved (${submitCount})`
          : "",
      }}
    />
  );
}
