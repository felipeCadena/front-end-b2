import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import Header from "@/components/organisms/header";
import Footer from "@/components/templates/footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "B2 Adventure",
  description: "Qual será sua próxima aventura?",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased mx-5`}>
        <Suspense>
          <Header />
          {children}
          <ToastContainer
            theme="colored"
            position="top-right"
            autoClose={2500}
            pauseOnHover={false}
            hideProgressBar
            style={{ width: "420px" }}
          />
        </Suspense>
      </body>
      <Footer />
    </html>
  );
}
