import { ReactNode } from "react";
import { cn } from "@/app/_utils/twclsx";

export default function MainPage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "py-4 px-4 sm:px-8 bg-white flex-col rounded-t-2xl flex m-auto shadow-2xl relative max-w-[800px] min-h-[100%] pb-32",
        className,
      )}
    >
      {children}
    </div>
  );
}
