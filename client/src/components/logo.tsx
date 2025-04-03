import { routes } from "@/routes";
import Button from "@/shared/ui/button";
import Heading from "@/shared/ui/heading";

export default function Logo() {
  return (
    <Button href={routes.login} className="w-fit">
      <Heading type="h1" className="inline">
        My<span className="font-medium">Journal</span>
      </Heading>
    </Button>
  );
}
