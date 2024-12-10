
import Image from 'next/image'
import Link from 'next/link';
import { useMealPlanStore } from '@/store/mealStore';
import { Button } from '../../button';
import { ArrowLeft, Clock, Users } from 'lucide-react';
import { Badge } from '../../badge';
import { Card, CardContent, CardHeader } from '../../card';
import { Suspense, useState } from 'react';
import { Skeleton } from '../../skeleton';
import Loading from '@/app/recipe/loading';


const CardRecipe : React.FC = () => {
    const currentRecipe = useMealPlanStore((state) => state.currentRecipe);
    const [imageLoaded, setImageLoaded] = useState(false);
    if (!currentRecipe) {
        return <div>No recipe selected.</div>;
    }
    const { dishName, description, imageUrl, recipe: { ingredients, instructions , nutrition} } = currentRecipe;
 
     
  return (

<div className="min-h-screen bg-gray-50 pt-24 ">
<div className="mx-auto max-w-4xl my-6">

  <div className="mb-8">
    <Link href="/meal-details">
      <Button variant="ghost" className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Meal Plan
      </Button>
    </Link>
    <h1 className="text-4xl font-bold mb-2">{dishName}</h1>
    <p className="text-lg text-muted-foreground mb-4">{description}</p>
    <div className="flex flex-wrap gap-4">
      <Badge variant="secondary" className="text-sm">
        <Clock className="mr-1 h-4 w-4" />
        Prep: 1 min
      </Badge>
      <Badge variant="secondary" className="text-sm">
        <Clock className="mr-1 h-4 w-4" />
        Cook: 1 min
      </Badge>
      <Badge variant="secondary" className="text-sm">
        <Users className="mr-1 h-4 w-4" />
        Serves: 1
      </Badge>
      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-sm">
        {nutrition.calories} Cal per serving
      </Badge>
    </div>
  </div>

  <div className="relative w-full h-[400px] mb-8">

  {!imageLoaded && (
            <Skeleton className="absolute inset-0 w-full h-full rounded-lg shadow-md" />
          )}
          <Image
            src={imageUrl}
            alt={dishName}
            width={400}
            height={400}
            className={`absolute inset-0 w-full h-full object-cover rounded-lg shadow-md transition-opacity duration-300 ${
      imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />


      </div>
 
  <div className="grid gap-8 md:grid-cols-2">
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-semibold">Ingredients</h2>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-2">
        {ingredients.map((ingredient, index) => (
            <li key={index}>
              {/* <span className="font-medium">{ingredient.amount}</span>*/} {ingredient} 
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <h2 className="text-2xl font-semibold">Instructions</h2>
      </CardHeader>
      <CardContent>
        <ul className=" pl-5 space-y-4">
        {instructions.map((instruction, index) => (
            <li key={index} >
              <p>{instruction}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  </div>


</div>
</div>
  )
}

export default CardRecipe