import mongoose, { Schema, Document, model, models } from 'mongoose';

// Define the Credit type
interface Credit {
  userId: string; // Reference to Clerk's userId
  credits: number; // Number of credits available for meal plans
  plan: string; // Subscription plan (e.g., Free, Premium)
  lastUpdated: Date; // When the credits were last updated
}

const CreditSchema = new Schema<Credit>(
  {
    userId: { type: String, required: true, unique: true }, // Associate with Clerk's userId
    credits: { type: Number, required: true, default: 2 }, // Number of credits
    plan: { type: String, required: true, default: 'Free' }, // Subscription plan (e.g., Free or Premium)
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const CreditModel = models.Credit || model<Credit>('Credit', CreditSchema);
export default CreditModel;