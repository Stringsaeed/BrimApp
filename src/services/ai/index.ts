import axios from "axios";

export type HuggingFaceAIType = "fixGrammar" | "rephraseSentences";

const huggingFaceApi = axios.create({
  headers: {
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_HUGGING_FACE_API_KEY}`,
  },
  baseURL: "https://api-inference.huggingface.co/models",
});

export async function fixGrammarAPI(text: string) {
  const response = await huggingFaceApi.post<[{ generated_text: string }]>(
    `/HamadML/grammer_correction`,
    {
      inputs: text,
    }
  );

  return response.data[0].generated_text;
}

export async function rephraseSentencesAPI(text: string) {
  const response = await huggingFaceApi.post<[{ generated_text: string }]>(
    `/unikei/t5-base-split-and-rephrase`,
    {
      inputs: text,
    }
  );

  return response.data[0].generated_text;
}
