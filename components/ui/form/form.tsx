"use client";
import { useState } from "react";
import { Label } from "../Label/label";
import { Input } from "../Input/input";
import { cn } from "@/lib/utils";
import { Select, SelectOption } from "@/components/ui";
import { MealPlanType } from "@/components/types/types";

export default function MealPlanForm() {

  // Initialize state for form values
  const [formData, setFormData] = useState<MealPlanType>({
    weight: 0,
    age: 0,
    height: 0,
    numberOfMeals: 0,
  });

  const [mealPlan, setMealPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value) // Cast input value to number
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await fetch('/api/generateMealPlan', {
        method: 'POST',  // Ensure this is POST
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData);
        if (response.status === 429) {
          console.log("Too many requests, waiting to retry...");
          await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds before retrying
          return handleSubmit(e); // Retry
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
      const data = await response.json();
      if (data?.mealPlan) {
        setMealPlan(data.mealPlan);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error generating meal plan:', error);
      setMealPlan('Error generating meal plan.');
    } finally {
      setLoading(false);
    }
  };
  


  const [selectedGender, setSelectedGender] = useState("");
  
  return (
    <div className="max-w-xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to AI Chef Meal
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
       
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          {/* <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="Tyler" type="text" />
          </LabelInputContainer> */}
          <LabelInputContainer>
            <Label htmlFor="age">Age</Label>
            <Input  placeholder="28" type="number"
             name="age"
             value={formData.age}
             onChange={handleChange}
             required />
          </LabelInputContainer>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="weight">Weight (KG)</Label>
            <Input name="weight" placeholder="65 kg" type="number"
             value={formData.weight}
             onChange={handleChange}
             required />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="height">Height (Centimeters)</Label>
            <Input name="height" placeholder="173 cm" type="number"
            value={formData.height}
            onChange={handleChange}
            required />
          </LabelInputContainer>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          {/* <LabelInputContainer>
            <Label htmlFor="gender">Gender</Label>
            <Select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              id="gender"
              placeholder="">
              <SelectOption value="male">Male</SelectOption>
              <SelectOption value="female">Female</SelectOption>
            </Select>

          </LabelInputContainer> */}
          {/* <LabelInputContainer>
            <Label htmlFor="tgWeight">Target Weight</Label>
            <Input name="tgWeight" placeholder="55 kg" type="number" />
          </LabelInputContainer> */}
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          {/* <LabelInputContainer>
            <Label htmlFor="gender">What is your goal ?</Label>
            <Select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              id="gender"
              placeholder="">
              <SelectOption value="lose weight">Loose Weight</SelectOption>
              <SelectOption value="gain weight">Gain Weight</SelectOption>
              <SelectOption value="build muscle">Build Muscle</SelectOption>
              <SelectOption value="maintain weight">Maintain Weight</SelectOption>
            </Select>

          </LabelInputContainer> */}
          <LabelInputContainer>
            <Label htmlFor="numberOfMeals">How many meal per day ?</Label>
            <Input name="numberOfMeals" placeholder="4 meals" type="number"
            value={formData.numberOfMeals}
            onChange={handleChange}
            required />
          </LabelInputContainer>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          
          {/* <LabelInputContainer>
            <Label htmlFor="meals">Any allergies or ingredients you don't want to see in your meals? </Label>
            <Input id="meals" placeholder="Mulukhiyah for me" type="text" />
          </LabelInputContainer> */}
        </div>
        <button
          className="bg-gradient-to-br my-5 relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Meal Plan'}   &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

  
      </form>

      {mealPlan && (
        <div>
          <h2>Generated Meal Plan</h2>
          <p>{mealPlan}</p>
        </div>
      )}
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
