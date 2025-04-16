"use client";

import Button from "@/shared/ui/button";
import InputPassword from "@/shared/ui/inputPassword";
import InputText from "@/shared/ui/inputText";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  user: z.string().nonempty("Username is required"),
  password: z.string().nonempty("Password is required"),
});

type LoginFields = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const methods = useForm<LoginFields>({ resolver: zodResolver(loginSchema) });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<LoginFields> = async (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="grid gap-2"
      >
        <InputText
          inputName="user"
          label="Username"
          background="bg-background"
        />
        <InputPassword
          inputName="password"
          label="Password"
          className="mb-2"
          background="bg-background"
        />
        <Button type="submit" className="btn-lg btn-fill-primary w-fit m-auto h-[38px] py-0!">
          Sign in
        </Button>
      </form>
    </FormProvider>
  );
}
