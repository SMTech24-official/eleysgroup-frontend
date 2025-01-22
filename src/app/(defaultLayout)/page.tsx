import AboutSection from "@/components/home/AboutSection";
import { Banner } from "@/components/home/Banner";
import { BannerBottom } from "@/components/home/BannerBottom";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";

const CommonLayoutHomePage = () => {
  return (
    <div>
      <Banner />
      <AboutSection />
      <WhyChooseUs />
      <ServicesSection />
      <BannerBottom />
    </div>
  );
};

export default CommonLayoutHomePage;
