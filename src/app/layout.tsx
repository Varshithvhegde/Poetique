import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/nav-bar/navbar"
import logo from "../../public/logo.png"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Poetique",
  description: "Beautify your poem",
  icons: logo.src,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/logo.ico" sizes="any" />
      <body className={inter.className}>
      <NavBar></NavBar>
        {children}
      </body>
    </html>
  );
}
