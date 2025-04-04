import Logo from "@/components/logo";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-dvh flex flex-col container">
      <Logo />
      {children}
    </div>
  );
}
