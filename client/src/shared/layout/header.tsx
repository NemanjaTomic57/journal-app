import { routes } from "@/routes";
import Button from "../ui/button";
import Heading from "../ui/heading";
import Logo from "@/components/logo";

export default function Header() {
  return (
    <header className="sticky top-0 flex justify-between container py-2">
      <Logo />
    </header>
  );
}
