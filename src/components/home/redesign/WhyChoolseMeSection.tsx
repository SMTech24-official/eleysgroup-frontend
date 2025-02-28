import React from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

import whyImage from "@/assets/home/image (26).png";
import Image from "next/image";

const whyChooseOptions = [
  {
    title: "Expert Care & Personalized Treatment",
    description: "Tailored therapy plans designed for your unique needs, led by certified physiotherapy professionals.",
  },
  {
    title: "Advanced Techniques & Modern Equipment",
    description: "Utilizing the latest rehabilitation technology and evidence-based techniques for faster recovery.",
  },
  {
    title: "Patient-Centered Approach",
    description: "Compassionate care with one-on-one attention to ensure your comfort and progress.",
  },
];

function WhyChoolseMeSection() {
  return (
    <div className="container my-20 grid grid-cols-1 lg:grid-cols-2 gap-12  ">
      <div>
        <h3 className="text-[#FF9AE7] text-3xl font-semibold leading-[41.6px]">Why Chose Me</h3>
        <p className="text-[#494949] text-base font-normal leading-[25.6px]">
          During your assessment, we’ll discuss your headache history, triggers, and lifestyle factors to develop a
          personalized treatment plan.
        </p>

        <div className="flex flex-col gap-8 mt-8">
          {whyChooseOptions.map((option, index) => (
            <div key={index} className="flex gap-4 ">
              <IoCheckmarkCircleOutline size={30} className="text-primary" />

              <div className="flex flex-col gap-2">
                {" "}
                <h4 className="text-[#303030] text-sm font-medium leading-[22.4px]">{option.title}</h4>
                <p className="text-[#494949] text-base font-normal leading-[25.6px]">{option.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Image
          src={whyImage}
          alt="Why Choose Me"
          height={1000}
          width={1000}
          className="max-h-[720px] w-full h-full max-w-[588px]"
        />
      </div>
    </div>
  );
}

export default WhyChoolseMeSection;
