import AboutSection from "@/components/home/AboutSection";
import { Banner } from "@/components/home/Banner";
import WhyChooseUs from "@/components/home/WhyChooseUs";

const CommonLayoutHomePage = () => {
  return (
    <div>
      <Banner />
      <AboutSection />
      <WhyChooseUs />
    </div>
  );
};

export default CommonLayoutHomePage;
