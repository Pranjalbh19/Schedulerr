import React from "react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import UserMenu from "./ui/user-menu";
import { UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { PenBox } from "lucide-react";
import { checkUser } from "@/lib/checkUser";

async function Header() {
  await checkUser();

  return (
    <nav className="mx-auto py-2 px-4 flex justify-between items-center shadow-md border-b-2 bg-gray-600 text-white">
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          width="150"
          height="60"
          alt="Schedulrr Logo"
          className="h-16 w-auto"
        />
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/events?create=true">
          <Button variant="default" className="flex items-center gap-2 bg-white text-black hover:bg-gray-200">
            <PenBox size={18} />
            <span className="hidden sm:inline">Create Event</span>
          </Button>
        </Link>
        <SignedOut>
          <SignInButton forceRedirectUrl="/dashboard">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              Login
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserMenu />
        </SignedIn>
      </div>
    </nav>
  );
}

export default Header;
