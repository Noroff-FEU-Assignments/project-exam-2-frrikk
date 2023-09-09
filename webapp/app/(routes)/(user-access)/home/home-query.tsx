"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User, useUserContext } from "@/app/_context/user-context";
import HomePage from "@/app/(routes)/(user-access)/home/home-page";
import MainPage from "@/app/_components/main-page";

const getPosts = async ({ user }: { user: User }) => {
  if (!user) {
    return null;
  }

  return await axios.get(
    "https://api.noroff.dev/api/v1/social/posts?_author=true&_comments=true&_reactions=true&sort=created&sortOrder=desc",
    {
      headers: { Authorization: `Bearer ${user.jwt}` },
    },
  );
};

export default function HomeQuery(props: any) {
  const { user } = useUserContext();

  if (!user) return null;

  const { data, error, isFetching } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => await getPosts({ user }),
    initialData: props.posts,
  });

  if (error) {
    throw new Error("An error has occured", { cause: error });
  }

  if (isFetching) {
    return <Loading />;
  }

  return <HomePage data={data} />;
}

const Loading = () => <MainPage>Loading...</MainPage>;
