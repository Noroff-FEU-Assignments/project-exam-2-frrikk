import { JellyTriangle } from "@uiball/loaders";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center self-center align-middle h-[100%]">
      <JellyTriangle size={50} color="#FFCD1D" />
    </div>
  );
}
