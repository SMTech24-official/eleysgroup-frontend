import AboutSection from "@/components/home/AboutSection";
import { Banner } from "@/components/home/Banner";
import { BannerBottom } from "@/components/home/BannerBottom";
import ServicesSection from "@/components/home/ServicesSection";

export default function Page() {
  return (
    <div>
      <Banner
        imagePath={"/banner-2.png"}
        title={"What Our Clients Say"}
        description="Real stories from real patients about their journey to recovery."
      />
      <AboutSection />
      <ServicesSection />
      <BannerBottom />
    </div>
  );
}
