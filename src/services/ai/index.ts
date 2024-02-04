import { GoogleGenerativeAI } from "@google/generative-ai";

import { config } from "config";

export type HuggingFaceAIType = "fixGrammar" | "rephraseSentences";

const genAI = new GoogleGenerativeAI(config.geminiAPIKey);

function generateContent(prompt: string, model: string = "gemini-pro") {
  return genAI.getGenerativeModel({ model }).generateContent(prompt);
}
const promptWrapping = {
  fixGrammar: (prompt: string) =>
    `Act as a professional copywriter and content Check the text for any grammatical or spelling or punctuation mistakes.Fix any grammatical or spelling or punctuation mistakes.Add punctuation if needed.Use the text content for context. "${prompt}"`,
  rephrase: (prompt: string) =>
    `Act as a professional copywriter and content creator.Re-write the text provided to be more concise and organized.Make sure the text is free of any grammatical or spelling or punctuation mistakes.Use the text content for context. "${prompt}"`,
};

export async function fixGrammarAPI(prompt: string) {
  const { response } = await generateContent(promptWrapping.fixGrammar(prompt));
  return response.text();
}

export async function rephraseSentencesAPI(text: string) {
  const { response } = await generateContent(promptWrapping.rephrase(text));
  return response.text();
}
