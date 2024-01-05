"use client";

import { useState } from "react";

export default function Home() {
  const [dataForm, setDataForm] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDataChange = (data: string) => {
    setDataForm(data);
  };

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    const result = await fetch("/api/foodrequest", {
      method: "POST",
      body: JSON.stringify({ dataForm }),
    });

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
      chunk.replace("\n", "<br/>");
      setRecipe((prev) => prev + chunk);
      await readChunk();
    };

    await readChunk();
  };

  return (
    <main className="h-full relative w-4/5 mx-auto bg-grey-400">
      <h1 className="text-center pt-3 text-3xl font-bold">
        Préparez votre repas
      </h1>
      <div className="w-full pt-4 flex justify-center">
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
      <div className="w-full bg-blue-100">{recipe}</div>
    </main>
  );
}
