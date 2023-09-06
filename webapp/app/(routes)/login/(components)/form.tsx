"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import React, { ReactNode, useEffect, useState } from "react";
import { IconExclamationCircle, IconLock, IconMail } from "@tabler/icons-react";
import { useMutation } from "@/app/_hooks/useMutation";
import { useRouter } from "next/navigation";

type Inputs = {
  email: string;
  password: string;
};

type FormState = "initial" | "success" | "failed";

export default function LoginForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: { email: "", password: "" } });
  const [formState, setFormState] = useState<FormState>("initial");

  const { jwt, loading, error, status, postFetch } = useMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) =>
    await postFetch("auth/login", data);

  const inputClasses = "w-full p-2 rounded-lg placeholder:text-slate-700";

  useEffect(() => {
    if (status === "success") {
      router.push("/");
      setFormState("success");
    }

    if (status === "error") {
      setFormState("failed");
    }
  }, [status]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <div>
        <FormStyle>
          <label htmlFor="email">{<IconMail stroke={1.5} />}</label>
          <input
            placeholder="yourmail@domain.com"
            id="email"
            className={inputClasses}
            {...register("email", {
              required: "Please provide an email",
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
            {...register("password")}
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
        Login
      </button>
      {status === "error" && (
        <ErrorMessage>
          It seems like your email or password is wrong, please check your
          credentials
        </ErrorMessage>
      )}
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
      <IconExclamationCircle stroke={2} className="min-w-[16px]" />
      <p>{children}</p>
    </div>
  );
};
