import Image from "next/image";
import logo from "@/public/logo3.png";

export default function Header() {
  return (
    <div className="h-28 w-full bg-secondary fixed z-30 top-0 left-0 shadow-lg flex justify-center">
      <Image
        src={logo}
        alt="logo of the website"
        height={180}
        className="-mt-6 -mb-8"
      />
    </div>
  );
}
