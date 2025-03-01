import mongoose, { Schema, Document, model, models } from 'mongoose';


interface Credit {
  userId: string; 
  credits: number; 
  plan: string; 
  lastUpdated: Date; 
}

const CreditSchema = new Schema<Credit>(
  {
    userId: { type: String, required: true, unique: true }, 
    credits: { type: Number, required: true, default: 2 },
    plan: { type: String, required: true, default: 'Free' }, 
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const CreditModel = models.Credit || model<Credit>('Credit', CreditSchema);
export default CreditModel;