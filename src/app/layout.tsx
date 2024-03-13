import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/nav-bar/navbar";
import logo from "../../public/logo.png";
import { Analytics } from '@vercel/analytics/react';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Poetique",
  description: "Beautify your poem",
  icons: logo.src,
  openGraph: {
    url: "https://poetique.vercel.app/",
    title: "Poetique",
    description: "Turn your words into art",
    siteName: "Poetique",
    images: [
      {
        url: "https://i.ibb.co/Q9TWbSL/BG-simple.png",
        width : 500,
        height : 500
      },
    ],
  },
  manifest: "/manifest.json"
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
        <Analytics/>
      </body>
    </html>
  );
}
