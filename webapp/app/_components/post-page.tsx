"use client";

import React, { useState, useEffect } from "react";
import { useUserContext } from "@/app/_context/user-context";
import placeholderImage from "@/public/placeholder-image.png";
import Image from "next/image";
import { Post } from "@/app/_types/types";

const INITIAL_LIMIT = 10;
const INITIAL_OFFSET = 0;

async function fetchData(jwt: string, limit: number, offset: number) {
  const url = `https://api.noroff.dev/api/v1/social/posts?sort=created&sortOrder=desc&limit=${limit}&offset=${offset}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}` ?? "",
    },
  });

  return response.json();
}

export default function PostsPage() {
  const { user } = useUserContext();
  const [posts, setPosts] = useState<Post[]>([]);
  const [limit] = useState(INITIAL_LIMIT);
  const [offset, setOffset] = useState(INITIAL_OFFSET);

  useEffect(() => {
    const fetchPosts = async () => {
      if (user) {
        const data = await fetchData(user.jwt, limit, offset);
        setPosts((prevPosts) => [...prevPosts, ...data]);
      }
    };

    fetchPosts();
  }, [user, limit, offset]);

  const loadMore = () => {
    setOffset(offset + limit);
  };

  if (!user) return null;

  return (
    <div className="flex flex-col justify-center">
      <ul className="mt-5">
        {posts.map((post: Post) => (
          <UserPost post={post} key={post.id} />
        ))}
      </ul>
      <button
        onClick={loadMore}
        className="bg-pastel-green text-white font-bold p-3 mb-4 rounded mt-4 "
      >
        Load more posts
      </button>
    </div>
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
          className="w-full border max-h-[500px] object-cover"
        />
      )}
      <p className="flex self-start">
        {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
      </p>
    </li>
  );
};
