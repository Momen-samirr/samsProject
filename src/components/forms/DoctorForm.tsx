"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "../FormInput";
import Image from "next/image";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.date({ message: "Birthday is required!" }),
  gender: z.enum(["male", "female"], { message: "Gender is required!" }),
  img: z.instanceof(File, { message: "Image is required" }),
});

const DoctorForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <h1 className="font-semibold text-lg">Create a new Doctor</h1>
      <span className="text-xs text-gray-400 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-3">
        <FormInput
          name="email"
          label="Username"
          defaultValue={data?.username}
          register={register}
          error={errors?.username}
        />
        <FormInput
          name="email"
          label="Email"
          type="email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
        />
        <FormInput
          name="password"
          label="Password"
          type="password"
          defaultValue={data?.password}
          register={register}
          error={errors?.password}
        />
      </div>
      <span className="text-xs text-gray-400 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-3">
        <FormInput
          label="First Name"
          name="firstName"
          defaultValue={data?.firstName}
          register={register}
          error={errors.firstName}
        />
        <FormInput
          label="Last Name"
          name="lastName"
          defaultValue={data?.lastName}
          register={register}
          error={errors.lastName}
        />
        <FormInput
          label="Phone"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />
        <FormInput
          label="Address"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
        <FormInput
          label="Blood Type"
          name="bloodType"
          defaultValue={data?.bloodType}
          register={register}
          error={errors.bloodType}
        />
        <FormInput
          label="Birthday"
          name="birthday"
          defaultValue={data?.birthday}
          register={register}
          error={errors.birthday}
          type="date"
        />
        <div className="flex flex-col w-full gap-3 md:w-1/4">
          <label htmlFor="gender" className="text-xs text-gray-500">
            Gender
          </label>
          <select
            id="gender"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("gender")}
            defaultValue={data?.gender}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors?.gender?.message && (
            <p className="text-xs text-red-500">
              {errors?.gender?.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-3 md:w-1/4 justify-center">
          <label
            htmlFor="img"
            className="text-xs text-gray-500 flex items-center gap-3 cursor-pointer"
          >
            <Image
              src={"/upload.png"}
              alt={"upload"}
              width={28}
              height={28}
              className={"cursor-pointer"}
            />
            <span>Upload Image</span>
          </label>
          <input type="file" id="img" {...register("img")} className="hidden" />
          {errors?.img?.message && (
            <p className="text-xs text-red-500">
              {errors?.img?.message.toString()}
            </p>
          )}
        </div>
      </div>
      <button className="bg-sky-600 py-3 px-3 rounded-md text-white">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default DoctorForm;
