import { NextResponse, NextRequest } from 'next/server';
import { MealPlanType} from '@/types/types';
import OpenAI from 'openai';
import { v2 as cloudinary } from 'cloudinary';
import MealPlanModel, { Meal } from '@/lib/database/models/MealPlan';
import { connectToDatabase } from '@/lib/database/mongodb';
import mongoose from 'mongoose';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

async function generateMealImage(description: string, ingredients: string[]): Promise<string | null> {
  const imagePrompt = `A high-quality image of a meal with the following description: ${description}. Include ingredients like ${ingredients.join(", ")}. `;
  const defaultImageUrl = 'https://res.cloudinary.com/dvukj9sqf/image/upload/v1733738996/affd16fd5264cab9197da4cd1a996f820e601ee4_mieb05.png';

  try {
    const imageResponse = await client.images.generate({
      prompt: imagePrompt,
      n: 1,
      size: '512x512',
    });
    
    
    const imageUrl = imageResponse.data[0]?.url 


     if (!imageUrl) {
      console.warn("OpenAI did not return a valid image URL. Using default image.");
      return defaultImageUrl; // Fallback to default image if OpenAI fails
    }
    
    const uploadResponse = await cloudinary.uploader.upload(imageUrl, {
      folder: 'meal-planner',
    });

    if (!uploadResponse.secure_url) {
      console.warn("Cloudinary upload failed. Using default image.");
      return defaultImageUrl; // Fallback to default image if upload fails
    }

    return uploadResponse.secure_url;  // Return the secure URL
  } catch (error) {
    console.error("Error generating or uploading image:", {
      description,
      ingredients,
      error,
    });
    return defaultImageUrl
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {

    await connectToDatabase(); 

    const body: MealPlanType & { exclusions?: string[] } = await req.json();
    const { gender, goal, weight, age, height, meals, exclusions = [], userId } = body;




    const recentMealPlan = await MealPlanModel.findOne({ userId }).sort({ updatedAt: -1 });

    let exclusionsFromDB: string[] = [];
    if (recentMealPlan && recentMealPlan.mealPlans.length > 0) {
      exclusionsFromDB = recentMealPlan.mealPlans.flatMap((mealPlan: { meals: Meal[]; }) =>
        mealPlan.meals.map((meal: Meal) => meal.dishName)
      );
    }
    
    const exclusionsString = Array.from(new Set([...exclusionsFromDB, ...exclusions]))
      .map((item) => `"${item}"`)
      .join(", ");
      



    const systemPrompt = `
You are a Meal Planner chef tasked with creating a JSON-formatted meal plan. Each response should:
1. Avoid dishes, ingredients, or recipes that include any of the following: ${exclusionsString}  .
2. Follow this format:
{
  "mealPlan": {
    "meals": [
      {
        "type": "breakfast", 
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
       },
      {
        "type": "lunch", 
        "dishName": "Dish Name", 
        "description": "Description", 
        "recipe": { ... }
      },
      {
        "type": "dinner", 
        "dishName": "Dish Name", 
        "description": "Description", 
        "recipe": { ... }
      },
      {
        "type": "snack", 
        "dishName": "Dish Name", 
        "description": "Description", 
        "recipe": { ... }
      }
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
      const imageUrl = await generateMealImage(meal.description, meal.recipe.ingredients);
      if (imageUrl) {
        meal.imageUrl = imageUrl;
      }
    }

    const newMealPlan = {
      _id: new mongoose.Types.ObjectId(),
      meals: mealPlan.mealPlan.meals, 
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    

    let userMealPlans = await MealPlanModel.findOne({ userId });

    if (!userMealPlans) {
      userMealPlans = new MealPlanModel({
        userId,
        mealPlans: [newMealPlan], 
      });
    } else {
      console.log('userMealPlans.mealPlans:', userMealPlans.mealPlans);
      // Ensure mealPlans is initialized if undefined
      if (!userMealPlans.mealPlans) {

        userMealPlans.mealPlans = [];  // Initialize if it's undefined
      }
    
      console.log('Adding new meal plan:', newMealPlan);
      userMealPlans.mealPlans.push(newMealPlan); 
      userMealPlans.updatedAt = new Date();
    }
    
    // Log the document before saving
    console.log('User Meal Plans before saving:', JSON.stringify(userMealPlans, null, 2));
    
    await userMealPlans.save();
    console.log('Meal plan saved successfully.');
    
    return NextResponse.json({
      message: 'Meal plan saved successfully',
      mealPlan: newMealPlan,
    });
    
    
  } catch (error) {
    console.error('Error generating meal plan:', error);
    return NextResponse.json({ error: 'Error generating meal plan' }, { status: 500 });
  }
}




