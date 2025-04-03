import type { Metadata } from "next";
import { Red_Hat_Text } from "next/font/google";
import "./globals.css";
import Header from "@/shared/layout/header";

const redHat = Red_Hat_Text({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Personal Journal",
  description:
    "Simple custom journal app. Create and save entries of your day to day life. Look them up at a later place and time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${redHat.className} antialiased`}>
        <div className="h-dvh flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
