import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/templates/footer";
import Layout from "@/components/organisms/layout";

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
      <body className={`${inter.className} antialiased`}>
        <Suspense>
          <div className="">
            <Layout>{children}</Layout>
            <ToastContainer
              theme="colored"
              position="top-right"
              autoClose={2500}
              pauseOnHover={false}
              hideProgressBar
              style={{ width: "420px" }}
            />
          </div>
        </Suspense>
      </body>
    </html>
  );
}
