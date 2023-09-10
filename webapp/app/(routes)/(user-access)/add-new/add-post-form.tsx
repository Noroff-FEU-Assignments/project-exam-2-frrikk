import { useForm, SubmitHandler, Controller } from "react-hook-form";
import axios from "axios";
import { User } from "@/app/_context/user-context";
import { BodyPost } from "@/app/_types/types";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { ErrorMessage } from "@/app/_components/error-message";

interface AddPostFormProps {
  mutate: (bodyData: BodyPost) => void;
}

export default function AddPostForm({ mutate }: AddPostFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BodyPost>();

  const onSubmit: SubmitHandler<BodyPost> = (data) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          {...register("title", {
            required: "Please add a title to your post",
          })}
          className="w-full p-2 border rounded-md"
        />
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
      </div>

      <div>
        <label htmlFor="descrption">Description</label>
        <textarea
          id="descrption"
          {...register("body", { required: "Please add a description" })}
          className="w-full p-2 border rounded-md"
        />
        {errors.body && <ErrorMessage>{errors.body.message}</ErrorMessage>}
      </div>
      <div>
        <label htmlFor="image">Image url</label>
        <input
          type="text"
          id="image"
          {...register("media")}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <button
        type="submit"
        className="mt-4 p-4 bg-pastel-green text-white font-bold rounded-md flex w-full justify-center"
      >
        Create post
      </button>
    </form>
  );
}
