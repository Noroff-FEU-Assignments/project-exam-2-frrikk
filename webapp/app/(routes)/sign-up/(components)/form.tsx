"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import React, { ReactNode } from "react";
import { postFetch } from "@/app/_utils/fetch";

import {
  IconExclamationCircle,
  IconLock,
  IconMail,
  IconUserCircle,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: { name: "", email: "", password: "" } });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await postFetch("auth/register", data);
    toast.success("User created!", {
      duration: 2000,
    });
    setTimeout(() => router.push("/login"), 2000);
  };

  const inputClasses = "w-full p-2 rounded-lg placeholder:text-slate-700";
  const emailRegex = /(@stud\.noroff\.no|@noroff\.no)$/;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <div>
        <FormStyle hasError={!!errors.name}>
          <label htmlFor="name">{<IconUserCircle stroke={1.5} />}</label>
          <input
            placeholder="Username"
            id="name"
            className={inputClasses}
            {...register("name", { required: "Please provide a name" })}
          />
        </FormStyle>
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>
      <div>
        <FormStyle>
          <label htmlFor="email">{<IconMail stroke={1.5} />}</label>
          <input
            placeholder="yourmail@domain.com"
            id="email"
            className={inputClasses}
            {...register("email", {
              required: "Please provide an email",
              pattern: {
                value: emailRegex,
                message:
                  "Please provide an email ending with @noroff.no or @stud.noroff.no",
              },
            })}
          />
        </FormStyle>
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </div>
      <div>
        <FormStyle>
          <label htmlFor="password">{<IconLock stroke={1.5} />}</label>
          <input
            placeholder="Password"
            id="password"
            type="password"
            className={inputClasses}
            {...register("password", {
              required: "The password must be at least 8 characters",
              minLength: {
                value: 8,
                message: "The password must be at least 8 characters",
              },
            })}
          />
        </FormStyle>
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
      </div>
      <button
        type="submit"
        name="main-cta"
        id="main-cta"
        className="w-full bg-pastel-green rounded-xl p-3 text-white font-medium text-lg self-end mt-6"
      >
        Sign up
      </button>
      <Toaster />
    </form>
  );
}

const FormStyle = ({
  children,
  className,
  hasError,
}: {
  children: ReactNode;
  className?: string;
  hasError?: boolean;
}) => (
  <div
    className={`flex border border-slate-200 items-center gap-2 rounded-xl pl-2 pr-1 py-1 p-2 ${className} ${
      hasError && "border-red-500 border-2"
    }`}
  >
    {children}
  </div>
);

const ErrorMessage = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex gap-1 mt-1 text-sm items-center text-red-800">
      <IconExclamationCircle stroke={2} className="w-[16px]" />
      <p>{children}</p>
    </div>
  );
};
