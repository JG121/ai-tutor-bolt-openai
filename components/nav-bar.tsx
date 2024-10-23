"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Brain } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export function NavBar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Brain className="h-6 w-6" />
          <span className="font-bold text-xl">AI Learning Assistant</span>
        </Link>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
}