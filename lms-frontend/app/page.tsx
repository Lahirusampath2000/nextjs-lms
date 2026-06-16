import Image from "next/image";
import Herosection from "@/components/Herosection";
import Featured from "@/components/Featured";
import Teachers from "@/components/Teachers";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans ">
      <Herosection />
      <Featured />
      <Teachers />
      <Footer />
    
    </div>
  );
}
