import { type NextPage } from "next";
import Link from "next/link";
import { UserButton, SignInButton } from "@clerk/nextjs";
import Counter from '@/components/counter';
import { Button } from '@/components/ui/button';
import { Header } from "@/components/layout/header";
import { PCC } from "@/utils/react";

export default function Page() {
  return (
    <>
      <main>
        <h1>Home page</h1>
      </main>
    </>
  );
};

