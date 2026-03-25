import { redirect } from "next/navigation";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    redirect("/configuration");
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <SignUp />
    </main>
  );
}
