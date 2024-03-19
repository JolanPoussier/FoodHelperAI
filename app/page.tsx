import Header from "./components/header";
import Presentation from "./components/presentation";
import RecipeMain from "./components/recipeMain";

export default function Home() {
  return (
    <main className="h-full text-lg relative sm:w-4/5 md:w-2/3 max-w-[1000px] mx-auto text-gray-800">
      <Header />
      <Presentation />
      <RecipeMain />
      <div className="pb-6"></div>
    </main>
  );
}
