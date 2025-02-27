import AbooutMeSection from "@/components/home/redesign/AbooutMeSection";
import HeroSection from "@/components/home/redesign/HeroSection";
import WhyChoolseMeSection from "@/components/home/redesign/WhyChoolseMeSection";

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
      <TestimonialSlider /> */}
      {/* <BannerBottom /> */}

      <HeroSection />
      <AbooutMeSection />
      <WhyChoolseMeSection />
    </div>
  );
};

export default CommonLayoutHomePage;
