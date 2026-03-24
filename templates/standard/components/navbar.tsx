import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 max-w-4xl h-14 flex items-center justify-between">
        <Link href="/tasks" className="font-semibold text-sm">
          My App
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/tasks"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Tasks
          </Link>
          <UserButton afterSignOutUrl="/" />
        </nav>
      </div>
    </header>
  );
}
