import ImageComponent from "@/components/shared/ImageComponent";
import React from "react";
import imageOne from "@/assets/aboutUs-image-one.png";
import imageTwo from "@/assets/aboutUs-image-two.png";
import imageThree from "@/assets/aboutUs-image-three.png";
import imageFour from "@/assets/aboutUs-image-four.png";
import ServicesSection from "@/components/home/ServicesSection";
import AboutUsSectionComponent from "@/components/aboutUs/AboutUsSectionComponent";
import { HeadacheMigraineData } from "@/data/aboutUsPage";

export default function AboutUs() {
  return (
    <div className="">
      <div className="flex container gap-10 py-24">
        <div className="w-1/2 flex flex-col gap-4">
          <h1 className="text-[#1A1A1A] text-[30px] font-semibold leading-[140%]">About Us</h1>
          <div className="flex flex-col gap-8 text-[#494949] text-[16px] font-normal leading-[160%]">
            <p>
              Hi, I’m Magda, a passionate and dedicated physiotherapist with over 10 years of experience in helping
              people move better, feel stronger, and recover from pain or injury. With a Master’s Degree in
              Physiotherapy, I’ve had the opportunity to work in both hospital and private practice settings, supporting
              patients through a wide range of conditions, from chronic pain and injuries to post-surgical
              rehabilitation.
            </p>
            <p>
              I believe in a hands-on, evidence-based approach to treatment, combining advanced techniques like
              electrotherapy, manual therapy, dry needling, and myofascial dry cupping and more... to create
              personalized treatment plans. I’m always eager to learn and grow, which is why I’ve pursued specialized
              certifications, including Oncology Scar Specialist and Manual Lymph Drainage according to Dr. Vodder ect,
              to provide the best possible care for my patients.
            </p>
            <p>
              Fluent in both English and Polish, I love working as part of a multi-disciplinary team, collaborating with
              doctors, nurses, and occupational therapists to ensure a holistic and well-rounded approach to treatment.
              More than anything, I pride myself on building strong, trusting relationships with my patients—making sure
              they feel heard, supported, and empowered on their journey to recovery.
            </p>
            <p>
              Now based in Swansea, I continue to expand my expertise as both a physiotherapist and a sports massage
              therapist. Helping people improve their health, mobility, and overall well-being is what truly drives me,
              and I’m grateful for the opportunity to make a difference every day. HCPC Registered Physiotherapist
            </p>
          </div>
        </div>
        <div className="w-1/2">
          {/* image section */}
          <ImageComponent images={[imageOne.src, imageTwo.src, imageThree.src, imageFour.src]} />
        </div>
      </div>
      {/* section services */}
      <ServicesSection />

      {/* section one */}

      <AboutUsSectionComponent data={HeadacheMigraineData} />
      
    </div>
  );
}
