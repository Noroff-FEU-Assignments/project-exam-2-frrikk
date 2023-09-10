import { Post } from "@/app/_types/types";
import MainPage from "@/app/_components/main-page";
import Link from "next/link";
import Image from "next/image";
import placeholderImage from "@/public/placeholder-image.png";
import React from "react";
import { IconMessageCircle2, IconMoodSmileBeam } from "@tabler/icons-react";
import { format } from "date-fns";

export default function HomePage({ data }: any) {
  const formattedDate = (date: Date | string) =>
    format(new Date(date), "yyyy-MM-dd HH:mm");
  return (
    <MainPage>
      <ul className="flex flex-col gap-8">
        {data.data?.map((post: Post) => {
          return (
            <li key={post.id} className="flex flex-col gap-2">
              <Link
                href={`profiles/${post.author.name}`}
                className="flex gap-2 items-center"
              >
                <div>
                  {post.author.avatar ? (
                    <img
                      src={post.author.avatar}
                      alt={post.author.name + "-avatar"}
                      className="h-8 w-8 object-cover rounded-full"
                    />
                  ) : (
                    <div className="h-8 w-8 object-cover rounded-full flex justify-center items-center bg-pastel-lightGreen text-white font-bold">
                      {post.author.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <p>{post.author.name}</p>
              </Link>
              <div>
                {post.media ? (
                  <img
                    src={post.media}
                    alt={post.title + "-image"}
                    className="object-cover w-full h-[400px]"
                  />
                ) : (
                  <Image
                    src={placeholderImage}
                    alt={"placeholder"}
                    height={400}
                    className="w-full border h-[400px] object-cover"
                  />
                )}
              </div>
              <div className="flex justify-between">
                <div className="flex gap-1 items-center">
                  <IconMoodSmileBeam
                    size={42}
                    className="bg-pastel-yellow p-2 rounded-full"
                  />
                  <p>{post._count.reactions ? post._count.reactions : null}</p>
                </div>
                <div className="flex gap-1 items-center relative">
                  <IconMessageCircle2
                    size={42}
                    className="bg-pastel-pink p-2 rounded-full"
                  />
                  <p>{post._count.comments ? post._count.comments : null}</p>
                </div>
              </div>
              {!!post.body ? (
                <div className="flex gap-1">
                  <p className="font-bold text-sm">{post.author.name}</p>
                  <p className="text-sm max-w-[70ch] whitespace-nowrap overflow-hidden overflow-ellipsis">
                    {post.body}
                  </p>
                </div>
              ) : null}
              <p className="text-sm text-slate-500">
                posted at {formattedDate(post.created)}
              </p>
            </li>
          );
        })}
      </ul>
    </MainPage>
  );
}
