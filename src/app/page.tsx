"use client";

import React from "react";
import FirstSection from "../components/templates/first-section";
import SearchActivity from "@/components/organisms/search-activity";
import SecondSection from "../components/templates/second-section";
import ThirdSection from "@/components/templates/third-section";
import FourthSection from "@/components/templates/fourth-section";
import FifithSection from "@/components/templates/fifth-section";
import Review from "@/components/templates/third-section/review";

export default function Home() {
  return (
    <main className="md:mx-auto w-full md:max-w-screen-custom md:px-8">
      <div className="overflow-x-hidden ">
        {/* <SearchActivity /> */}

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
