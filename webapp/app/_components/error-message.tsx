import React, { ReactNode } from "react";
import { IconExclamationCircle } from "@tabler/icons-react";

export const ErrorMessage = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex gap-1 mt-1 text-sm items-center text-red-800">
      <IconExclamationCircle stroke={2} className="min-w-[16px] w-[16px]" />
      <p>{children}</p>
    </div>
  );
};
