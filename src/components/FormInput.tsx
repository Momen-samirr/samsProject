import React from "react";

type InputProps = {
  type?: string;
  name: string;
  label: string;
  error: any;
  register: any;
  defaultValue?: string;
  inputprop?: any;
};

const FormInput = ({
  type = "text",
  name,
  label,
  error,
  register,
  defaultValue,
  inputprop,
}: InputProps) => {
  return (
    <div className="flex flex-col w-full gap-3 md:w-1/4">
      <label className="text-xs text-gray-500">{label}</label>
      <input
        type={type}
        {...register(name)}
        defaultValue={defaultValue}
        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
      />
      {error?.message && (
        <p className="text-xs text-red-500">{error?.message.toString()}</p>
      )}
    </div>
  );
};

export default FormInput;
