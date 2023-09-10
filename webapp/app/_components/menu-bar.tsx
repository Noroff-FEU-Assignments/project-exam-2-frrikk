"use client";

import { IconSmartHome, IconUser, IconSquarePlus } from "@tabler/icons-react";
import React, { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/app/_utils/twclsx";
import { useUserContext } from "@/app/_context/user-context";
import { usePathname } from "next/navigation";

export default function MenuBar({ className }: { className?: string }) {
  const { user } = useUserContext();
  const path = usePathname();

  if (user) {
    return (
      <nav
        className={cn(
          `py-4 px-4 sm:px-8 border-t border-slate-200 flex bg-white w-[100%] max-w-[800px]  m-auto fixed bottom-0 left-0 right-0 justify-between ${className} `,
        )}
      >
        <ul className="flex justify-between w-full">
          <NavItem>
            <Link
              href="/home"
              className="w-full h-full flex justify-center items-center"
            >
              {path === "/home" ? (
                <div className="w-[50px] h-[50px] flex justify-center items-center">
                  <IconSmartHome
                    color={"#fff"}
                    className="flex justify-center items-center bg-slate-800 rounded-full p-2 w-full h-full self-center transition duration-500"
                  />
                </div>
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <IconSmartHome size={35} />
                </div>
              )}
            </Link>
          </NavItem>
          <NavItem>
            <Link
              href="/add-new"
              className="w-full h-full flex justify-center items-center"
            >
              {path === "/add-new" ? (
                <div className="w-[50px] h-[50px] flex justify-center items-center">
                  <IconSquarePlus
                    color={"#fff"}
                    className="flex justify-center items-center bg-slate-800 rounded-full p-2 w-full h-full self-center transition duration-500"
                  />
                </div>
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <IconSquarePlus size={35} />
                </div>
              )}
            </Link>
          </NavItem>
          <NavItem>
            <Link
              href="/profile"
              className="w-full h-full flex justify-center items-center"
            >
              {path === "/profile" ? (
                <div className="w-[50px] h-[50px] flex justify-center items-center">
                  <IconUser
                    color={"#fff"}
                    className="flex justify-center items-center bg-slate-800 rounded-full p-2 w-full h-full self-center transition duration-500"
                  />
                </div>
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <IconUser size={35} />
                </div>
              )}
            </Link>
          </NavItem>
        </ul>
      </nav>
    );
  }

  return null;
}

const NavItem = ({ children }: { children: ReactNode }) => {
  return (
    <li className="flex justify-center items-center h-[50px] w-[50px]">
      {children}
    </li>
  );
};
