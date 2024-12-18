'use client'
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ChefHat, Download, Menu } from 'lucide-react'
import { Button } from "../button";
import { SheetContent, SheetTrigger,Sheet } from "../sheet";
import { usePathname } from "next/navigation";

export default function Header() {
const pathname = usePathname()

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
            <Link href="/meal-planner" className="text-sm font-semibold  py-1 px-2 rounded-md text-black">
              Credit:  <span className="mx-2">2</span>
            </Link>
          </nav>
          <SignedOut>
            <Button variant="destructive" size="sm" className="px-4">
              <SignInButton />
            </Button>
          </SignedOut>
          <SignedIn>
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