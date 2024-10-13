import { create } from 'zustand'
import { MealPlan } from '@/components/types/types'
import { persist } from 'zustand/middleware';

type MealPlanState = {
    mealPlan: MealPlan | null;
    setMealPlan: (mealPlan: MealPlan) => void;
};

export const useMealPlanStore = create<MealPlanState>()
(persist((set) => ({
    mealPlan: null,
    setMealPlan: (mealPlan) => set({ mealPlan }),
}), {
    name: 'meal-plan'
}
));
