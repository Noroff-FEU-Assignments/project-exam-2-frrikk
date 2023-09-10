import ProfilePageQuery from "@/app/(routes)/(user-access)/profile/[name]/profile-page-query";

export default function ProfilePage({ params }: { params: { name: string } }) {
  return <ProfilePageQuery name={params.name} />;
}
