import React from 'react'
import SqBackground from '@/components/shared/SqBackGrounds'
import MealPlanForm from '@/components/shared/Form'
const page : React.FC = () =>  {
  return (
    <div className="h-screen w-full dark:bg-zinc-950 bg-white dark:bg-grid-white/[0.1] bg-grid-black/[0.2] relative flex items-center justify-center overflow-hidden">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <MealPlanForm/>
 
    
    </div>
  )
}

export default page