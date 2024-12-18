import SqBackGrounds from "@/components/shared/SqBackGrounds";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
   <SqBackGrounds>
    <main className="flex  items-center justify-center ">
      <SignIn />
    </main>
    </SqBackGrounds>
  );
}