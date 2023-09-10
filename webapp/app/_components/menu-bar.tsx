"use client";

import {
  IconSmartHome,
  IconSquareRoundedPlusFilled,
  IconUser,
} from "@tabler/icons-react";
import React, { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/app/_utils/twclsx";
import { useUserContext } from "@/app/_context/user-context";

export default function MenuBar({ className }: { className?: string }) {
  const { user } = useUserContext();

  if (user) {
    return (
      <nav
        className={cn(
          `py-4 px-4 sm:px-8 border-t border-slate-200 flex bg-white w-[100%] max-w-[800px]  m-auto fixed bottom-0 left-0 right-0 justify-between ${className} `,
        )}
      >
        <ul className="flex justify-between w-full">
          <NavItem>
            <Link href="/home">
              <IconSmartHome size={32} />
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/add-new">
              <IconSquareRoundedPlusFilled size={50} />
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/profile">
              <IconUser size={32} />
            </Link>
          </NavItem>
        </ul>
      </nav>
    );
  }

  return null;
}

const NavItem = ({ children }: { children: ReactNode }) => {
  return <li className=" flex justify-center items-center mx-2">{children}</li>;
};
