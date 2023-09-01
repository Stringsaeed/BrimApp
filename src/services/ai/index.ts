import axios, { isAxiosError } from "axios";

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

export default async function huggingFaceAI(_: "fixGrammar", text: string) {
  try {
    return fixGrammarAPI(text);
  } catch (err) {
    if (isAxiosError(err)) {
      console.log(err.response?.data);
    }

    throw err;
  }
}
