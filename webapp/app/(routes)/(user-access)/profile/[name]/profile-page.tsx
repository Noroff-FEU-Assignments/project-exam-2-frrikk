import MainPage from "@/app/_components/main-page";
import { Post, UserProfile } from "@/app/_types/types";
import Image from "next/image";
import placeholderImage from "@/public/placeholder-image.png";

interface ProfilePageDataProps {
  profile: UserProfile;
  posts: Post[];
}
export default function ProfilePage({ profile, posts }: ProfilePageDataProps) {
  return (
    <>
      <h1 className="text-slate-500">
        Welcome to{" "}
        <span className="text-slate-700 font-semibold">{profile.name}'s</span>{" "}
        corner
      </h1>
      <div className="flex justify-between mt-8 items-center">
        {profile.avatar ? (
          <img
            className="h-10 w-10 sm:h-14 sm:w-14 rounded-full"
            src={profile.avatar}
            alt={profile.name + "-avatar"}
          />
        ) : (
          <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-full bg-pastel-pink text-white font-bold flex justify-center items-center">
            {profile.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <p className="font-bold text-lg">{profile._count.followers}</p>
            <p className="text-slate-600 text-sm sm:text-lg">Followers</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-bold text-lg">{profile._count.following}</p>
            <p className="text-slate-600 text-sm sm:text-lg">Following</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-bold text-lg">{profile._count.posts}</p>
            <p className="text-slate-600 text-sm sm:text-lg">Posts</p>
          </div>
        </div>
      </div>
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-1 mt-10">
        {posts.map((post: Post) => (
          <li className="border p-2 h-[150px] sm:h-[200px]" key={post.id}>
            <div className="h-[100%] w-[100%] m-0 flex flex-1">
              {post.media ? (
                <img
                  className="w-full h-full object-cover"
                  src={post.media}
                  alt={profile.name + post.title}
                />
              ) : (
                <Image
                  className="w-full h-full object-cover"
                  src={placeholderImage}
                  alt="placeholder"
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
