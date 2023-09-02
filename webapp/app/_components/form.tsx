"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { ReactNode } from "react";
import { IconLock, IconMail, IconUserCircle } from "@tabler/icons-react";
import Link from "next/link";

type Inputs = {
  username: string;
  email: string;
  password: string;
};

export default function Form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <InputField
        fieldType="username"
        required
        label="Username"
        labelIcon={<IconUserCircle />}
        type="text"
      />
      {errors.username && <span>This field is required</span>}

      <InputField
        fieldType="email"
        required
        label="Email"
        labelIcon={<IconMail />}
        type="email"
      />
      {errors.email && <span>This field is required</span>}

      <InputField
        type="password"
        fieldType="password"
        required
        label="Password"
        labelIcon={<IconLock />}
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

type FieldType = "username" | "password" | "email";

interface InputFieldProps {
  label: string;
  fieldType: FieldType;
  required: boolean;
  labelIcon: ReactNode;
  type?: string;
}
const InputField = ({
  label,
  fieldType,
  required,
  labelIcon,
  type,
}: InputFieldProps) => {
  const { register } = useForm<Inputs>();
  return (
    <div className="flex border border-slate-200 items-center gap-2 rounded-xl pl-2 pr-1 py-1">
      <label htmlFor={label}>{labelIcon}</label>
      <input
        type={type}
        placeholder={label}
        id={label}
        className="w-full p-2 rounded-lg placeholder:text-slate-700"
        {...register(fieldType, { required: required })}
      />
    </div>
  );
};
