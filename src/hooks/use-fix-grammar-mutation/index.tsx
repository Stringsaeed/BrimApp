import { useMutation } from "@tanstack/react-query";

import { fixGrammarAPI } from "services/ai";

export default function useFixGrammarMutation() {
  return useMutation(fixGrammarAPI, {
    retry: 3,
  });
}
