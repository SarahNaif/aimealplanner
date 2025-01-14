"use client"
import { Button } from '@/components/ui/button';
import CardMeal from '@/components/shared/Card/Card';
import CardLoader from '@/components/shared/Card/CardLoader';
import { useMealPlanStore } from '@/store/mealStore';
import React from 'react'


const Page : React.FC = () => {
    const mealPlan = useMealPlanStore((state) => state.mealPlan);
    console.log(mealPlan)

    const totalCalories = mealPlan?.meals?.reduce((total, meal) => {
      const cal = meal.recipe.nutrition.calories || 0
      return total + cal
  }, 0);

    return (
     
<main className="pt-24  bg-gray-50">
<div className="mx-auto max-w-7xl px-6 lg:px-8">
  <div className="p-8">
  <div className="space-y-8 my-9">



<div className="flex justify-between">
  <div className="space-y-2 mt-3">
  <h1 className="text-slate-800 text-4xl font-bold">Your Daily Meal Plan</h1>
  <p className="mt-6 text-lg leading-8 text-gray-600">
    A balanced selection of nutritious meals totaling {totalCalories} calories.
  </p>
  </div>
</div>

<div className="grid gap-6 md:grid-cols-2">
{!mealPlan ? (
Array.from({ length: 4 }).map((_, index) => (
<CardLoader key={index}/>
))
) : mealPlan?.meals?.length > 0 ? (
// Show Meals
mealPlan.meals.map((meal, index) => {
return <CardMeal key={index} meal={meal} mealKey={meal.type} />;
})
) : (
// No Meals Found
<div>No meals found</div>
)}

</div>
</div>
</div>
  </div>
     
      </main>

      
    )
}

export default Page