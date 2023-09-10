import MainPage from "@/app/_components/main-page";
import { ProfilePost, UserProfile } from "@/app/_types/types";
import { User } from "@/app/_context/user-context";
import Link from "next/link";
import Image from "next/image";
import placeholderImage from "@/public/placeholder-image.png";

export default function ProfilePage({
  data,
  user,
}: {
  data: ProfilePost[] | UserProfile | any;
  user: User;
}) {
  console.log({ data });
  console.log({ user });

  return (
    <MainPage>
      <h1 className="text-slate-500">
        Welcome to your corner{" "}
        <span className="text-slate-700 font-semibold">{user.name}</span>
      </h1>
      <ul className="grid grid-cols-2 md:grid-cols-3 mt-8">
        {data[1].data.map((post: ProfilePost) => (
          <li
            className="border p-2 h-[150px] sm:h-[200px] lg:h-[2500px]"
            key={post.id}
          >
            <Link
              className="h-[100%] w-[100%] m-0 flex flex-1"
              href={`/profile/${post.id}`}
            >
              {post.media ? (
                <img
                  className="w-full h-full object-cover"
                  src={post.media}
                  alt={user.name + post.title}
                />
              ) : (
                <Image
                  className="w-full h-full object-cover"
                  src={placeholderImage}
                  alt="placeholder"
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </MainPage>
  );
}
