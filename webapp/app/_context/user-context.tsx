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

interface UserContext {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}
export const UserContext = createContext<UserContext | null>(null);

interface User {
  name: string;
  jwt: string;
  isLoggedIn: boolean;
}

interface UserContextProps {
  children: ReactNode;
}
export default function UserContextProvider({ children }: UserContextProps) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

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
