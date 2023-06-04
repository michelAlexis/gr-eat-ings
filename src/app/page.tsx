import { type NextPage } from "next";
import Link from "next/link";
import { UserButton, SignInButton } from "@clerk/nextjs";

const Home: NextPage = () => {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#a06ce9] to-[#444783]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className='bg-white'>
            <UserButton afterSignOutUrl='/' />
            <SignInButton />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
