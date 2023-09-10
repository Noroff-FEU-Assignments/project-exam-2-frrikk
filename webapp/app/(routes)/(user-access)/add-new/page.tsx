import HomeQuery from "@/app/(routes)/(user-access)/home/home-query";

const getPosts = async () =>
  await fetch(
    "https://api.noroff.dev/api/v1/social/posts?_author=true&_comments=true&_reactions=true&sort=created&sortOrder=desc",
  ).then((data) => data.json());

export default async function Profile() {
  const initialData = await getPosts();

  return <HomeQuery posts={initialData} />;
}
