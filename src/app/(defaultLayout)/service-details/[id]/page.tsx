import ImageComponent from "@/components/shared/ImageComponent";
import imageOne from "@/assets/aboutUs-image-one.png";
import imageTwo from "@/assets/aboutUs-image-two.png";
import imageThree from "@/assets/aboutUs-image-three.png";
import imageFour from "@/assets/aboutUs-image-four.png";
import ServicesSection from "@/components/home/ServicesSection";
function ServiceDetails() {
  return (
    <div>
      <div className="flex py-20 container">
        <div className="lg:w-1/2 flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <h2 className="text-[#3D3D3D] text-[40px] font-semibold leading-[130%]">Dry cupping</h2>
            <p className="text-[#494949] text-[16px] font-normal leading-[160%]">
              Dry cupping, also known as air cupping or suction cupping, is a therapeutic technique that involves
              creating a vacuum within cups and placing them on specific areas of the body. By creating suction, dry
              cupping helps to stimulate circulation, relieve muscle tension. Dry cupping therapy offers several
              benefits, including:
            </p>
          </div>
          <ul className="text-[#494949] text-[16px] font-normal leading-[160%]">
            {[1, 2, 3, 4]?.map((item, index) => (
              <li className="flex gap-2" key={index}>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.26686 3.95498C6.91012 3.90362 7.52077 3.65061 8.01186 3.23198C8.56652 2.75957 9.27129 2.50012 9.99986 2.50012C10.7284 2.50012 11.4332 2.75957 11.9879 3.23198C12.4789 3.65061 13.0896 3.90362 13.7329 3.95498C14.4593 4.01304 15.1413 4.32794 15.6566 4.84325C16.1719 5.35855 16.4868 6.04055 16.5449 6.76698C16.5959 7.40998 16.8489 8.02098 17.2679 8.51198C17.7403 9.06664 17.9997 9.77141 17.9997 10.5C17.9997 11.2286 17.7403 11.9333 17.2679 12.488C16.8492 12.9791 16.5962 13.5897 16.5449 14.233C16.4868 14.9594 16.1719 15.6414 15.6566 16.1567C15.1413 16.672 14.4593 16.9869 13.7329 17.045C13.0896 17.0963 12.4789 17.3493 11.9879 17.768C11.4332 18.2404 10.7284 18.4998 9.99986 18.4998C9.27129 18.4998 8.56652 18.2404 8.01186 17.768C7.52077 17.3493 6.91012 17.0963 6.26686 17.045C5.54043 16.9869 4.85843 16.672 4.34313 16.1567C3.82782 15.6414 3.51292 14.9594 3.45486 14.233C3.4035 13.5897 3.15049 12.9791 2.73186 12.488C2.25945 11.9333 2 11.2286 2 10.5C2 9.77141 2.25945 9.06664 2.73186 8.51198C3.15049 8.02089 3.4035 7.41024 3.45486 6.76698C3.51292 6.04055 3.82782 5.35855 4.34313 4.84325C4.85843 4.32794 5.54043 4.01304 6.26686 3.95498ZM13.7069 9.20698C13.889 9.01838 13.9898 8.76578 13.9875 8.50358C13.9853 8.24138 13.8801 7.99057 13.6947 7.80516C13.5093 7.61976 13.2585 7.51459 12.9963 7.51231C12.7341 7.51003 12.4815 7.61082 12.2929 7.79298L8.99986 11.086L7.70686 9.79298C7.51826 9.61082 7.26565 9.51003 7.00346 9.51231C6.74126 9.51459 6.49045 9.61976 6.30504 9.80516C6.11963 9.99057 6.01446 10.2414 6.01219 10.5036C6.00991 10.7658 6.1107 11.0184 6.29286 11.207L8.29286 13.207C8.48039 13.3945 8.7347 13.4998 8.99986 13.4998C9.26502 13.4998 9.51933 13.3945 9.70686 13.207L13.7069 9.20698Z"
                      fill="#FF9CE7"
                    />
                  </svg>
                </span>
                Benefit {item}
              </li>
            ))}
          </ul>

          <p className="text-[#3D3D3D] text-2xl font-semibold leading-[140%]">45 min/ £40</p>
        </div>
        <div className="lg:w-1/2">
          <ImageComponent images={[imageOne.src, imageTwo.src, imageThree.src, imageFour.src]} />
        </div>
      </div>
      <ServicesSection />
    </div>
  );
}

export default ServiceDetails;
