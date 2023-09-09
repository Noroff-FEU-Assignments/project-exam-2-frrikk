"use client";

import { useState, useEffect } from "react";
import { UserContext, useUserContext } from "@/app/_context/user-context";
import MainPage from "@/app/_components/main-page";
import placeholderImage from "@/public/placeholder-image.png";
import Image from "next/image";

async function fetchData(jwt: string) {
  const response = await fetch("https://api.noroff.dev/api/v1/social/posts", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}` ?? "",
    },
  });

  return response.json();
}

export default function HomePage() {
  const { user } = useUserContext();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchDataAndSetPosts = async () => {
      if (user) {
        const data = await fetchData(user.jwt);
        setPosts(data);
      }
    };

    fetchDataAndSetPosts();
  }, [user]);

  if (!user) return null;

  return (
    <MainPage>
      <ul>
        {posts.map((post: Post) => (
          <UserPost post={post} key={post.id} />
        ))}
      </ul>
    </MainPage>
  );
}

interface UserPostsProps {
  post: Post;
}
const UserPost = ({ post }: UserPostsProps) => {
  return (
    <li className="flex flex-col gap-2 mb-4 justify-center items-center">
      <div className="flex"></div>
      {post.media ? (
        <div className="w-full h-[400px]">
          <img
            src={post.media}
            alt={post.title + "-image"}
            className="object-cover w-full h-full"
          />
        </div>
      ) : (
        <Image
          src={placeholderImage}
          alt={"placeholder"}
          height={200}
          className="w-full border max-h-[500px]"
        />
      )}
      <p className="flex self-start">
        {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
      </p>
    </li>
  );
};

interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  media: string | null;
  created: Date;
  count: { comments: number; reactions: number };
}
