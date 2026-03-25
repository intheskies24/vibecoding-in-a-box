import { redirect } from "next/navigation";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    redirect("/configuration");
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <SignIn />
    </main>
  );
}
