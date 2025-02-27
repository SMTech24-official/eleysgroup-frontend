import Image from "next/image";
import React from "react";
import aboutImage from "@/assets/home/image (25).png";

function AbooutMeSection() {
  return (
    <div className="grid grid-cols-2 gap-12 container my-10">
      <div>
        <div className="bg-primary/50 max-[738px] max-w-[511px] rounded-2xl p-10">
          <Image src={aboutImage} alt="About" height={1000} width={1000} className="max-h-[738px] max-w-[511px] ml-8" />
        </div>
      </div>
      <div>
        <h2 className="text-[#FF9AE7] font-roboto text-2xl font-semibold leading-[33.6px]">About me</h2>
        <h3 className="text-[#1A1A1A] font-roboto text-[30px] font-semibold leading-[42px]">
          HCPC Registered Physiotherapist
        </h3>
        <div className="text-[#494949] font-roboto text-base font-normal leading-[25.6px] flex flex-col gap-3">
          <p>
            Hi, I’m Magda, a passionate and dedicated physiotherapist with over 10 years of experience in helping people
            move better, feel stronger, and recover from pain or injury. With a Master’s Degree in Physiotherapy, I’ve
            had the opportunity to work in both hospital and private practice settings, supporting patients through a
            wide range of conditions, from chronic pain and injuries to post-surgical rehabilitation.
          </p>
          <p>
            I believe in a hands-on, evidence-based approach to treatment, combining advanced techniques like
            electrotherapy, manual therapy, dry needling, and myofascial dry cupping and more... to create personalized
            treatment plans. I’m always eager to learn and grow, which is why I’ve pursued specialized certifications,
            including Oncology Scar Specialist and Manual Lymph Drainage according to Dr. Vodder ect, to provide the
            best possible care for my patients.
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
            and I’m grateful for the opportunity to make a difference every day.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AbooutMeSection;
