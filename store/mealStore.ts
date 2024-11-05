import { create } from 'zustand'
import { Meal, MealPlan } from '@/components/types/types'
import { persist } from 'zustand/middleware';

type MealPlanState = {
    mealPlan: MealPlan | null;
    setMealPlan: (mealPlan: MealPlan) => void;
    currentRecipe: Meal | null ;
    setCurrentRecipe: (recipe: Meal)=> void;
};

export const useMealPlanStore = create<MealPlanState>()
(persist((set) => ({
    mealPlan: null,
    setMealPlan: (mealPlan) => set({ mealPlan }),
    currentRecipe: null,
    setCurrentRecipe: (recipe)=> set({currentRecipe: recipe}),

}), {
    name: 'meal-plan'
}
));
