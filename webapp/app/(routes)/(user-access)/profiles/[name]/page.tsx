"use client";

import MainPage from "@/app/_components/main-page";
import { User, useUserContext } from "@/app/_context/user-context";
import { useEffect, useState } from "react";
import { Profile } from "@/app/_types/types";
import { IconUserPlus } from "@tabler/icons-react";
import { cn } from "@/app/_utils/twclsx";

async function fetchData(jwt: string, profile: string) {
  const response = await fetch(
    `https://api.noroff.dev/api/v1/social/profiles/${profile}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}` ?? "",
      },
    },
  );

  return response.json();
}

async function followUser({
  jwt,
  name,
}: {
  jwt: string | undefined;
  name: string;
}) {
  const response = await fetch(
    `https://api.noroff.dev/api/v1/social/profiles/${name}/follow`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${jwt}` ?? "",
      },
    },
  );

  // Check the response status code
  if (response.status === 200) {
    // Request was successful, you can handle the response data here
    const data = await response.json();
    console.log("Followed user:", data);
  } else {
    // Handle the error case (e.g., display an error message)
    console.error("Failed to follow user");
  }

  // Return the response for further handling if needed
  return response;
}

export default function ProfilePage({ params }: { params: { name: string } }) {
  const { user } = useUserContext();
  const [profile, setProfile] = useState<Profile>();

  if (!user) return null;

  useEffect(() => {
    const fetchPosts = async () => {
      if (user) {
        const data = await fetchData(user.jwt, params.name);
        setProfile(data);
      }
    };

    fetchPosts();
  }, []);

  async function handleFollow() {
    await followUser({ jwt: user?.jwt, name: params.name });
  }

  const imageStyle =
    "h-[42px] w-[42px] rounded-full object-cover sm:h-[64px] sm:w-[64px] md:h-[84px] md:w-[84px]";

  return (
    <MainPage className="flex flex-col m-auto">
      <p className="flex self-center font-bold mb-8 text-slate-700">
        {params.name}
      </p>
      {profile?.banner ? (
        <img
          className="h-[150px] w-full object-cover md:h-[220px]"
          src={profile?.banner}
          alt={profile?.name + "-banner"}
        />
      ) : (
        <div className="h-[150px] w-full bg-pastel-pink md:h-[220px]" />
      )}
      <div className="flex justify-between items-center mt-8">
        {profile?.avatar ? (
          <img
            className={`${imageStyle}`}
            src={profile.avatar}
            alt={profile.name + "-avatar"}
          />
        ) : (
          <div
            className={cn(
              `flex justify-center font-bold items-center bg-pastel-green text-white md:text-3xl`,
              imageStyle,
            )}
          >
            {profile?.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex justify-between gap-6 md:gap-10">
          <div className="flex flex-col justify-center items-center">
            <span className="font-extrabold sm:text-xl md:text-3xl">
              {profile?._count?.followers ?? 0}
            </span>
            <p className="sm:text-xl md:text-3xl">Followers</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="font-extrabold sm:text-xl md:text-3xl">
              {profile?._count?.following ?? 0}
            </span>
            <p className="sm:text-xl md:text-3xl">Following</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="font-extrabold sm:text-xl md:text-3xl">
              {profile?._count?.posts ?? 0}
            </span>
            <p className="sm:text-xl md:text-3xl">Posts</p>
          </div>
        </div>
      </div>

      <button
        className="flex self-center mt-20 bg-pastel-green p-4 rounded-full text-white"
        onClick={handleFollow}
      >
        <IconUserPlus size={64} />
      </button>
    </MainPage>
  );
}
