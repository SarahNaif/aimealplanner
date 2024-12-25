import { checkoutCredits } from "@/lib/actions/checkout.action";

export async function POST(request: Request) {
  const { userId, plan } = await request.json();
  const url = await checkoutCredits(userId, plan);
  return new Response(JSON.stringify({ url }));
}