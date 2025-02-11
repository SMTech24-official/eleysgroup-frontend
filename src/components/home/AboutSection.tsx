import aboutus from "@/assets/aboutusImage.png";
import Image from "next/image";
import { HiCheckBadge } from "react-icons/hi2";

export default function AboutSection() {
  return (
    <section className="w-full mt-20 bg-gray-50 py-16 px-4 md:px-6 lg:px-8">
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
              Headache & Migraine Physiotherapy Treatment
            </h2>
            <p className="text-foreground leading-relaxed text-base">
              If you suffer from frequent headaches or migraines, physiotherapy can be an effective way to reduce pain,
              improve mobility, and prevent future episodes. Many headaches stem from muscular tension, poor posture,
              joint dysfunction, or nerve irritation in the neck and shoulders. Our specialized physiotherapy approach
              targets these underlying causes to provide lasting relief.
            </p>
          </div>

          {/* Two-column list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <HiCheckBadge className="text-primary w-5 h-5" />
                <p className="text-gray-700">Postural Correction</p>
              </div>
              <div className="flex items-center gap-2">
                <HiCheckBadge className="text-primary w-5 h-5" />
                <p className="text-gray-700">Manual Therapy</p>
              </div>
              <div className="flex items-center gap-2">
                <HiCheckBadge className="text-primary w-5 h-5" />
                <p className="text-gray-700">Dry Needling & Myofascial Cupping </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <HiCheckBadge className="text-primary w-5 h-5" />
                <p className="text-gray-700">Stress & Tension Management</p>
              </div>
              <div className="flex items-center gap-2">
                <HiCheckBadge className="text-primary w-5 h-5" />
                <p className="text-gray-700">Electrotherapy & Heat Therapy </p>
              </div>
              <div className="flex items-center gap-2">
                <HiCheckBadge className="text-primary w-5 h-5" />
                <p className="text-gray-700">Exercise & Stretching Programs </p>
              </div>
            </div>
          </div>

          {/* Button */}
          {/* <Link href={"/book-appointment"}>
          <Button className="bg-primary hover:bg-primary/80 text-white px-8 py-2 rounded-lg">
            Book Appointment
          </Button>
          </Link> */}
        </div>
      </div>
    </section>
  );
}
