import FirstSection from "../components/templates/first-section";
import SearchActivity from "@/components/organisms/search-activity";
import SecondSection from "../components/templates/second-section";
import ThirdSection from "@/components/templates/third-section";
import FourthSection from "@/components/templates/fourth-section";
import FifithSection from "@/components/templates/fifth-section";
import Review from "@/components/templates/third-section/review";

export default function Home() {
  return (
    <>
      <div className="overflow-x-hidden max-w-screen-xl mx-auto px-4">
        <SearchActivity />
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
    </>
  );
}
