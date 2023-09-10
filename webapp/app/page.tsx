"use client";

import Link from "next/link";
import Splash from "@/app/_components/splash";
import { useUserContext } from "@/app/_context/user-context";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const { user } = useUserContext();
  const router = useRouter();

  if (user) {
    router.push("/home");
  }

  return (
    <>
      <Splash fig={12} />
      <h1 className="flex flex-col justify-center italic items-center font-serif font-medium text-xl text-slate-700 mt-4">
        Welcome to{" "}
        <span className="font-sans not-italic font-extrabold text-4xl">
          SOME
        </span>
      </h1>
      <div className="flex flex-col justify-start items-start mt-8 not-italic font-sans ">
        <label htmlFor="main-cta" className="mb-1">
          Join the community
        </label>
        <Link href={"/sign-up"} className="w-full">
          <button
            name="main-cta"
            id="main-cta"
            className="w-full bg-pastel-green rounded-xl p-3 text-white font-medium text-lg"
          >
            Sign up
          </button>
        </Link>
      </div>
      <div className="mt-3 flex gap-1 flex-col">
        <Link href={"/login"}>
          Already have an account? <span className="underline">Log in</span>
        </Link>
      </div>
    </>
  );
}
