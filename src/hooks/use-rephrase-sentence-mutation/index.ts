import { useMutation } from "@tanstack/react-query";

import { rephraseSentencesAPI } from "services/ai";

export default function useRephraseSentenceMutation() {
  return useMutation(rephraseSentencesAPI, {
    retry: 3,
  });
}
