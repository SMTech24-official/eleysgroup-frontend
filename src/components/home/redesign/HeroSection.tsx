import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import heroImage from "@/assets/heroSectionPhoto.png";

// const staticticsData = [
//   {
//     number: 80,
//     label: "Satisfied clients",
//   },
//   {
//     number: 200,
//     label: "Projects completed",
//   },
//   {
//     number: 99,
//     label: "Reviews given",
//   },
//   {
//     number: 100,
//     label: "Success rate",
//   },
// ];

export default function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-40">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-6">
          <h1 className=" text-[58px] font-bold leading-[70px] ">
            I am <span className="text-primary">Magda,</span>
            <br />
            physiotherapist
          </h1>
          <p className="text-[#323433] text-[16px] font-normal leading-[150%]">
            I&apos;m Magda, a passionate and dedicated physiotherapist with over 10 years of experience in helping
            people move better, feel stronger, and recover from pain or injury.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-white transition-colors hover:bg-pink-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            >
              Read more
            </Link>
            <Link
              href="#"
              className="inline-flex items-center text-sm font-medium transition-colors hover:text-pink-500"
            >
              View Portfolio
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="relative aspect-square lg:aspect-auto">
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
        <div className="flex items-center justify-between gap-8 mt-16">
          <div className="h-[100px] w-[324px]">
            <h2 className="text-[24px] font-bold leading-[30px] text-primary">80</h2>
            <p className="text-[#323433] text-[16px] font-normal leading-[150%]">Satisfied clients</p>
          </div>
          <div className="h-[100px] w-[324px]">
            <h2 className="text-[24px] font-bold leading-[30px] text-primary">200</h2>
            <p className="text-[#323433] text-[16px] font-normal leading-[150%]">Projects completed</p>
          </div>
          <div className="h-[100px] w-[324px]">
            <h2 className="text-[24px] font-bold leading-[30px] text-primary">99</h2>
            <p className="text-[#323433] text-[16px] font-normal leading-[150%]">Reviews given</p>
          </div>
        </div>
      </div>
    </section>
  );
}
