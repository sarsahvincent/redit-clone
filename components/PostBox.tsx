import React, { useState } from "react";
import { LinkIcon, PhotographIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Avatar from "../components/Avatar";
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../graphql/mutations";

type FormData = {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreddit: string;
};

function PostBox() {
  const { data: session } = useSession();
  const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false);

  const [addPost] = useMutation(ADD_POST);

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (formData) => {
    console.log("formData", formData);
  });
  return (
    <form
      onSubmit={onSubmit}
      className="sticky top-16 z-50  rounded-md border-gray-300 bg-white p-2 border"
    >
      <div className="flex items-center space-x-3">
        <Avatar />
        <input
          {...register("postTitle", { required: true })}
          className="flex-1 rounded-md p-2 outline-none bg-gray-50 pl-5"
          disabled={!session}
          type="text"
          placeholder={
            session
              ? "Create a post by entering a title"
              : "Sign in to create a post"
          }
        />
        <PhotographIcon
          onClick={() => setImageBoxOpen(!imageBoxOpen)}
          className={`h-6 text-gray-300 cursor-pointer ${
            imageBoxOpen && "text-blue-300"
          }`}
        />
        <LinkIcon className="h-6 text-gray-300 " />
      </div>
      {!!watch("postTitle") && (
        <div className="flex flex-col py-2">
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body:</p>
            <input
              type="text"
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              {...register("postBody")}
              placeholder="Text (optional)"
            />
          </div>
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Subreddit:</p>
            <input
              type="text"
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              {...(register("subreddit"), { required: true })}
              placeholder="i.e reactjs"
            />
          </div>
          {imageBoxOpen && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Image URL:</p>
              <input
                type="text"
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                {...register("postImage")}
                placeholder="Optional..."
              />
            </div>
          )}

          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 p-2 text-red-500">
              {errors.postTitle?.type === "required" && (
                <p>A Post Title is required</p>
              )}
              {errors.subreddit?.type === "required" && (
                <p>A Post Subreddit is required</p>
              )}
            </div>
          )}

          {!!watch("postTitle") && (
            <button
              type="submit"
              className="w-full rounded-full bg-blue-400 p-2 text-white"
            >
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  );
}

export default PostBox;
