"use client";

import { useState } from "react";
import { formatRecipe } from "./src/utils/formatRecipe";

export default function Home() {
  const [dataForm, setDataForm] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDataChange = (data: string) => {
    setDataForm(data);
  };

  const handleClear = () => {
    setRecipe("");
  };

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    const result = await fetch("/api/foodrequest", {
      method: "POST",
      body: JSON.stringify({ dataForm }),
    });
    setDataForm("");

    const body = result.body;

    if (!body) {
      alert("Something went wrong");
      return;
    }

    const reader = body.getReader();

    const readChunk = async () => {
      const { done, value } = await reader.read();
      if (done) {
        setLoading(false);
        return;
      }

      const chunk = new TextDecoder().decode(value);
      setRecipe((prev) => prev + chunk);
      await readChunk();
    };

    await readChunk();
  };

  const formattedRecipe = formatRecipe(recipe);

  return (
    <main className="h-full relative w-4/5 mx-auto bg-grey-400">
      <h1 className="text-center pt-3 text-3xl font-bold">
        Préparez votre repas
      </h1>
      <div className="w-full pt-4 flex justify-center pb-6">
        <input
          value={dataForm}
          onChange={(e) => handleDataChange(e.target.value)}
          type="textarea"
          id="content"
          className="w-1/2 p-1 gap-4 rounded-md"
        ></input>
        <button
          onClick={() => handleSubmit()}
          className="bg-blue-600 rounded-md p-1 ml-3"
        >
          Envoyer
        </button>
      </div>
      <pre className=" w-full whitespace-pre-wrap overflow-wrap-break-word">
        {/* <div className="text-center text-2xl font-bold">
          {recipe.split("\n")[0]}
        </div> */}
        <span
          className="block"
          dangerouslySetInnerHTML={{ __html: formattedRecipe }}
        />

        {/* {recipe.substring(recipe.indexOf("\n") + 1)} */}
      </pre>
      <button
        onClick={() => handleClear()}
        className="bg-blue-600 rounded-md p-1 ml-3"
      >
        Nettoyer
      </button>
    </main>
  );
}
