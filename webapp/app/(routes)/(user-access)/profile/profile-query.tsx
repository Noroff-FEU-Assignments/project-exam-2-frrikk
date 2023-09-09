"use client";

import { useQuery } from "@tanstack/react-query";
import ProfilePage from "@/app/(routes)/(user-access)/profile/profile-page";
import axios from "axios";
import { User, useUserContext } from "@/app/_context/user-context";

const getPosts = async ({ user }: { user: User }) => {
  if (!user) {
    return null;
  }

  return await axios.get("https://api.noroff.dev/api/v1/social/posts", {
    headers: { Authorization: `Bearer ${user.jwt}` },
  });
};

export default function ProfileQuery(props: any) {
  const { user } = useUserContext();

  if (!user) return null;

  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => await getPosts({ user }),
    initialData: props.posts,
  });

  console.log({ data });

  return <ProfilePage data={data} />;
}
