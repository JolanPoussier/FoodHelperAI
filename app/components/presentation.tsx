import Image from "next/image";
import robotPic from "@/public/robotPic.png";

export default function Presentation() {
  return (
    <div className="w-full px-6 pt-36 flex flex-col sm:flex-row sm:items-center">
      <Image alt="Fridge-robot" src={robotPic} className="w-full sm:w-1/3" />
      <div className="sm:ml-6 text-justify">
        Pas d&apos;inspiration devant votre frigo ? AI Cooker propose une
        alternative facile et rapide. Entrez simplement le contenu de votre
        réfrigérateur et de vos placards et laissez la créativité du cuisinier
        vous guider. Plus qu&apos;à saisir son couteau !
        <br />
        Ajoutez un maximum d&apos;ingrédients pour des recettes plus
        sophistiquées et variées.
      </div>
    </div>
  );
}
