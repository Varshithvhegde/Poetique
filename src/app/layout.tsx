import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/nav-bar/navbar";
import logo from "../../public/logo.png";
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
        url: "https://raw.githubusercontent.com/Varshithvhegde/jira-jnd/main/BG_simple.png?token=GHSAT0AAAAAACMOA5USTVDAEOLNOITC2FOQZPPGV4A",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta property="og:title" content="Poetique"></meta>
      <meta property="og:site_name" content="Poetique"></meta>
      <meta property="og:url" content="https://poetique.vercel.app/"></meta>
      <meta property="og:description" content="Turn your words into art"></meta>
      <meta property="og:type" content=""></meta>
      <meta
        property="og:image"
        content="https://raw.githubusercontent.com/Varshithvhegde/jira-jnd/main/BG_simple.png?token=GHSAT0AAAAAACMOA5USTVDAEOLNOITC2FOQZPPGV4A"
      ></meta>
      <link rel="icon" href="/logo.ico" sizes="any" />
      <body className={inter.className}>
        <NavBar></NavBar>
        {children}
      </body>
    </html>
  );
}
