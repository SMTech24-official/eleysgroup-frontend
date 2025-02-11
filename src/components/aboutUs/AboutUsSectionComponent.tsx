import { Treatment } from "@/data/aboutUsPage";
import Image from "next/image";
import React from "react";

interface AboutUsSectionComponentProps {
  data: Treatment;
  bgColor?: boolean;
  reverseSide?: boolean;
}

function AboutUsSectionComponent({ data, bgColor, reverseSide = false }: AboutUsSectionComponentProps) {
  // console.log(data);
  return (
    <div className={`${bgColor && "bg-[#f0e7ee]"} `}>
      <div
        className={`container py-24 flex flex-col-reverse lg:flex-row gap-10 ${reverseSide && "lg:flex-row-reverse"} `}
      >
        <div className="w-full lg:w-1/2 flex flex-col gap-8">
          <div>
            <h2 className="text-[#1A1A1A] text-[30px] font-semibold leading-[140%]">{data.title}</h2>
            <p className="text-[#494949] text-[16px] font-normal leading-[160%]">{data.description}</p>
          </div>
          <div className="text-[#494949] flex flex-col gap-4 text-[16px] font-normal leading-[160%]">
            <div>
              <h3>{data.helpTitle}</h3>
              <p>{data.helpDescription}</p>
            </div>
            <ul className="flex gap-3 flex-col">
              {data.options.map((option, indx) => (
                <li key={indx} className="flex gap-2">
                  <div className="inline">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M11.0763 21.2696C11.0127 21.2696 10.9497 21.2564 10.8914 21.2309C10.833 21.2054 10.7806 21.1681 10.7374 21.1213L1.59956 11.2368C1.53864 11.1709 1.49826 11.0887 1.48335 11.0002C1.46844 10.9117 1.47965 10.8208 1.51562 10.7385C1.55158 10.6563 1.61073 10.5864 1.68583 10.5372C1.76093 10.4881 1.84872 10.462 1.93846 10.462H6.33693C6.40297 10.462 6.46824 10.4761 6.52833 10.5035C6.58843 10.5309 6.64195 10.5708 6.6853 10.6207L9.7392 14.1341C10.0692 13.4286 10.7082 12.2539 11.8293 10.8225C13.4868 8.70631 16.5698 5.59411 21.8444 2.78463C21.9464 2.73034 22.065 2.71625 22.1768 2.74514C22.2886 2.77403 22.3856 2.84381 22.4485 2.94068C22.5114 3.03756 22.5357 3.1545 22.5165 3.26841C22.4974 3.38232 22.4363 3.48492 22.3452 3.55595C22.3251 3.57169 20.2914 5.17323 17.9508 8.10672C15.7967 10.8063 12.9332 15.2204 11.5242 20.919C11.4995 21.0191 11.4419 21.1081 11.3607 21.1717C11.2795 21.2352 11.1793 21.2698 11.0762 21.2698L11.0763 21.2696Z"
                        fill="#FF9CE7"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[#444] text-[16px] font-medium leading-[160%] text-nowrap inline">
                      {option.title}
                    </span>{" "}
                    {`-`} {option.description}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <Image height={500} width={500} className="h-full w-full" src={data.image} alt="Headache & Migraine" />
        </div>
      </div>
    </div>
  );
}

export default AboutUsSectionComponent;
