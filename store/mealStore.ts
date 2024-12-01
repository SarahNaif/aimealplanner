import { create } from 'zustand'
import { Meal, MealPlan } from '@/components/types/types'
import { persist } from 'zustand/middleware';

type MealPlanState = {
 
    mealPlan: MealPlan | null;
    currentRecipe: Meal | null ;

    setMealPlan: (mealPlan: MealPlan) => void;
    setCurrentRecipe: (recipe: Meal)=> void;
   
};

export const useMealPlanStore = create<MealPlanState>()
(persist((set) => ({
    mealPlan: null,
    currentRecipe: null,
    setMealPlan: (mealPlan) => set({ mealPlan }),
    setCurrentRecipe: (recipe)=> set({currentRecipe: recipe}),
}), {
    name: 'meal-plan'
}
));
