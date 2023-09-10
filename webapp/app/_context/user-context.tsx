"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";

interface UserContext {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}
export const UserContext = createContext<UserContext | null>(null);

export interface User {
  name: string;
  jwt: string;
  isLoggedIn: boolean;
}

interface UserContextProps {
  children: ReactNode;
}
export default function UserContextProvider({ children }: UserContextProps) {
  const [user, setUser] = useState<User | null>(() => {
    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, []);

    return null;
  });

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Using context outside");
  }

  return context;
};
