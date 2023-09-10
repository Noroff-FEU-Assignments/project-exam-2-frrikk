"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ProfilePage from "@/app/(routes)/(user-access)/profile/[name]/profile-page";
import { User, useUserContext } from "@/app/_context/user-context";
import { Post, UserProfile } from "@/app/_types/types";
import { JellyTriangle } from "@uiball/loaders";
import MainPage from "@/app/_components/main-page";

interface ProfilePageQueryProps {
  name: string;
}

const getProfile = async ({ name, user }: { name: string; user: User }) => {
  const urls = [
    `https://api.noroff.dev/api/v1/social/profiles/${name}?_followers=true&_following=true`,
    `https://api.noroff.dev/api/v1/social/profiles/${name}/posts`,
  ];

  const [profileResponse, postsResponse] = await Promise.all(
    urls.map((url) =>
      axios.get(url, { headers: { Authorization: `Bearer ${user.jwt}` } }),
    ),
  );

  return {
    profile: profileResponse.data as UserProfile,
    posts: postsResponse.data as Post[],
  };
};

export default function ProfilePageQuery({ name }: ProfilePageQueryProps) {
  const { user } = useUserContext();

  if (!user) return null;

  const { data, isFetching } = useQuery({
    queryKey: ["profile", "posts"],
    queryFn: async () => await getProfile({ name: name, user: user }),
  });

  if (!data) {
    return null;
  }

  if (isFetching) {
    return (
      <MainPage className="flex justify-center items-center">
        <JellyTriangle size={50} />
      </MainPage>
    );
  }

  return <ProfilePage profile={data.profile} posts={data.posts} />;
}
