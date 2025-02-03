import AboutSection from "@/components/home/AboutSection";
import { Banner } from "@/components/home/Banner";
import ServicesSection from "@/components/home/ServicesSection";
import TestimonialSlider from "@/components/home/TestimonialSlider";

export default function Page() {
  return (
    <div>
      <Banner
        imagePath={"/banner-2.png"}
        title={"What Our Clients Say"}
        description="Real stories from real patients about their journey to recovery."
      />
      <AboutSection />
      <TestimonialSlider />
      <ServicesSection />
      {/* <BannerBottom /> */}
    </div>
  );
}
