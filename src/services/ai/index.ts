import axios from "axios";

export type HuggingFaceAIType = "fixGrammar" | "rephraseSentences";

const huggingFaceApi = axios.create({
  headers: {
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_HUGGING_FACE_API_KEY}`,
  },
  baseURL: "https://api-inference.huggingface.co/models",
});

const fixGrammarAPIPrompt = (html: string) =>
  `Fix sentences (the text provided will have html tags): ${html}`;

export async function fixGrammarAPI(text: string) {
  console.log("fixGrammarAPI", text);
  const response = await huggingFaceApi.post<[{ generated_text: string }]>(
    `/vennify/t5-base-grammar-correction`,
    {
      inputs: fixGrammarAPIPrompt(text),
    }
  );

  console.log(response.data[0].generated_text);

  return response.data[0].generated_text;
}

export async function rephraseSentencesAPI(text: string) {
  const response = await huggingFaceApi.post<[{ generated_text: string }]>(
    `/google/flan-t5-xxl`,
    {
      inputs: text,
    }
  );

  return response.data[0].generated_text;
}
