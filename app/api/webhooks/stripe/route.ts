
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import CreditModel from '@/lib/database/models/Credit';
import { connectToDatabase } from '@/lib/database/mongodb';

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature")!;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ error: "Webhook signature verification failed." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const { metadata } = event.data.object as any;
    const { userId, selectedPlan, credits } = metadata;

    await connectToDatabase();

    await CreditModel.findOneAndUpdate(
      { userId },
      {
        credits: Number(credits),
        plan: selectedPlan,
        lastUpdated: new Date(),
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ message: "Plan and credits updated." });
  }

  return new Response("", { status: 200 });
}
