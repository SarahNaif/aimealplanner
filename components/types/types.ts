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