import SqBackGrounds from "@/components/ui/Background/SqBackGrounds";
import Link from "next/link";
import {Button} from "@/components/ui/Button/Button"
import IconGrid from "@/components/ui/IconGrid/IconGrid";
export default function Home() {
  return (
    <SqBackGrounds>
       <IconGrid />
      <div className="flex flex-col text-center gap-10  -translate-y-16">

      <div className=" text-8xl sm:text-8xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        MEAL PREP AI
      </div>
      
      <Link href={"/meal-planner"}>
          <Button  className="shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_rgba(93,93,93,23%)] px-8 py-2 bg-[#fff] text-neutral-500 rounded-full font-light transition duration-200 ease-linear">
            Create  Now
          </Button>
        </Link>
      </div>
     
    </SqBackGrounds>


  );
}
