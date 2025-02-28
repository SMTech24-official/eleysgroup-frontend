import AbooutMeSection from "@/components/home/redesign/AbooutMeSection";
import HeroSection from "@/components/home/redesign/HeroSection";
import WhyChoolseMeSection from "@/components/home/redesign/WhyChoolseMeSection";
import ServicesSection from "@/components/home/ServicesSection";
import TestimonialSlider from "@/components/home/TestimonialSlider";

const CommonLayoutHomePage = () => {
  return (
    <div>
      {/* <Banner
        imagePath={"/banner-1.png"}
        title={"Recover Stronger, Live Better"}
        description="Comprehensive physiotherapy services, Tailored to your unique
            well-being. Expert care to help you recover, Move better, and feel
            your best."
      /> */}

      {/* <AboutSection />
      <WhyChooseUs />
      <ServicesSection />
    */}
      {/* <BannerBottom /> */}

      <HeroSection />
      <AbooutMeSection />
      <WhyChoolseMeSection />
      <ServicesSection />
      <TestimonialSlider />
    </div>
  );
};

export default CommonLayoutHomePage;
