import Header from "@/components/organisms/header";
import FirstSection from "../components/templates/first-section";
import SearchActivity from "@/components/organisms/search-activity";
import SecondSection from "../components/templates/second-section";
import ThirdSection from "@/components/templates/third-section";
import FourthSection from "@/components/templates/fourth-section";
import Footer from "@/components/templates/footer";
import SixthSection from "@/components/templates/sixth-section";
import FifithSection from "@/components/templates/fifth-section";

export default function Home() {
  return (
    <>
      <div className="mx-4 overflow-x-hidden">
        <Header />
        <SearchActivity />
        <FirstSection />
        <SecondSection />
        <ThirdSection />
        <FourthSection />
        <FifithSection />
        <SixthSection />
      </div>
      <Footer />
    </>
  );
}
