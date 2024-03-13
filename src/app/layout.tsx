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
        url: "https://firebasestorage.googleapis.com/v0/b/fileshare-37ebc.appspot.com/o/images%2FBG_simple.png?alt=media&token=9be196db-3755-40ff-b3e9-e4f72b8226c2",
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
