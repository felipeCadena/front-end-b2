import FirstSection from "../components/templates/first-section";
import SearchActivity from "@/components/organisms/search-activity";
import SecondSection from "../components/templates/second-section";
import ThirdSection from "@/components/templates/third-section";
import FourthSection from "@/components/templates/fourth-section";
import SixthSection from "@/components/templates/sixth-section";
import FifithSection from "@/components/templates/fifth-section";

export default function Home() {
  return (
    <>
      <div className="overflow-x-hidden">
        <SearchActivity />
        <FirstSection />
        <SecondSection />
        <ThirdSection />
        <FourthSection />
        <FifithSection />
        <SixthSection />
      </div>
    </>
  );
}
