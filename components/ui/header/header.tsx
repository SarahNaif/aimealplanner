import Image from "next/image";
// import { ModeToggle } from "../mode-toggle/mode-toggle";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  return (
    <header className="absolute z-10 flex w-full items-center justify-between p-5 ">
      <Link href={"/"} className="flex">
        <Image
          width={60}
          height={60}
          src={"/icon.png"}
          alt="The Chef"
          priority
        />
 
      </Link>

      <div className="flex gap-3">
        {/* <ModeToggle /> */}

        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}