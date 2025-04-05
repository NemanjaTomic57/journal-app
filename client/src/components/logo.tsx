import { logo } from "@/app/layout";
import { routes } from "@/routes";
import Button from "@/shared/ui/button";
import Heading from "@/shared/ui/heading";
import clsx from "clsx";

export default function Logo() {
  return (
    <Button href={routes.dashboard} className="w-fit mb-14 block">
      <Heading type="h2" className={clsx("inline", logo.className)}>
        My<span className="font-medium">Journal</span>
      </Heading>
    </Button>
  );
}
