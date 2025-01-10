'use client'
import { SignInButton, SignedIn, SignedOut, UserButton, useAuth, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { ChefHat, Download, Menu } from 'lucide-react'
import { Button } from "../ui/button";
import { SheetContent, SheetTrigger,Sheet } from "../ui/sheet";
import { usePathname } from "next/navigation";
import { useCreditStore } from "@/store/creditStore";
import { useEffect } from "react";

export default function Header() {
const pathname = usePathname();
const { userId } = useAuth();
const { setCredits, credits} = useCreditStore();
const clerk = useClerk()

  useEffect(() => {
    if (userId) {
      
      const fetchUserCredits = async () => {
        try {
          const res = await fetch(`/api/credits?userId=${userId}`);
          const data = await res.json();
          if (data.credits && data.plan) {
            setCredits(data.credits, data.plan); // Store in Zustand
          }
        } catch (err) {
          console.error("Error fetching credits:", err);
        }
      };

      fetchUserCredits();
    }
  }, [userId, setCredits]);

  const handleSignOut = () => {
    clerk.signOut(); 
    setCredits(2, "Free"); 
  };


  return (
    <header className={`absolute z-10 flex w-full items-center justify-between px-5 ${pathname === '/' ? 'bg-transparent': 'bg-white border-b'} `}>
      <div className="flex h-14 w-full items-center justify-between">
        <div className="flex">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <ChefHat className="h-6 w-6 -mt-1" />
            <span>AI Chef</span>
          </Link>
          <nav className="hidden md:flex flex-1 items-center gap-7 px-6">
            <Link href="/meal-planner" className="text-sm font-medium">
              Meal Planner
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
     
          <nav className="hidden md:flex flex-1 items-center gap-7 px-6">
            <Link href="/credits" className="text-sm font-semibold  py-1 px-2 rounded-md text-black">
              Credit:  <span className="mx-1 font-bold">{credits}</span>
            </Link>
          </nav>
          <SignedOut>
            <Button variant="destructive" size="sm" className="px-4">
              <SignInButton />
            </Button>
          </SignedOut>
          <SignedIn>
          <Button onClick={handleSignOut} variant="destructive" size="sm" className="px-4">
              Sign Out
            </Button>
            <UserButton />
          </SignedIn>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4">
                <Link href="/meal-planner" className="text-sm font-medium">
                  Meal Planner
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}