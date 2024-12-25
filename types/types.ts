export interface Icon {
  src: string;
  style: string;
  alt: string;
}

export interface BackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
}


export interface MealPlanType {
  userId: string;
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
  prepTime: number; 
  cookTime: number; 
};

export type Meal = {
  type: string;
  dishName: string;
  description: string;
  recipe: Recipe;
  imageUrl: string;
  
};


export type MealPlan = {
  meals: Meal[];
};



export type PlanName = 'Free' | 'Basic' | 'Premium';

export type PlanEmoji = '🍽️' | '👨‍🍳' | '🥇';

export type PlanDescription = 
  | 'Get started with meal planning'
  | 'Most popular choice for foodies'
  | 'For the serious meal preppers';



export interface PlanCredit {
  name: PlanName; // Name of the plan (e.g., 'Free', 'Basic', 'Premium')
  emoji: PlanEmoji; // Emoji associated with the plan
  description: PlanDescription; // Description of the plan
  price: string; // Formatted price string (e.g., "$10")
  credits: number; // Number of credits
  features: string[]; // List of features included in the plan
}