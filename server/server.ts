/* eslint-disable no-console */
import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PromptTemplate } from "@langchain/core/prompts";
import Fastify from "fastify";

export type AIType = "fixGrammar" | "rephrase";

const apiKey = process.env.GEMINI_API_KEY || "";

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const promptTemplate = PromptTemplate.fromTemplate(`{directives}
text: {userText}`);

const promptDirectives = {
  fixGrammar: `Fix grammar in this text:`,
  rephrase: `rephrase this text:`,
};

const getQuery = async (_type: AIType, _text: string) => {
  console.log("type: ", _type);
  console.log("text: ", _text);

  const prompt = await promptTemplate.format({
    format: _type === "fixGrammar" ? "fix grammar" : "rephrase sentences",
    directives: promptDirectives[_type],
    userText: _text,
    context: _text,
  });
  console.log("prompt: ", prompt);

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  console.log("result: ", text);
  return text;
};

const server = Fastify();

server.post<{
  Body: "{ type: AIType; text: string }";
}>("/", async (request) => {
  const body: { type: AIType; text: string } = JSON.parse(request.body);
  if (!body.text) {
    return { result: body.text };
  }
  console.log("body: ", body);
  console.log("type of body: ", typeof body);
  const result = await getQuery(body.type, body.text);
  return { result };
});

server.listen({ host: "0.0.0.0", port: 3000 }, (err, address) => {
  if (err) {
    process.exit(1);
  }
  // eslint-disable-next-line no-console
  console.log(`Server listening at ${address}`);
});
