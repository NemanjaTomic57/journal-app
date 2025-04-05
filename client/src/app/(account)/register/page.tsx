import RegisterForm from "@/components/registerForm";
import { routes } from "@/routes";
import Heading from "@/shared/ui/heading";
import Link from "next/link";

export default function Page() {
  return (
    <div className="container flex flex-col m-auto">
      <div className="w-full m-auto">
        <div className="container-center-sm">
          <div className="text-center mb-6">
            <Heading type="h1" className="mb-2">
              Register
            </Heading>
            <p>Enter a username and password</p>
          </div>
          <RegisterForm />
        </div>
        <p className="mt-8 text-center">
          Already have an account?
          <Link href={routes.login} className="block w-fit m-auto">Login</Link>
        </p>
      </div>
    </div>
  );
}
