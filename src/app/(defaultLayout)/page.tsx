import AboutSection from "@/components/home/AboutSection";
import { Banner } from "@/components/home/Banner";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";

const CommonLayoutHomePage = () => {
  return (
    <div>
      <Banner />
      <AboutSection />
      <WhyChooseUs />
      <ServicesSection />
    </div>
  );
};

export default CommonLayoutHomePage;
