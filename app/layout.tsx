import { Inter } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: 'Home Page | SwapSo',
  description: 'Home page of SwapSo having every information',
  }

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}