import { useMutation } from "@tanstack/react-query";

import huggingFaceAI from "services/ai";

export default function useFixGrammarMutation() {
  return useMutation((text: string) => huggingFaceAI("fixGrammar", text));
}
