import React from "react";
import { useForm } from "react-hook-form";

export default function Playground() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        {...register("name", { required: true, maxLength: 30 })}
      />
      {errors.name && errors.name.type === "required" && (
        <span>This is required</span>
      )}
      {errors.name && errors.name.type === "maxLength" && (
        <span>Max length exceeded</span>
      )}
      <input type="submit" />
    </form>
  );
}

// export default Playground;
