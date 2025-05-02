import Logo from "@/components/logo";
import SideNav from "@/components/sideNav";
import { getDateOnly } from "@/shared/libs/dateTime";
import Heading from "@/shared/ui/heading";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const today = new Date;

  

  return (
    <>
      <SideNav />

      <div className="overflow-auto w-full h-dvh flex flex-col pl-[70px]">
        <div className="container py-3! flex justify-end gap-10 items-end">
          <Heading type="h5">{getDateOnly(today)}</Heading>
          <Logo />
        </div>
        {children}
      </div>
    </>
  );
}
