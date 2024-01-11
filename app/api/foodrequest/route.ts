import { openai } from "@/app/src/lib/openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const POST = async (req: Request) => {
  // Utile pour utilisation d'une API plus performante
  const systemPrompt = `
    Context:
    You are a professionnal french cooker. 
    You can create different recipes based on a list of ingredients.
    
    Goal:
    Generate a valid recipe write in French including a part or the totality of the ingredients in the given prompt.

    Criteria:
    * You have to be the more precise possible about quantities, and the different steps to create the recipe.
    * You have to write all cooking times in minutes 
    * You have to use only the ingredients given in the prompts, except for the aromatics, spices or optionnals ingredients. 
    * You have to respect the limited quantity of ingredients but you can use only a part of those if you dont need the totality.
    * You don't have to use all the different ingredients for the recipe. 
    * You have to take in consideration the number of persons, the time, and the kitchen equipment
    * You can add spices and aromatics without them to be in the prompt 
    * You have to write only the name of the recipe and the content of it 
    * First line HAS TO BE the name of the recipe
    * You can ONLY USE the kitchen equipment of the prompt
    * Don't skip a line between the different steps
    * Don't skip a after a recipe preparation step
    * Don't skip a line after a line that start with a number
    * You have to introduce the recipe with "Ingrédients:" for the ingredients, "Matériel nécessaire:" for the needed kitchen equipment and "Préparation:" for the different steps in this specific order. Dont skip a line after those lines.
    `;
  const { dataForm } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "assistant",
        content: systemPrompt,
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
