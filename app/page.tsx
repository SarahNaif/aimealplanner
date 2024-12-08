import Link from "next/link";
import IconGrid from "@/components/ui/IconGrid/IconGrid";
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
   <div className="h-screen w-full dark:bg-zinc-950 bg-white dark:bg-grid-white/[0.1] bg-grid-black/[0.2] relative flex items-center justify-center overflow-hidden">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <IconGrid/>
      <div className="flex flex-col text-center gap-10  -translate-y-16">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  AI-Powered Meal Planning Made Easy
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Personalized meal plans, grocery lists, and recipes tailored to your preferences and dietary needs.
                </p>
              </div>
              <div className="space-x-4">
              <Link href={"/meal-planner"}>
                <Button className="shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_rgba(93,93,93,23%)] px-8 py-2 rounded-full font-light transition duration-200 ease-linear">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      </div>
  );
}
