"use server";

import CreditModel from '../database/models/Credit';
import { connectToDatabase } from '../database/mongodb';


export async function deductCredits(userId: string, amount: number) {
    await connectToDatabase();
  
    const user = await CreditModel.findOneAndUpdate(
      { userId },
      { $inc: { credits: -amount } },
      { new: true }
    );
  
    if (!user || user.credits < 0) {
      throw new Error("Insufficient credits.");
    }
  
    return user.credits;
  }
  