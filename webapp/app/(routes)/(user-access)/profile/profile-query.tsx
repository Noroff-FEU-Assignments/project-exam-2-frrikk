"use client";

import { useQuery } from "@tanstack/react-query";
import ProfilePage from "@/app/(routes)/(user-access)/profile/profile-page";

export async function getProfile() {
  const data = await fetch(
    `https://api.noroff.dev/api/v1/social/profiles?_followers=true&_following=true&_posts=true`,
  );

  return await data.json();
}
export default function ProfileQuery(props: any) {
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    initialData: props.profile,
  });

  return <ProfilePage data={data} />;
}
