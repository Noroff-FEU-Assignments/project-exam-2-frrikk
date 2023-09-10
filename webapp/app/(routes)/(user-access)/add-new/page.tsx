import HomeQuery from "@/app/(routes)/(user-access)/home/home-query";
import { User } from "@/app/_context/user-context";
import { BodyPost } from "@/app/_types/types";
import axios from "axios";

const getPosts = async () =>
  await fetch(
    "https://api.noroff.dev/api/v1/social/posts?_author=true&_comments=true&_reactions=true&sort=created&sortOrder=desc",
  ).then((data) => data.json());

export default async function Profile() {
  const initialData = await getPosts();

  return <HomeQuery posts={initialData} />;
}

// const createPost = async ({
//                             user,
//                             newPost,
//                           }: {
//   user: User;
//   newPost: BodyPost;
// }) => {
//   if (!user) {
//     return null;
//   }
//
//   return await axios.post(
//       `https://api.noroff.dev/api/v1/social/posts`,
//       newPost,
//       {
//         headers: { Authorization: `Bearer ${user.jwt}` },
//       },
//   );
// };
