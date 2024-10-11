import { create } from 'zustand'
import { MealPlan } from '@/components/types/types'

type MealPlanState = {
    mealPlan: MealPlan | null;
    setMealPlan: (mealPlan: MealPlan) => void;
};

export const useMealPlanStore = create<MealPlanState>((set) => ({
    mealPlan: null,
    setMealPlan: (mealPlan) => set({ mealPlan }),
}));
