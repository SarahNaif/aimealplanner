import { Plan } from "@/types/types";


export const plans: Plan[] = [
  {
    name: "Free",
    desc: "Basic access to features with limited credits.",
    price: 0,
    credits: 2,
    emoji: "🍽️",
    features: [
      "Access to basic features",
      "2 credits ",
      "Community support"
    ]
  },
  {
    name: "Basic",
    desc: "Affordable plan for individual users.",
    price: 3,
    credits: 3,
    emoji: "👨‍🍳",
    features: [
      "All features in Free plan",
      "3 credits per month",
      "Email support"
    ]
  },
  {
    name: "Premium",
    desc: "Advanced features for professionals.",
    price: 5,
    credits: 5,
    emoji: "🥇",
    features: [
      "All features in Basic plan",
      "5 credits per month",
      "Priority email support",
      "Access to premium features"
    ]
  }
];