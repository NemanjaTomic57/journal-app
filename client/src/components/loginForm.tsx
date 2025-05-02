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

const loginSchema = z.object({
  userName: z.string().nonempty("Username is required"),
  password: z.string().nonempty("Password is required"),
});

type LoginFields = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const methods = useForm<LoginFields>({ resolver: zodResolver(loginSchema) });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit: SubmitHandler<LoginFields> = async (data) => {
    const res = await fetch(apiUrl + "account/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status == 200) {
      router.push(routes.dashboard);
    } else if (res.status == 401) {
      toast.error("Wrong username or password.");
    } else {
      generalErrorToast();
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-2">
        <InputText inputName="userName" label="Username" background="bg-background" />
        <InputPassword inputName="password" label="Password" className="mb-2" background="bg-background" />
        <Button type="submit" className="btn-lg btn-fill-primary w-fit m-auto h-[38px] py-0!" disabled={isSubmitting}>
          Sign in
        </Button>
      </form>
    </FormProvider>
  );
}
