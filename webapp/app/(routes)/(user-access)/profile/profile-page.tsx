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

  const userData: UserProfile | any = data[0];
  const profileData: ProfilePost[] | any = data[1];

  return (
    <MainPage>
      <h1 className="text-slate-500">
        Welcome to your corner{" "}
        <span className="text-slate-700 font-semibold">{user.name}</span>
      </h1>
      <div className="flex justify-between mt-8 items-center">
        {userData.avatar ? (
          <img
            className="h-10 w-10 sm:h-14 sm:w-14 rounded-full"
            src={userData.avatar}
            alt={user.name + "-avatar"}
          />
        ) : (
          <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-full bg-pastel-pink text-white font-bold flex justify-center items-center">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <p className="font-bold text-lg">
              {userData.data._count.followers}
            </p>
            <p className="text-slate-600 text-sm sm:text-lg">Followers</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-bold text-lg">
              {userData.data._count.following}
            </p>
            <p className="text-slate-600 text-sm sm:text-lg">Following</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-bold text-lg">{userData.data._count.posts}</p>
            <p className="text-slate-600 text-sm sm:text-lg">Posts</p>
          </div>
        </div>
      </div>
      <hr className="my-10" />
      <ul className="grid grid-cols-2 sm:grid-cols-3">
        {profileData.data.map((post: ProfilePost) => (
          <li
            className="border p-2 h-[150px] sm:h-[200px] lg:h-[250px]"
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
