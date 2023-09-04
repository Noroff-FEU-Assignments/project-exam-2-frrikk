"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import React, { ReactNode } from "react";
import { IconLock, IconMail, IconUserCircle } from "@tabler/icons-react";
import { postFetch } from "@/app/_utils/fetch";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

export default function Form() {
  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) =>
    await postFetch("auth/register", data);

  console.log({ errors });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <InputField
        fieldType="name"
        required
        label="Username"
        labelIcon={<IconUserCircle />}
        type="text"
        {...register("name", { required: true })}
      />
      {errors.name && <span>This field is required</span>}

      <InputField
        fieldType="email"
        required
        label="Email"
        labelIcon={<IconMail />}
        type="email"
        {...register("email", {
          pattern: {
            value: /^(.+\@noroff\.no)|(.+\@stud\.noroff\.no)$/,
            message:
              "Please enter a valid noroff.no or stud.noroff.no email address",
          },
          required: true,
        })}
      />
      {errors.email && <span>{errors.email.types?.pattern}</span>}

      <InputField
        type="password"
        fieldType="password"
        required
        label="Password"
        labelIcon={<IconLock />}
        {...register("password", { required: true })}
      />
      {errors.password && <span>This field is required</span>}

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

type FieldType = "name" | "password" | "email";

interface InputFieldProps {
  label: string;
  fieldType: FieldType;
  required: boolean;
  labelIcon: ReactNode;
  type?: string;
}
const InputField = React.forwardRef(
  ({ label, labelIcon, type }: InputFieldProps, ref) => {
    return (
      <div className="flex border border-slate-200 items-center gap-2 rounded-xl pl-2 pr-1 py-1">
        <label htmlFor={label}>{labelIcon}</label>
        <input
          type={type}
          placeholder={label}
          id={label}
          className="w-full p-2 rounded-lg placeholder:text-slate-700"
        />
      </div>
    );
  },
);
