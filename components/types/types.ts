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
  meals: string;
  gender:string;
  goal:string;
}

interface Nutrition {
  calories: number; // Total calories for the dish
  fat: string;      // Total fat in grams
  carbohydrates: string; // Total carbohydrates in grams
  protein: string;  // Total protein in grams
}

export type Recipe = {
  ingredients: string[];
  instructions: string[];
  nutrition: Nutrition; 
};

export type Meal = {
  dishName: string;
  description: string; 
  recipe: Recipe;
  imageUrl: string;
  
};

export type Meals  = {
  [key: string]: Meal;
};


export type MealPlan = {
  meals: Meals[];
};

