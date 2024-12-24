import mongoose, { Schema, Document, model, models } from 'mongoose';

// Define the Nutrition type
interface Nutrition {
  calories: number; // Total calories for the dish
  fat: string;      // Total fat in grams
  carbohydrates: string; // Total carbohydrates in grams
  protein: string;  // Total protein in grams
}

// Define the Recipe type
export interface Recipe {
  ingredients: string[];
  instructions: string[];
  nutrition: Nutrition;
  prepTime: number;
  cookTime: number;
}

// Define the Meal type
export interface Meal {
  type: string;
  dishName: string;
  description: string;
  recipe: Recipe;
  imageUrl: string;
}

// Define the MealPlan type to encapsulate meal plans data
interface MealPlanData {
  _id: mongoose.Types.ObjectId; // Unique ID for each meal plan
  meals: Meal[]; // Array of meals in this meal plan
  createdAt: Date; // Timestamp when the meal plan was created
  updatedAt: Date; // Timestamp for the last update to the meal plan
}

// Define the MealPlanType interface extending Document for the schema
export interface MealPlanType extends Document {
  userId: string; // Reference to userId, unique for each user
  mealPlans: MealPlanData[]; // Array of meal plans for each user
}

// Define the MealPlan Schema
const MealPlanSchema = new Schema<MealPlanType>(
  {
    userId: { type: String, required: true, unique: true }, // Ensure each user has a unique document
    
    mealPlans: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true }, // Auto-generate a unique ID for each meal plan
        meals: [
          {
            type: { type: String, required: true },
            dishName: { type: String, required: true },
            description: { type: String, required: true },
            recipe: {
              ingredients: { type: [String], required: true },
              instructions: { type: [String], required: true },
              nutrition: {
                calories: { type: Number, required: true },
                fat: { type: String, required: true },
                carbohydrates: { type: String, required: true },
                protein: { type: String, required: true },
              },
              prepTime: { type: Number, required: true },
              cookTime: { type: Number, required: true },
            },
            imageUrl: { type: String },
          },
        ],
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const MealPlanModel = models.MealPlan || model<MealPlanType>('MealPlan', MealPlanSchema);
export default MealPlanModel;

