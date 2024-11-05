
import Image from 'next/image'
import { Meal, Meals } from '@/components/types/types';
import { MdOutlineTimer } from "react-icons/md";
import { TbBowlSpoon } from "react-icons/tb";
import { LuChefHat } from "react-icons/lu";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from 'next/link';
import { useMealPlanStore } from '@/store/mealStore';

const CardRecipe : React.FC = () => {
    const currentRecipe = useMealPlanStore((state) => state.currentRecipe);
    if (!currentRecipe) {
        return <div>No recipe selected.</div>;
    }
    const { dishName, recipe: { ingredients, instructions } } = currentRecipe;
console.log(currentRecipe)
  return (
    <div className="relative z-44 flex w-[55rem] rounded-xl bg-zinc-900 border border-zinc-100/[0.2] text-gray-700 shadow-md">
    <div className="px-6 py-4 w-full">
        <div className="flex flex-row space-x-5  mb-8">

        
            <div className="flex-shrink-0">
                <Image
                    className="rounded-l-lg h-[300px] w-96"
                    width={300}
                    height={450}
                    src="https://shorturl.at/Efo0t"
                    alt=""
                />
            </div>

          
            <div className=" w-[calc(100%-300px)] overflow-y-auto p-6 flex flex-col justify-between gap-8">
                
                <div>
                <h2 className="font-semibold text-xl mb-4 text-slate-100">{dishName}</h2>
                    <h3 className="font-semibold text-xl mb-4 text-slate-100">Ingredients</h3>
                    <ul className="pl-8 text-slate-300 list-outside list-disc ">
                    {ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))} 
                    </ul>
                </div>

                
                <div className="flex gap-6 ml-7  self-start -mb-6  ">
                    <div className="flex flex-col items-center rounded-md gap-1  px-4 py-2 font-semibold  stroke-yellow-300">
                        <MdOutlineTimer className="w-5 h-5  text-slate-300" />
                        <span className="tracking-widest text-sm  text-slate-100">20 min</span>
                    </div>
                    <div className="flex flex-col items-center rounded-md gap-1  px-4 py-2 font-semibold  stroke-yellow-300">
                        <TbBowlSpoon className="w-5 h-5  text-slate-300" />
                        <span className="tracking-widest text-sm  text-slate-100">20 plate</span>
                    </div>
                    <div className="flex flex-col items-center rounded-md gap-1  px-4 py-2 font-semibold  stroke-yellow-300">
                        <LuChefHat className="w-5 h-5  text-slate-300" />
                        <span className="tracking-widest text-sm  text-slate-100">easy</span>
                    </div>
                </div>
              
            </div>
<Link href="/meal-details">
<FaArrowRightLong className="w-5 h-5  text-slate-600"/>
</Link>
           
        </div>

        <div className="py-3 px-3 text-slate-300">
        <ul className=" list-none pl-8 text-slate-300 list-outside ">
                    {instructions.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))} 
                    </ul>
        </div>

    </div>
</div>
  )
}

export default CardRecipe