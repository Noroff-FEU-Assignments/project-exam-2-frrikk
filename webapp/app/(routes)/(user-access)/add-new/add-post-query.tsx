"use client";
import toast, { Toaster } from "react-hot-toast";
import { User, useUserContext } from "@/app/_context/user-context";
import { BodyPost } from "@/app/_types/types";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import AddPostForm from "@/app/(routes)/(user-access)/add-new/add-post-form";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

async function addPost({ user, bodyData }: { user: User; bodyData: BodyPost }) {
  const response = await axios.post(
    `https://api.noroff.dev/api/v1/social/posts`,
    bodyData,
    {
      headers: { Authorization: `Bearer ${user.jwt}` },
    },
  );

  return response.data as BodyPost;
}
export default function AddPostQuery() {
  const { user } = useUserContext();
  const router = useRouter();

  if (!user) return null;

  const { mutate, status } = useMutation((bodyData: BodyPost) => {
    return addPost({ user: user, bodyData: bodyData });
  });

  useEffect(() => {
    if (status === "success") {
      toast.success("Post created!", { duration: 1000 });
      setTimeout(() => router.push("/home"), 1000);
    }

    if (status === "error") {
      toast.error("Oopsie! Looks like something went wrong, please try again");
    }
  }, [status]);

  return (
    <>
      <h1 className="text-slate-700 mb-8">
        Go ahead, add a post to your{" "}
        <span className="text-black font-bold">corner</span>
      </h1>
      <AddPostForm mutate={mutate} />
      <Toaster />
    </>
  );
}
