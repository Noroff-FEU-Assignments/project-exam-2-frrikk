"use client";

import MainPage from "@/app/_components/main-page";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/app/_context/user-context";

export default function AddNew() {
  const router = useRouter();
  const { user } = useUserContext();

  if (!user) {
    return router.push("/");
  }
  return <MainPage>Add new thingy</MainPage>;
}
