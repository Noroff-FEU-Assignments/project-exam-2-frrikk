import MainPage from "@/app/_components/main-page";
import { JellyTriangle } from "@uiball/loaders";

export default function LoadingState() {
  return (
    <MainPage className="flex justify-center items-center">
      <JellyTriangle size={50} />
    </MainPage>
  );
}
