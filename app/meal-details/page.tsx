"use client"
import SqBackground from '@/components/ui/Background/SqBackGrounds'
import Card from '@/components/ui/Card/Card'
import { useMealPlanStore } from '@/store/mealStore';
import React from 'react'

const page : React.FC = () => {
    const mealPlan = useMealPlanStore((state) => state.mealPlan);
    console.log(mealPlan)

    return (
        <SqBackground>


            <div className="flex flex-col justify-center gap-9 px-4 sm:px-6 lg:px-9 max-w-full lg:max-w-[87rem] mx-auto">
                <div className=' flex justify-end pr-28 p-4 shadow-lg  '>
                    <div className='text-black bg-white p-2 rounded-lg'>
                        Download</div>

                </div>
                <div className='flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 justify-center overflow-y-auto max-h-[41rem] p-4 '>
                    {mealPlan ? 
                    
                    mealPlan?.meals.map((meal, index)  => {
                        const mealKey = Object.keys(meal)[0];
                        console.log(JSON.stringify(meal[mealKey]))
                        return  <Card key={index} meal={meal[mealKey]} mealKey={mealKey} />
                     })
                : 
                <div> No meals Found</div>
                
                }

                </div>
            </div>
        </SqBackground>
    )
}

export default page