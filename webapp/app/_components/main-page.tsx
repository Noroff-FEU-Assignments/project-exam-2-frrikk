import { ReactNode } from "react";

export default function MainPage({ children }: { children: ReactNode }) {
  return (
    <div className="py-4 px-4 sm:px-8 bg-white flex-col rounded-2xl flex h-[100%] m-auto shadow-2xl relative">
      {children}
    </div>
  );
}
