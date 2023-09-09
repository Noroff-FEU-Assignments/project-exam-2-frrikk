import ProfileQuery from "@/app/(routes)/(user-access)/profile/profile-query";

const getPosts = async () =>
  await fetch("https://api.noroff.dev/api/v1/social/posts").then((data) =>
    data.json(),
  );

export default async function Profile() {
  const initialData = await getPosts();

  return <ProfileQuery posts={initialData} />;
}
