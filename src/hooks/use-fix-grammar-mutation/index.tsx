import { useMutation } from "@tanstack/react-query";
import {
  LLAMA3_2_1B,
  LLAMA3_2_TOKENIZER,
  LLAMA3_2_TOKENIZER_CONFIG,
  Message,
  useLLM,
} from "react-native-executorch";

import { Sentry } from "@/services";

export default function useFixGrammarMutation() {
  const llm = useLLM({
    tokenizerConfigSource: LLAMA3_2_TOKENIZER_CONFIG,
    tokenizerSource: LLAMA3_2_TOKENIZER,
    modelSource: LLAMA3_2_1B,
  });

  const fixGrammar = async (text: string) => {
    const chat: Message[] = [
      {
        content:
          "You are a helpful assistant that fixes grammar in text. You will be given a text in markdown format and you will need to fix the grammar. You will need to return the fixed text.",
        role: "system",
      },
      {
        content: text,
        role: "user",
      },
    ];

    await llm.generate(chat);

    return llm.response;
  };

  return useMutation({
    onError(error, variables, context) {
      Sentry.captureException(error, {
        extra: {
          variables,
          context,
        },
      });
    },
    mutationFn: fixGrammar,
    retry: 3,
  });
}
