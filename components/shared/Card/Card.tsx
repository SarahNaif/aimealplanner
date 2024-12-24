import React, { ReactNode } from 'react'
import { Meal} from '@/types/types';
import { FaArrowRight } from "react-icons/fa6";
import Link from 'next/link';
import { useMealPlanStore } from '@/store/mealStore';
import { Card, CardContent, CardFooter, CardHeader } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../ui/button';

type CardProps = {
    meal: Meal
    mealKey: string;
};

const CardMeal: React.FC<CardProps> = ({ meal, mealKey }) => {
    const { dishName, description, recipe } = meal;
    const { nutrition } = recipe;
    const setCurrentRecipe = useMealPlanStore((state)=> state.setCurrentRecipe)

    const handleRecipe = () => {
        setCurrentRecipe(meal)
    }

    return (
        <Card className="flex flex-col ">
        <CardHeader className="flex-col justify-between items-start gap-4 space-y-0">
          <div className="flex flex-row justify-between w-full">
            <Badge variant="secondary" className="rounded-sm capitalize">
              #{mealKey}
            </Badge>
            <Badge variant="secondary" className="rounded-sm bg-yellow-100 text-yellow-900">
          {nutrition.calories}Cal
          </Badge>
        
          </div>
          
          <h3 className="font-semibold text-xl leading-none tracking-tight">
            {dishName}
            </h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter className="flex justify-between mt-auto ">
          <div className="flex gap-2 ">
            <Badge variant="secondary" className="rounded-sm bg-red-100 text-red-900">
            {nutrition.fat} Fat
            </Badge>
            <Badge variant="secondary" className="rounded-sm bg-blue-100 text-blue-900">
              {nutrition.protein} Protein
            </Badge>
            <Badge variant="secondary" className="rounded-sm bg-green-100 text-green-900">
              {nutrition.carbohydrates} Carb
            </Badge>
          </div>
          <Button variant="outline" size="sm" className="ml-auto " asChild>
            <Link href="/recipe" onClick={handleRecipe}>
              Recipe
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>

    )
}

export default CardMeal