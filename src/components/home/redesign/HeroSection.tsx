import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import heroImage from "@/assets/heroSectionPhoto.png";
import profileImage from "@/assets/bigprofile.png";

export default function HeroSection() {
  return (
    <section className="container mx-auto px-4 lg:pt-40 lg:pb-40 pb-0 pt-32">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="flex items-center justify-center lg:hidden">
          <Image
            src={profileImage}
            alt="Magda, a professional physiotherapist"
            width={1000}
            height={1000}
            className="lg:hidden h-52 w-52 rounded-full"
          />
        </div>

        <div className="flex flex-col justify-center gap-6">
          <h1 className=" lg:text-[58px] text-4xl font-bold lg:leading-[70px] ">
            I am <span className="text-primary">Magda,</span>
            <br />
            physiotherapist
          </h1>
          <p className="text-[#323433] text-wrap text-[16px] font-normal leading-[150%]">
            I&apos;m Magda, a passionate and dedicated physiotherapist with over 10 years of experience in helping
            people move better, feel stronger, and recover from pain or injury.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/about-us"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-white transition-colors hover:bg-pink-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            >
              Read more
            </Link>
            <Link
              href="/book-appointment/doctor-profile"
              className="inline-flex items-center text-sm font-medium transition-colors hover:text-pink-500"
            >
              View Portfolio
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="relative hidden lg:inline-block aspect-square lg:aspect-auto">
          <div className="absolute inset-0 rounded-2xl bg-pink-50" />
          <Image
            src={heroImage}
            alt="Professional physiotherapist in pink scrubs"
            width={1000}
            height={1000}
            className="relative mx-auto max-w-[430px] max-h-[600px]"
            priority
          />
        </div>
      </div>

      <div>
        <div className=" flex flex-wrap gap-10 mt-16">
          <div className="h-[100px] max-w-[324px]">
            <h2 className="text-[24px] font-bold leading-[30px] text-primary">80</h2>
            <p className="text-[#323433] text-[16px] font-normal leading-[150%]">Satisfied clients</p>
          </div>
          <div className="h-[100px] max-w-[324px]">
            <h2 className="text-[24px] font-bold leading-[30px] text-primary">200</h2>
            <p className="text-[#323433] text-[16px] font-normal leading-[150%]">Projects completed</p>
          </div>
          <div className="h-[100px] max-w-[324px]">
            <h2 className="text-[24px] font-bold leading-[30px] text-primary">99</h2>
            <p className="text-[#323433] text-[16px] font-normal leading-[150%]">Reviews given</p>
          </div>
        </div>
      </div>
    </section>
  );
}
