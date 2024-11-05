import React, { ReactNode } from 'react'
import { Meal, Meals } from '@/components/types/types';
import { Button } from '../Button/Button'
import { FaArrowRight } from "react-icons/fa6";
import Link from 'next/link';
import { useMealPlanStore } from '@/store/mealStore';

type CardProps = {
    meal: Meal
    mealKey: string;
};

const Card: React.FC<CardProps> = ({ meal, mealKey }) => {
    const { dishName, description, recipe } = meal;
    const { nutrition } = recipe;
    const setCurrentRecipe = useMealPlanStore((state)=> state.setCurrentRecipe)

    const handleRecipe = () => {
        setCurrentRecipe(meal)
    }

    return (
        <div className="relative z-44 flex  w-full max-w-[34rem] rounded-xl bg-zinc-900 border border-zinc-100/[0.2] text-gray-700 shadow-md">

            <div className="px-6 py-4">
                <div className='flex gap-3 justify-between'>
                    <div className="w-fit tracking-widest text-sm rounded-md bg-gray-600  mb-6 py-1 px-3 font-semibold text-gray-300 ">
                        <span className="capitalize">
                     #{mealKey}
                        </span>
                    </div>
                    <div className="w-fit tracking-widest text-sm rounded-md bg-amber-200  mb-6 py-1 px-3 font-semibold text-amber-900 ">
                        <span>
                        {nutrition.calories} Cal
                        </span>
                    </div>

                </div>


                <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-gray-200 antialiased">
                   {dishName}
                   
                </h4>
                <p className="mb-5 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                    {description}
                </p>


                <div className="flex gap-2 justify-between mb-2">


                    <div className="flex gap-4">
                        <div className="rounded-md bg-red-300 px-2 font-semibold text-red-900 ">
                            <span className='tracking-widest text-xs'>
                                {nutrition.fat} Fat
                            </span>
                        </div>
                        <div className="rounded-md bg-blue-300 px-2 font-semibold text-blue-900 ">
                            <span className='tracking-widest text-xs'>
                                {nutrition.protein} Protien
                            </span>
                        </div>
                        <div className="rounded-md bg-green-300  px-2 font-semibold text-green-900 ">
                            <span className='tracking-widest text-xs'>
                                {nutrition.carbohydrates} Carb
                            </span>
                        </div>
                    </div>
                    <Link href="/recipe" onClick={handleRecipe} className="flex items-center gap-1 w-fit tracking-widest text-sm rounded-md bg-gray-600   py-1 px-3 font-semibold text-gray-300" >

                        Recipe
                        <FaArrowRight />
                    </Link>
                </div>
            </div>

        </div>


    )
}

export default Card