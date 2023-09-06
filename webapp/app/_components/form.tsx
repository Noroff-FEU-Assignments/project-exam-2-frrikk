"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import React, { ReactNode } from "react";
import { postFetch } from "@/app/_utils/fetch";
import { IconLock, IconMail, IconUserCircle } from "@tabler/icons-react";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: { name: "", email: "", password: "" } });

  const onSubmit: SubmitHandler<Inputs> = async (data) =>
    await postFetch("auth/register", data);

  const inputClasses = "w-full p-2 rounded-lg placeholder:text-slate-700";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <FormStyle>
        <label htmlFor="name">{<IconUserCircle />}</label>
        <input
          placeholder="Username"
          id="name"
          className={inputClasses}
          {...register("name", { required: "Please provide a name" })}
        />
      </FormStyle>
      <FormStyle>
        <label htmlFor="email">{<IconMail />}</label>
        <input
          placeholder="yourmail@domain.com"
          id="email"
          className={inputClasses}
          {...register("email", {
            required:
              "Please provide an email ending with @noroff.no or @stud.noroff.no",
          })}
        />
      </FormStyle>
      <FormStyle>
        <label htmlFor="password">{<IconLock />}</label>
        <input
          placeholder="Password"
          id="password"
          className={inputClasses}
          {...register("password", {
            required: "The password must be at least 8 characters",
          })}
        />
        {}
      </FormStyle>
      <button
        type="submit"
        name="main-cta"
        id="main-cta"
        className="w-full bg-pastel-green rounded-xl p-3 text-white font-medium text-lg self-end mt-6"
      >
        Sign up
      </button>
    </form>
  );
}

const FormStyle = ({ children }: { children: ReactNode }) => (
  <div className="flex border border-slate-200 items-center gap-2 rounded-xl pl-2 pr-1 py-1">
    {children}
  </div>
);
