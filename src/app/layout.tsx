import type { Metadata } from "next";
import "./globals.css";
import {Noto_Sans_KR} from 'next/font/google';

const noto = Noto_Sans_KR({ subsets: ["latin"], weight:['400','500','700'] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={noto.className}>
        <main className="max-w-4xl mx-auto p-4">
        {children}
        </main>
      </body>
    </html>
  );
}