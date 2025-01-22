import Image from "next/image";
import { Button } from "@/components/ui/button";
import aboutus from "@/assets/aboutusImage.png";
import { HiCheckBadge } from "react-icons/hi2";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="w-full bg-gray-50 py-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left side - Image */}
        <div className="relative aspect-square md:aspect-auto md:h-[600px] ">
          <Image
            src={aboutus}
            alt="Healthcare professional with patient"
            fill
            className="object-contain md:object-cover"
            priority
          />
        </div>

        {/* Right side - Content */}
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-primary text-xl font-semibold">About Us</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
              Dedicated to Your Health and Well-being
            </h2>
            <p className="text-foreground leading-relaxed text-base">
              At Total Physio LTD, we are committed to helping you achieve a
              pain-free, active lifestyle through personalized physiotherapy
              treatments. Our expert care focuses on restoring mobility,
              strength, and confidence, tailored to your unique needs and goals.
            </p>
          </div>

          {/* Two-column list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <HiCheckBadge className="text-primary w-5 h-5" />
                <p className="text-gray-700">Expert Care</p>
              </div>
              <div className="flex items-center gap-2">
                <HiCheckBadge className="text-primary w-5 h-5" />
                <p className="text-gray-700">Personalized Plans</p>
              </div>
              <div className="flex items-center gap-2">
                <HiCheckBadge className="text-primary w-5 h-5" />
                <p className="text-gray-700">Advanced Techniques</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <HiCheckBadge className="text-primary w-5 h-5" />
                <p className="text-gray-700">Supportive Environment</p>
              </div>
              <div className="flex items-center gap-2">
                <HiCheckBadge className="text-primary w-5 h-5" />
                <p className="text-gray-700">Recovery Focus</p>
              </div>
              <div className="flex items-center gap-2">
                <HiCheckBadge className="text-primary w-5 h-5" />
                <p className="text-gray-700">Pain-Free Living</p>
              </div>
            </div>
          </div>

          {/* Button */}
          <Link href={"/book-appointment"}>
          <Button className="bg-primary hover:bg-primary/80 text-white px-8 py-2 rounded-lg">
            Book Appointment
          </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
