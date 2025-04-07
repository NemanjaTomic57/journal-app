import Logo from "@/components/logo";
import SideNav from "@/components/sideNav";
import { dateOnly } from "@/shared/libs/dateTime";
import Heading from "@/shared/ui/heading";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const today = new Date;

  return (
    <div className="flex">
      <SideNav />

      <div className="overflow-auto w-full">
        <div className="container flex justify-end gap-10 items-end">
          <Heading type="h4">{dateOnly(today)}</Heading>
          <Logo />
        </div>
        {children}
      </div>
    </div>
  );
}
