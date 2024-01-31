import { useMutation } from "@tanstack/react-query";

import { rephraseSentencesAPI } from "services/ai";

export default function useRephraseSentenceMutation() {
  return useMutation({
    mutationFn: rephraseSentencesAPI,
    retry: 3,
  });
}
