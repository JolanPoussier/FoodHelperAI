import { openai } from "@/app/src/lib/openai";
import { NextResponse } from "next/server";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const POST = async (req: Request) => {
  const { dataForm } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "assistant",
        content: `Ecris une recette étape par étape, avec étapes numérotées et quantités et temps bien précis`,
      },
      {
        role: "user",
        content: dataForm,
      },
    ],
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
};
