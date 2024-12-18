import { NextResponse, NextRequest } from 'next/server';
import { MealPlan, MealPlanType, Meal } from '@/components/types/types';
import OpenAI from 'openai';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});


export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body: MealPlanType & { exclusions?: string[] } = await req.json();
    const { gender, goal, weight, age, height, meals, exclusions = [] } = body;

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
        "description": "A brief description of the dish (6 lines)", 
        "recipe": { 
          "ingredients": ["Ingredient 1", "Ingredient 2"], 
          "instructions": ["Step 1", "Step 2"], 
          "nutrition": { 
            "calories": X, 
            "fat": "Yg", 
            "carbohydrates": "Zg", 
            "protein": "Wg" 
          },
          "prepTime": X,
          "cookTime": X  
        } 
      } },
      { "lunch": { ... } },
      { "dinner": { ... } },
      { "snack": { ... } }
    ]
  }
}
3. Label additional meals as "morning snack," "evening snack," etc., if needed, to match the requested number of meals (${meals}).
4. Avoid outputting any additional text or explanation.
`;
    const userPrompt = `
    Generate a one-day meal plan using the following details:
    - Age: ${age} years.
    - Gender: ${gender}.
    - Weight: ${weight} kg.
    - Height: ${height} cm.
    - Goal: ${goal}.
    Ensure the plan is varied each time and includes a specific number of meals: ${meals}.
    `;




    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: "system", content: systemPrompt }, { role: 'user', content: userPrompt }],
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
      throw new Error("Invalid meal plan format", mealPlan);
    }


    for (const meal of mealPlan.mealPlan.meals) {
      const mealType = Object.keys(meal)[0]; // e.g., "breakfast", "lunch"
      const dish = meal[mealType];
      const imagePrompt = `A high-quality image of a meal with the following description: ${dish.description}. Include ingredients like ${dish.recipe.ingredients.join(", ")}. `;
      try {
        const imageResponse = await client.images.generate({
          prompt: imagePrompt,
          n: 1,
          size: '512x512',
        });

        const imageUrl = imageResponse.data[0].url;

        if (!imageUrl) throw new Error('Image URL is undefined');

        const uploadResponse = await cloudinary.uploader.upload(imageUrl, {
          folder: 'meal-planner',
        });

        const cloudinaryUrl = uploadResponse.secure_url;

        dish.imageUrl = cloudinaryUrl;

      } catch (error) {
        console.warn(`Image generation or upload failed for ${mealType}:`, error);
        // dish.imageUrl ='https://res.cloudinary.com/dvukj9sqf/image/upload/v1733738996/affd16fd5264cab9197da4cd1a996f820e601ee4_mieb05.png';
        // dish.blurDataURL = null;
      }
    }
    return NextResponse.json(mealPlan);

  } catch (error) {
    console.error('Error generating meal plan:', error);
    return NextResponse.json({ error: 'Error generating meal plan' }, { status: 500 });
  }
}




