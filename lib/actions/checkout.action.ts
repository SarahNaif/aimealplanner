"use server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function checkoutCredits(userId: string, selectedPlan: { name: string, price: number, credits: number }) {

  



  if (!selectedPlan) {
    console.error(`Invalid plan: ${selectedPlan}`);
    throw new Error("Invalid plan selected.");
   
  }

  

  const session = await stripe.checkout.sessions.create({

    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: selectedPlan.price * 100,
          product_data: { 
            name: selectedPlan.name,
            description: `Get ${selectedPlan.credits} credits for just $${selectedPlan.price} with our AI meal planner! Create personalized meal plans tailored to your calorie, protein, fat, and carb needs. Perfect for exploring the service at a great price while discovering meals that suit your lifestyle.`,
          },
        },
        quantity: 1,
      },
    ],
    metadata: { userId, name: selectedPlan.name , credits: selectedPlan.credits},
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/payment-success?userId=${userId}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
  });

  return session.url;
}