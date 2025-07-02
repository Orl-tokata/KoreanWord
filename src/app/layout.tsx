import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";

const font = Roboto({
  weight:["100","200","300","400","500","600","700","800","900"],
  subsets:["latin"]
  
})

export const metadata: Metadata = {
  title: "Test CRUD Next JS",
  description: "Just Testing CODE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" className="overflow-hidden">
      <body className={`${font} antialiased w-full h-full`}>
        {children}
      </body>
    </html>
  );
}
