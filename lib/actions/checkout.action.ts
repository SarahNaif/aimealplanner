"use server";

import Stripe from "stripe";
import { PlanName, PLANS } from '../../constants/plan';


export async function checkoutCredits(userId: string, selectedPlan: string) {

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const planDetails = PLANS[selectedPlan as PlanName];

  if (!planDetails) {
    throw new Error("Invalid plan selected.");
  }

  const session = await stripe.checkout.sessions.create({

    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: planDetails.price * 100,
          product_data: { name: selectedPlan },
        },
        quantity: 1,
      },
    ],
    metadata: { userId, selectedPlan, credits: planDetails.credits },
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/meal-planner`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
  });

  return session.url;
}

