import { NextResponse, NextRequest } from 'next/server';
import { MealPlanType } from '@/components/types/types';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body: MealPlanType = await req.json();
    const { weight, age, height, numberOfMeals } = body;
    const prompt = `
        I want you to act as a Meal Planner AI. Generate a meal plan for one day based on the provided details only. Each recipe should have a maximum of three instruction steps and include only a few ingredients. Provide the response in JSON format like this: { "mealPlan": { "breakfast": { "dishName": "Dish Name", "recipe": { "ingredients": ["Ingredient 1", "Ingredient 2"], "instructions": ["Step 1", "Step 2"] } }, "lunch": { ... }, "dinner": { ... }, "snacks": { ... } } }. Do not provide any other information.
  Here are the details:
  Weight: ${weight} kg
  Age: ${age} years
  Height: ${height} cm
  Meals per day: ${numberOfMeals}.
    `;

    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo', 
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 330, 
    });

    const mealPlanString = response.choices[0]?.message?.content?.trim() || "{}";
    console.log("Raw response:", mealPlanString); 

    let mealPlan;
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

    return NextResponse.json(mealPlan);

  } catch (error) {
    console.error('Error generating meal plan:', error);
    return NextResponse.json({ error: 'Error generating meal plan' }, { status: 500 });
  }
}




