"use client";

import { apiUrl } from "@/environment";
import { routes } from "@/routes";
import { generalErrorToast } from "@/shared/libs/toasts";
import Button from "@/shared/ui/button";
import InputPassword from "@/shared/ui/inputPassword";
import InputText from "@/shared/ui/inputText";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
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
  const router = useRouter();
  const methods = useForm<RegisterFields>({
    resolver: zodResolver(registerSchema),
  });
  const { handleSubmit, formState: {isSubmitting} } = methods;

  const onSubmit: SubmitHandler<RegisterFields> = async (data) => {
    const result = await fetch(apiUrl + "account/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status == 200) {
      toast.success("Account creation successful. Happy journaling!");
      router.push(routes.login);
    } else if (result.status == 400) {
      toast.error("Username already taken, please choose another one.");
    } else {
      generalErrorToast();
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-2">
        <InputText inputName="userName" label="Username" background="bg-background" />
        <InputPassword inputName="password" label="Password" className="mb-2" background="bg-background" />
        <InputPassword inputName="repeatPassword" label="Repeat Password" className="mb-2" background="bg-background" />
        <Button type="submit" className="btn-lg btn-fill-primary w-fit m-auto h-[38px] py-0!" disabled={isSubmitting}>
          Sign in
        </Button>
      </form>
    </FormProvider>
  );
}
