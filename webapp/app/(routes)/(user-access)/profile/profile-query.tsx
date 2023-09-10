"use client";

import { useQuery } from "@tanstack/react-query";
import ProfilePage from "@/app/(routes)/(user-access)/profile/profile-page";
import axios from "axios";
import { User, useUserContext } from "@/app/_context/user-context";

const getProfile = async ({ user }: { user: User }) => {
  if (!user) {
    return null;
  }

  const urls = [
    `https://api.noroff.dev/api/v1/social/profiles/${user.name}?_followers=true&_following=true`,
    `https://api.noroff.dev/api/v1/social/profiles/${user.name}/posts`,
  ];

  return await Promise.all(
    urls.map((url) =>
      axios.get(url, { headers: { Authorization: `Bearer ${user.jwt}` } }),
    ),
  );
};

export default function ProfileQuery(props: any) {
  const { user } = useUserContext();

  if (!user) return null;

  const { data, isFetching, error } = useQuery({
    queryKey: ["profile", "post"],
    queryFn: async () => await getProfile({ user }),
    initialData: props.profile,
  });

  if (!data) return null;

  if (error) {
    throw new Error("Error has occurred", error);
  }

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return <ProfilePage data={data} user={user} />;
}
