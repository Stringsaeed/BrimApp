import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useFormikContext } from "formik";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useMemo } from "react";

import { useNotesContext } from "contexts";

interface AutoSaveFormikProps {
  debounceMs?: number;
  id: string;
}

export default function AutoSaveFormik({
  debounceMs = 1000,
  id,
}: AutoSaveFormikProps) {
  const { notes } = useNotesContext();
  const note = useMemo(() => notes.find((note) => note.id === id), [id, notes]);

  const { submitForm, values, dirty } = useFormikContext<{
    note: string;
    title: string;
  }>();

  const navigation = useNavigation();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSubmit = useCallback(debounce(submitForm, debounceMs), [
    submitForm,
    debounceMs,
  ]);

  useEffect(() => {
    dirty && debouncedSubmit();
  }, [debouncedSubmit, dirty, values.note, values.title]);

  useFocusEffect(
    useCallback(() => {
      const title = values.title || note?.title;
      const isChanged =
        note?.note !== values.note || note?.title !== values.title;

      const headerTitle = [title, dirty && isChanged ? "*" : ""]
        .filter(Boolean)
        .join(" ");

      navigation.setOptions({
        headerTitle,
      });
    }, [dirty, navigation, note?.note, note?.title, values.note, values.title])
  );

  return null;
}
