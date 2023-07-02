import { SignInButton, UserButton } from "@clerk/nextjs";
import { UserBar } from "./user-bar";
import Link from "next/link";
import { Button } from "../ui/button";


export function Header() {
  return <>
    <header className="flex items-center p-2 border-b border-foreground/30">
      <h2 className="text-2xl mr-4">Gr-ear-ings</h2>
      <Button variant="link" asChild>
        <Link href={'ingredient/create'}>Create ingredients</Link>
      </Button>
      <UserBar className="flex-1 flex justify-end" />
    </header>
  </>;
}
