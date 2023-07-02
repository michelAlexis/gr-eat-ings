"use client"

import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

interface Props {
  className?: string;
}
export function UserBar({ className }: Props) {
  const user = useUser();

  return <div className={className}>
    {user.user ? <UserButton afterSignOutUrl='/' /> : <SignInButton />}
  </div>;
}
