import { SignUp } from "@clerk/nextjs";
import SqBackGrounds from "@/components/ui/Background/SqBackGrounds";

export default function SignUpPage() {
  return (
    <SqBackGrounds>
    <main className="flex h-screen items-center justify-center">
      <SignUp />
    </main>
    </SqBackGrounds>
  );
}
