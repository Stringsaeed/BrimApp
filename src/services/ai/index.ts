import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "@/config/env";

const genAI = new GoogleGenerativeAI(config.geminiAPIKey);

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const promptTemplate = (directives: string, userText: string) =>
  `${directives} ${userText}`;

const promptDirectives = {
  fixGrammar: `Fix grammar in this text:`,
  rephrase: `rephrase this text:`,
};

type PromptDirectives = typeof promptDirectives;
type PromptType = keyof PromptDirectives;

const executeQuery = async (type: PromptType, text: string) => {
  const prompt = promptTemplate(promptDirectives[type], text);
  return (await model.generateContent(prompt)).response.text();
};

async function query(type: PromptType, text: string) {
  const data = await executeQuery(type, text);

  if (!data) {
    return text;
  }

  if (data === "NONE") {
    return text;
  }

  return data;
}

export async function rephraseSentencesAPI(text: string) {
  return await query("rephrase", text);
}
