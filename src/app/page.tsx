"use client";

import React from "react";
import FirstSection from "../components/templates/first-section";
import SecondSection from "../components/templates/second-section";
import ThirdSection from "@/components/templates/third-section";
import FourthSection from "@/components/templates/fourth-section";
import FifithSection from "@/components/templates/fifth-section";
import Review from "@/components/templates/third-section/review";
import { signOut, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/useAuthStore";
import useSearchQueryService from "@/services/use-search-query-service";

export default function Home() {
  const { data: session } = useSession();
  const { clearUser } = useAuthStore();

  React.useEffect(() => {
    if (session?.error === "RefreshAccessTokenError" && !session?.user) {
      console.log("Session expired, logging out...");
      clearUser();
      signOut({ redirect: true, callbackUrl: "/login?refresh=true" });
      toast.error("Sua sessão expirou. Por favor, faça login novamente.");
    }
  }, [session]);

  return (
    <main className="md:mx-auto w-full md:max-w-screen-custom md:px-8">
      <div className="overflow-x-hidden ">
        <FirstSection />
        <SecondSection />
        <div className="flex flex-col md:flex-col-reverse">
          <ThirdSection />
          <FourthSection />
        </div>
        <div className="max-sm:hidden">
          <Review />
        </div>
      </div>
      <FifithSection />
    </main>
  );
}
