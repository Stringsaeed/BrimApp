import axios from "axios";
import { match } from "ts-pattern";

export type HuggingFaceAIType = "fixGrammar" | "rephraseSentences";

const huggingFaceApi = axios.create({
  headers: {
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_HUGGING_FACE_API_KEY}`,
  },
  baseURL: "https://api-inference.huggingface.co/models",
});

async function fixGrammarAPI(text: string) {
  const response = await huggingFaceApi.post<[{ generated_text: string }]>(
    `/vennify/t5-base-grammar-correction`,
    {
      inputs: text,
    }
  );

  return response.data[0].generated_text;
}

async function rephraseSentencesAPI(text: string) {
  const response = await huggingFaceApi.post<[{ generated_text: string }]>(
    `/unikei/t5-base-split-and-rephrase`,
    {
      inputs: text,
    }
  );

  return response.data[0].generated_text;
}

export default function huggingFaceAI(type: HuggingFaceAIType, text: string) {
  return match(type)
    .with("fixGrammar", () => fixGrammarAPI(text))
    .with("rephraseSentences", () => rephraseSentencesAPI(text))
    .exhaustive();
}
