import { ReactNode } from "react";

export default function MainPage({ children }: { children: ReactNode }) {
  return (
    <div className="py-4 px-4 sm:px-8 bg-white flex-col rounded-2xl flex m-auto shadow-2xl relative max-w-[800px] min-h-[100%]">
      {children}
    </div>
  );
}
