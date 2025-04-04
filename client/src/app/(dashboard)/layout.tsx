import Logo from "@/components/logo";
import SideNav from "@/components/sideNav";

export default function Layout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <div className="flex">
      <SideNav />

      <div className="container">
        <Logo />
        {children}
      </div>
    </div>
  );
}

