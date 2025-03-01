"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";


import { MealPlanType } from "@/types/types";
import { useMealPlanStore } from '@/store/mealStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Selector } from "./Selector";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useCreditStore } from "@/store/creditStore";
import InsufficientCreditsDialog from "./InsufficientCreditsDialog";

import { useAuth } from "@clerk/nextjs";


export default function MealPlanForm() {
  const { isLoaded, userId, sessionId, getToken } = useAuth()
 
  const [formData, setFormData] = useState<MealPlanType>({
    userId: userId || '',
    weight: 0,
    age: 0,
    height: 0,
    meals: "",
    gender: "",
    goal: "",
  });

  const setMealPlan = useMealPlanStore((state) => state.setMealPlan);
  const { credits, minusCredit, setCredits } = useCreditStore();

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);


  if (!isLoaded || !userId) {
    return null;
  }

  const handleSelect = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ((credits ?? 0) <= 0) {
      console.log("No credits available, showing dialog.");
      setShowDialog(true);
      return;
    }

    setLoading(true);

    try {

      await minusCredit(userId);
       

        const requestBody = {
          ...formData,
          exclusions: [], 
        };
        const token = await getToken();
        const response = await fetch('/api/generateMealPlan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data?.mealPlan) {
          setMealPlan(data.mealPlan);
          router.push("/meal-details");
         
        } else {
          throw new Error('Invalid response format');
        }
      
    } catch (error) {
      console.error('Error generating meal plan:', error);

      setCredits((credits ?? 0) + 1, 'Free'); 
    } finally {
      setLoading(false);
    }
  };

  const handleDialogClose = () => setShowDialog(false);
  const handlePurchaseCredits = () => router.push("/credits");
  
  return (
    <Card className="absolute max-w-xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white ">
      <CardHeader>
        <CardTitle className="font-bold text-3xl capitalize text-neutral-800 dark:text-neutral-200">
          Welcome to AI Chef Meal
        </CardTitle>
        <CardDescription className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Enter your details to generate a customized meal plan tailored to your health and lifestyle goals.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex gap-4 mb-2 w-full">
            <div className="w-full space-y-1">
              <Label>Age</Label>
              <Input placeholder="28" type="number"
                name="age"
                value={formData.age === 0 ? '' : formData.age}
                onChange={handleChange}
                required />
            </div>
            <div className="w-full space-y-1">
              <Label>Gender</Label>
              <Selector
                label="gender"
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                ]}
                onSelect={handleSelect}
              />
            </div>
          </div>
          <div className="flex gap-4 mb-2 w-full">
            <div className="w-full space-y-1">
              <Label htmlFor="weight">Weight (KG)</Label>
              <Input name="weight" placeholder="65 kg" type="number"
                value={formData.weight === 0 ? '' : formData.weight}
                onChange={handleChange}
                required />
            </div>
            <div className="w-full space-y-1">
              <Label htmlFor="height">Height (Centimeters)</Label>
              <Input name="height" placeholder="173 cm" type="number"
                value={formData.height === 0 ? '' : formData.height}
                onChange={handleChange}
                required />
            </div>
          </div>
          <div className="flex gap-4 mb-2 w-full">
            <div className="w-full space-y-1">
              <Label>
                Meals per day
              </Label>
              <Selector
                label="meals"
                options={[
                  { label: "3 Meals", value: "3" },
                  { label: "4 Meals", value: "4" },
                  { label: "6 Meals", value: "6" },
                ]}
                onSelect={handleSelect}
              />
            </div>
            <div className="w-full space-y-1">
              <Label className="">Goal</Label>
              <Selector
                label="goal"
                options={[
                  { label: "Gain Muscle", value: "gain_muscle" },
                  { label: "Lose Weight", value: "lose_weight" },
                  { label: "Maintain Weight", value: "maintain_weight" },
                ]}
                onSelect={handleSelect}
              />
            </div>

          </div>
          <Button
            className="flex justify-center items-center disabled: bg-gradient-to-br my-5 relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600  dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
            disabled={loading}
          >
            {loading ?  <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </> : 'Generate Meal Plan'}   &rarr;
          </Button>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          {loading && <span>Please be patient this may take 1 to 2 minutes</span>}
        </form>
      </CardContent>

     {showDialog && (
        <InsufficientCreditsDialog
         
          onClose={handleDialogClose}
          onAction={handlePurchaseCredits}
          title="Not Enough Credits"
          message="You don't have enough credits to generate a meal plan. Please purchase more credits to proceed."
          actionText="Purchase Credits" isOpen={showDialog}        />
      )} 

    </Card>
  );
}
