import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import TestimonialSlider from "@/components/home/TestimonialSlider";
import WhyChooseUs from "@/components/home/WhyChooseUs";

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
      <AboutSection />
      <WhyChooseUs />
      <ServicesSection />
      <TestimonialSlider />
      {/* <BannerBottom /> */}
    </div>
  );
};

export default CommonLayoutHomePage;
