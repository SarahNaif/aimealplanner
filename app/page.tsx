import SqBackGrounds from "@/components/ui/Background/SqBackGrounds";
import Image from "next/image";

export default function Home() {
  return (
    <SqBackGrounds>
      <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        Backgrounds
      </p>
    </SqBackGrounds>


  );
}
