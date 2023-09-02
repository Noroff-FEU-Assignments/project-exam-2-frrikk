"use client";

import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import { ReactNode } from "react";
import { IconLock, IconMail, IconUserCircle } from "@tabler/icons-react";
import Link from "next/link";

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
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      // Perform the POST request here
      const response = await fetch(
        "https://api.noroff.dev/api/v1/social/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (response.ok) {
        // Handle success
        console.log("Data submitted successfully");
        console.log({ response });
      } else {
        // Handle errors
        console.error("Failed to submit data");
        console.log(JSON.stringify(data));
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <InputField
        fieldType="name"
        required
        label="Username"
        labelIcon={<IconUserCircle />}
        type="text"
        register={register}
      />
      {errors.name && <span>This field is required</span>}

      <InputField
        fieldType="email"
        register={register}
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
        register={register}
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
  register: UseFormRegister<Inputs>;
}
const InputField = ({
  label,
  fieldType,
  required,
  labelIcon,
  type,
  register,
}: InputFieldProps) => {
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
