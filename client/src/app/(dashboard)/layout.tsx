import Logo from "@/components/logo";
import { routes } from "@/routes";
import Button from "@/shared/ui/button";
import Heading from "@/shared/ui/heading";
import Icon from "@/shared/ui/icon";

export default function Layout() {
  return (
    <div className="grid grid-cols-[auto_1fr] h-dvh">
      <div className="container bg-stone h-full">
        <div className="flex items-center gap-2 text-primary my-2">
          <Icon name="dashboard" size="lg" />
          <Heading type="h3" className="font-semibold">
            Dashboard
          </Heading>
        </div>
        {sections.map((section, index) => (
          <Button
            key={index}
            href={section.link}
            className="flex items-center gap-2 text-primary mt-2"
          >
            <Icon name={section.icon} size="lg" />
            <Heading type="h3">
              {section.text}
            </Heading>
          </Button>
        ))}
      </div>
      <div className="container">
        <Logo />
      </div>
    </div>
  );
}

const sections = [
  {
    text: "New Entry",
    link: routes.newEntry,
    icon: "newEntry",
  },
  {
    text: "Calendar",
    link: routes.newEntry,
    icon: "calendar",
  },
  {
    text: "Kanban Board",
    link: routes.newEntry,
    icon: "kanban",
  },
  {
    text: "Profile",
    link: routes.newEntry,
    icon: "profile",
  },
];
