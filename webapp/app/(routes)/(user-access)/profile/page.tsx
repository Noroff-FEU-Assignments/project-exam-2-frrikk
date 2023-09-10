import ProfileQuery from "@/app/(routes)/(user-access)/profile/profile-query";

const getProfile = async () =>
  await fetch("https://api.noroff.dev/api/v1/social/profiles/").then((data) =>
    data.json(),
  );

export default async function Profile() {
  const initialData = await getProfile();

  return <ProfileQuery posts={initialData} />;
}
