import { useMutation } from "@tanstack/react-query";

import { fixGrammarAPI } from "@/services/ai";

export default function useFixGrammarMutation() {
  return useMutation({
    mutationFn: fixGrammarAPI,
    retry: 3,
  });
}
