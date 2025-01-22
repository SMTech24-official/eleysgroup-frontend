import { Button } from "@/components/ui/button";
import Image from "next/image";
import service1 from "@/assets/our-services/service-1.png";
import service2 from "@/assets/our-services/service-2.png";
import service3 from "@/assets/our-services/service-3.png";
import service4 from "@/assets/our-services/service-4.png";

export default function ServicesSection() {
  const services = [
    {
      title: "VERTIGO / VESTIBULAR TREATMENT",
      image: service1,
      alt: "Vertigo treatment service",
    },
    {
      title: "HEADACHE TREATMENT",
      image: service2,
      alt: "Headache treatment service",
    },
    {
      title: "TMJ PAIN TREATMENT",
      image: service3,
      alt: "TMJ pain treatment service",
    },
    {
      title: "POSTURAL RESTORATION",
      image: service4,
      alt: "Postural restoration service",
    },
  ];

  return (
    <section className="w-full px-4 py-16 bg-[#FFF5F9]">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-primary text-xl font-semibold mb-3">
            Our Services
          </h3>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
            Comprehensive care tailored to your needs.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <div key={index} className="relative h-[370px] overflow-hidden">
              <Image
                src={
                  service.image ||
                  "../../assets/placeholders/image_placeholder.png"
                }
                alt={service.alt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/60 to-transparent backdrop-blur-[10px]">
                <div className="p-4 text-white text-center w-full">
                  <h3 className="font-semibold text-xl">{service.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button className="bg-primary hover:bg-primary/80 text-foreground px-2 py-4">
            Book Appointment
          </Button>
        </div>
      </div>
    </section>
  );
}
