import LoginForm from "@/components/loginForm";
import { routes } from "@/routes";
import Heading from "@/shared/ui/heading";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container flex flex-col m-auto">
      <div className="w-full m-auto">
        <div className="container-center-sm">
          <div className="text-center mb-6">
            <Heading type="h1" className="mb-2">
              Welcome back
            </Heading>
            <p>Login with your credentials</p>
          </div>
          <LoginForm />
        </div>
        <p className="mt-8 text-center">
          New here? <Link href={routes.register}>Create an account</Link>
        </p>
      </div>
    </div>
  );
}
