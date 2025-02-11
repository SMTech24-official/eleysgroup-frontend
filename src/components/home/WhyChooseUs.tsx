import tickIcon from "@/assets/icons/tick-mark.svg";
import healthCareFour from "@/assets/why-choose-us/healthCareFour.png";
import healthCareOne from "@/assets/why-choose-us/healthCareOne.png";
import healthCareThree from "@/assets/why-choose-us/healthCareThree.png";
import healthCareTwo from "@/assets/why-choose-us/healthCareTwo.png";
import Image from "next/image";

export default function WhyChooseUs() {
  const benefits = [
    "TMJ Physiotherapy Treatment",
    "Wet Cupping (Hijama) Therapy",
    "Physiotherapy After Plastic Surgery",
    "Medical Massage Therapy",
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-primary text-xl font-semibold">Why Chose Us</h3>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">What to Expect</h2>
            <p className="text-foreground leading-relaxed text-base">
              During your assessment, we’ll discuss your headache history, triggers, and lifestyle factors to develop a
              personalized treatment plan. Whether your headaches are due to tension, migraines, or cervicogenic
              (neck-related) issues, our goal is to help you regain control and improve your quality of life.
            </p>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="rounded-full p-1">
                    <Image src={tickIcon} alt="tick-icon" className="h-4 w-4" />
                  </div>
                  <span className="text-[#303030] font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              {/* <Link href={"/book-appointment"}>
              <Button className="bg-primary hover:bg-primary/80 text-foreground px-2 py-4">
                Book Appointment
              </Button>
            </Link> */}
            </div>
          </div>

          {/* Right Column */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative">
                <Image
                  src={healthCareOne}
                  alt="Physical therapy session"
                  className="object-cover rounded-lg w-full h-auto"
                />
              </div>
              <div className="relative">
                <Image
                  src={healthCareTwo}
                  alt="Medical consultation"
                  quality={100}
                  className="object-cover rounded-lg w-full h-auto"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <Image
                  src={healthCareThree}
                  alt="Patient care"
                  quality={100}
                  className="object-cover rounded-lg w-full h-auto"
                />
              </div>
              <div className="relative">
                <Image
                  src={healthCareFour}
                  alt="Exercise therapy"
                  quality={100}
                  className="object-cover rounded-lg w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
