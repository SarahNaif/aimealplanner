import { NextResponse, NextRequest } from 'next/server';
import { MealPlan, MealPlanType, Meal } from '@/components/types/types';
import OpenAI from 'openai';
import { useMealPlanStore } from '@/store/mealStore';




interface APIResponse {
  mealPlan: MealPlan;
  imageUrl: string;
}
 
const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});


export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body: MealPlanType & { exclusions?: string[] } = await req.json();
    const { weight, age, height, numberOfMeals, exclusions = [] } = body;
  
    const exclusionsString = exclusions.length
      ? exclusions.map((item) => `"${item}"`).join(", ")
      : "none";

    
    

    const systemPrompt = `
You are a Meal Planner chef tasked with creating a JSON-formatted meal plan. Each response should:
1. Avoid dishes, ingredients, or recipes that include any of the following: ${exclusionsString} .
2. Follow this format:
{
  "mealPlan": {
    "meals": [
      { "breakfast": { 
        "dishName": "Dish Name", 
        "description": "A brief description of the dish (3 lines)", 
        "recipe": { 
          "ingredients": ["Ingredient 1", "Ingredient 2"], 
          "instructions": ["Step 1", "Step 2"], 
          "nutrition": { 
            "calories": X, 
            "fat": "Yg", 
            "carbohydrates": "Zg", 
            "protein": "Wg" 
          } 
        } 
      } },
      { "lunch": { ... } },
      { "dinner": { ... } },
      { "snack": { ... } }
    ]
  }
}
3. Label additional meals as "morning snack," "evening snack," etc., if needed, to match the requested number of meals (${numberOfMeals}).
4. Avoid outputting any additional text or explanation.
`;
    const userPrompt = `
    Generate a one-day meal plan using the following details:
    - Weight: ${weight} kg
    - Age: ${age} years
    - Height: ${height} cm
    Ensure the plan is varied each time and includes a specific number of meals: ${numberOfMeals}.
    `;
    



    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo', 
      messages: [ { role: "system", content: systemPrompt },{ role: 'user', content: userPrompt }],
      max_tokens: 1500, 
      temperature: 0.7
    });

    const mealPlanString = response.choices[0]?.message?.content?.trim() || "{}";
    

    let mealPlan
    try {
        mealPlan = JSON.parse(mealPlanString);
       
       

    } catch (parseError) {
        console.error('Error parsing meal plan:', parseError);
        console.error('Meal plan string:', mealPlanString); 
        throw new Error("Invalid meal plan format");
    }

   
    if (!mealPlan.mealPlan) {
      throw new Error("Invalid meal plan format");
    }


    for (const meal of mealPlan.mealPlan.meals) {
      const mealType = Object.keys(meal)[0]; // e.g., "breakfast", "lunch"
      const dish = meal[mealType];
      const imagePrompt = `A high-quality image of a meal with the following description: ${dish.description}. Include ingredients like ${dish.recipe.ingredients.join(", ")}.`;

      const imageResponse = await client.images.generate({
        prompt: imagePrompt,
        n: 1,
        size: '1024x1024',
      });

      const imageUrl = imageResponse.data[0].url;
      dish.imageUrl = imageUrl;
    }





    return NextResponse.json(mealPlan);

  } catch (error) {
    console.error('Error generating meal plan:', error);
    return NextResponse.json({ error: 'Error generating meal plan' }, { status: 500 });
  }
}




