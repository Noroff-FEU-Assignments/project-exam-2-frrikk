import MainPage from "@/app/_components/main-page";

async function fetchData(jwt: string) {
  const response = await fetch("https://api.noroff.dev/api/v1/social/posts", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}` ?? "",
    },
  });

  return response.json();
}

export default function ProfilePage({ params }: { params: { name: string } }) {
  return <MainPage>My Post: {params.name}</MainPage>;
}
