import axios from "axios";

import { config } from "config";

export type HuggingFaceAIType = "fixGrammar" | "rephraseSentences";

const huggingFaceApi = axios.create({
  headers: {
    Authorization: `Bearer ${config.huggingFaceApiKey}`,
  },
  baseURL: "https://api-inference.huggingface.co/models",
});

export async function fixGrammarAPI(text: string) {
  const response = await huggingFaceApi.post<[{ generated_text: string }]>(
    `/vennify/t5-base-grammar-correction`,
    {
      wait_for_model: true,
      inputs: text,
    }
  );

  return response.data[0].generated_text;
}

export async function rephraseSentencesAPI(text: string) {
  const response = await huggingFaceApi.post<[{ generated_text: string }]>(
    `/google/flan-t5-xxl`,
    {
      inputs: `rephrase: "${text}"`,
    }
  );

  return response.data[0].generated_text;
}
