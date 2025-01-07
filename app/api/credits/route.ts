import { NextResponse } from 'next/server';
import CreditModel from '@/lib/database/models/Credit';
import { connectToDatabase } from '@/lib/database/mongodb';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId"); 
  
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  await connectToDatabase();

  const userCredit = await CreditModel.findOne({ userId });

  if (!userCredit) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    credits: userCredit.credits,
    plan: userCredit.plan,
  });
}
