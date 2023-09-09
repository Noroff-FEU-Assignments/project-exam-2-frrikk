"use client";

import React, { useState, useEffect } from "react";
import { useUserContext } from "@/app/_context/user-context";
import Link from "next/link";
import { Profile } from "@/app/_types/types";

const INITIAL_LIMIT = 20;
const INITIAL_OFFSET = 0;

async function fetchData(jwt: string, limit: number, offset: number) {
  const url = `https://api.noroff.dev/api/v1/social/profiles?sortOrder=asc&limit=${limit}&offset=${offset}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}` ?? "",
    },
  });

  return response.json();
}

export default function ProfilePage() {
  const { user } = useUserContext();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [limit] = useState(INITIAL_LIMIT);
  const [offset, setOffset] = useState(INITIAL_OFFSET);

  useEffect(() => {
    const fetchProfiles = async () => {
      if (user) {
        const data = await fetchData(user.jwt, limit, offset);
        setProfiles((prevProfiles) => [...prevProfiles, ...data]);
      }
    };

    fetchProfiles();
  }, [user, limit, offset]);

  const loadMore = () => {
    setOffset(offset + limit);
  };

  if (!user) return null;

  return (
    <div className="flex flex-col justify-center">
      <ul className="flex flex-col mt-5">
        {profiles.map((profile: Profile) => (
          <UserProfile profile={profile} key={profile.email} />
        ))}
      </ul>
      <button
        onClick={loadMore}
        className="bg-pastel-green text-white font-bold p-3 mb-4 rounded mt-4 "
      >
        Load more profiles
      </button>
    </div>
  );
}

interface UserProfileProps {
  profile: Profile;
}

const UserProfile = ({ profile }: UserProfileProps) => {
  return (
    <li className="flex gap-2 mb-4 w-full">
      <Link
        href={`/profiles/${profile.name}`}
        className="flex justify-center items-center gap-2"
      >
        {profile.avatar ? (
          <img
            src={profile.avatar}
            className="object-cover h-[42px] w-[42px] rounded-full border"
            alt={profile.name + "-avatar"}
          />
        ) : (
          <div className="object-cover h-[42px] w-[42px] rounded-full bg-pastel-lightGreen text-pastel-green flex justify-center items-center align-middle font-bold">
            {profile.name.charAt(0).toUpperCase()}
          </div>
        )}
        <p className="text-xl">{profile.name}</p>
      </Link>
    </li>
  );
};
