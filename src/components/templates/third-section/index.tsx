import React from "react";
import SearchInfoActivity from "@/components/organisms/search-with-info";
import Review from "./review";

export default function ThirdSection() {
  return (
    <section className="md:mb-20">
      <div className="md:hidden">
        <SearchInfoActivity />
      </div>
      <div className="md:hidden">
       <Review />
      </div>
    </section>
  );
}
