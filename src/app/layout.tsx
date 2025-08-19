import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/organisms/layout";
import AuthProvider from "@/providers/auth-provider";
import { Provider } from "@/providers/provider";
import { GoogleMapsProvider } from "@/providers/google-provider";
import Script from "next/script";

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
  const ENV_PRO = process.env.NEXT_PUBLIC_ENV === "prod";
  return (
    <html lang="en">
      <head>
        <meta
          name="facebook-domain-verification"
          content="zqjcoi9kslkxzreeg9w2vchootdjwg"
        />
        <meta property="og:image" content="/logo.png" />
        {!ENV_PRO && <meta name="robots" content="noindex" />}
      </head>
      <body
        suppressHydrationWarning={true}
        className={`${inter.className} antialiased md:min-h-screen`}
      >
        <AuthProvider>
          <Provider>
            <GoogleMapsProvider>
              <Suspense>
                <Layout>{children}</Layout>
              </Suspense>
            </GoogleMapsProvider>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              style={{ zIndex: 9999 }}
            />
          </Provider>
        </AuthProvider>
        {/* Google tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Z38WV8VE4Y"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-Z38WV8VE4Y');
          `}
        </Script>
      </body>
    </html>
  );
}
