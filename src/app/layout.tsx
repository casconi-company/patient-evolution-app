import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { ToastContainer } from "react-toastify";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Patient Evolution App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} cz-shortcut-listen="true">
        {children}

        <ToastContainer position="top-center" />
      </body>
    </html>
  );
}
