import ProfileQuery, {
  getProfile,
} from "@/app/(routes)/(user-access)/profile/profile-query";

export default async function Profile() {
  const initialData = await getProfile();

  return <ProfileQuery profile={initialData} />;
}
