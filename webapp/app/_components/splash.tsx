import { cn } from "@/app/_utils/twclsx";

const getRandomColor = () => {
  const colors = [
    "bg-pastel-purple",
    "bg-pastel-pink",
    "bg-pastel-lightPurple",
    "bg-pastel-lightGreen",
    "bg-pastel-green",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

interface SplashProps {
  fig: number;
}
export default function Splash({ fig }: SplashProps) {
  return (
    <div
      className={cn(
        `grid grid-cols-3 grid-rows-4 gap-4 p-4 sm:p-0 sm:mt-4 w-[250px] h-[333px] self-center`,
      )}
    >
      {[...Array(fig).keys()].map((index) => (
        <div
          key={index}
          className={`w-full h-full ${
            index % 2 === 0
              ? getRandomColor()
              : "rounded-full " + getRandomColor()
          }`}
        ></div>
      ))}
    </div>
  );
}
