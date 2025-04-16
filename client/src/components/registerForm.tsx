"use client";

import Button from "@/shared/ui/button";
import InputPassword from "@/shared/ui/inputPassword";
import InputText from "@/shared/ui/inputText";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const registerSchema = z
  .object({
    userName: z
      .string()
      .nonempty("Username is required")
      .regex(/^[a-zA-Z0-9]+$/, "Can only contain letters or digits"),
    password: z.string().nonempty("Password is required").min(6),
    repeatPassword: z.string().nonempty("Repeat password is required"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
  });

type RegisterFields = z.infer<typeof registerSchema>;

export default function LoginForm() {
  const methods = useForm<RegisterFields>({
    resolver: zodResolver(registerSchema),
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<RegisterFields> = async (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-2">
        <InputText
          inputName="userName"
          label="Username"
          background="bg-background"
        />
        <InputPassword
          inputName="password"
          label="Password"
          className="mb-2"
          background="bg-background"
        />
        <InputPassword
          inputName="repeatPassword"
          label="Repeat Password"
          className="mb-2"
          background="bg-background"
        />
        <Button
          type="submit"
          className="btn-lg btn-fill-primary w-fit m-auto h-[38px] py-0!"
        >
          Sign in
        </Button>
      </form>
    </FormProvider>
  );
}
