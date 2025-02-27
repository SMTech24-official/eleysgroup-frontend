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
        <h3>Why Chose Me</h3>
        <p>
          During your assessment, we’ll discuss your headache history, triggers, and lifestyle factors to develop a
          personalized treatment plan.
        </p>

        <div>
          {whyChooseOptions.map((option, index) => (
            <div key={index} className="flex gap-4 ">
              <IoCheckmarkCircleOutline />

              <div>
                {" "}
                <h4>{option.title}</h4>
                <p>{option.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Image src={whyImage} alt="Why Choose Me" height={1000} width={1000} className="max-h-[720px] max-w-[588px]" />
      </div>
    </div>
  );
}

export default WhyChoolseMeSection;
