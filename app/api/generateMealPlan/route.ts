import { NextResponse, NextRequest } from 'next/server';
import { MealPlanType } from '@/components/types/types';

import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});


export async function POST(req: NextRequest,res:NextResponse ) {

  try{

    const body: MealPlanType = await req.json();
    const { weight, age, height, numberOfMeals } = body;
    const prompt = `
      Generate a meal plan for a person with the following details:
      Weight: ${weight} kg
      Age: ${age} years
      Height: ${height} cm
      Meals per day: ${numberOfMeals}.
    `;

    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo', // GPT-4 model
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 200, // Adjust the token count if required
    });

    const mealPlan = response.choices[0]?.message?.content?.trim() || 'No response from API';
    return NextResponse.json({ mealPlan });
    

  }catch (error){
    console.error('Error generating meal plan:', error);
    return NextResponse.json({ error: 'Error generating meal plan' }, { status: 500 });
  }

}

