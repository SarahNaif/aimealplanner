export interface Icon {
  src: string;
  style: string;
  alt: string;
}

export interface BackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
}


export interface MealPlanType {
  weight: number;
  age: number;
  height: number;
  numberOfMeals: number;
}

export type Recipe = {
  ingredients: string[];
  instructions: string[];
};

export type Meal = {
  dishName: string;
  recipe: Recipe;
};
export type MealPlan = {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snacks: Meal;
};