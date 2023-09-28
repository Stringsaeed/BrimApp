import { useFormikContext } from "formik";
import debounce from "lodash.debounce";
import { useCallback, useEffect } from "react";

interface AutoSaveFormikProps {
  debounceMs?: number;
}

export default function AutoSaveFormik({
  debounceMs = 1000,
}: AutoSaveFormikProps) {
  const { submitForm, values, dirty } = useFormikContext<{
    note: string;
    title: string;
  }>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSubmit = useCallback(debounce(submitForm, debounceMs), [
    submitForm,
    debounceMs,
  ]);

  useEffect(() => {
    dirty && debouncedSubmit();
  }, [debouncedSubmit, dirty, values.note, values.title]);

  return null;
}
