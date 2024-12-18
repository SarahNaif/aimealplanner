"use client"
import { Button } from '@/components/ui/button';
import CardMeal from '@/components/shared/Card/Card';
import CardLoader from '@/components/shared/Card/CardLoader';
import { useMealPlanStore } from '@/store/mealStore';
import React from 'react'


const page : React.FC = () => {
    const mealPlan = useMealPlanStore((state) => state.mealPlan);
    console.log(mealPlan)

    const totalCalories = mealPlan?.meals?.reduce((total, meal) => {
      const mealKey = Object.keys(meal)[0];
      const cal = meal[mealKey].recipe.nutrition.calories || 0
      return total + cal
  }, 0);

    return (
     
<main className="min-h-screen bg-gray-50 pt-24 p-8">
        <div className="space-y-8 my-9">
          <div className="flex justify-between">
            <div className="space-y-2 mt-3">
            <h1 className="text-slate-800 text-4xl font-bold">Your Daily Meal Plan</h1>
            <p className="">
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
          const mealKey = Object.keys(meal)[0];
          return <CardMeal key={index} meal={meal[mealKey]} mealKey={mealKey} />;
        })
      ) : (
        // No Meals Found
        <div>No meals found</div>
      )}

          </div>
        </div>
      </main>

      
    )
}

export default page