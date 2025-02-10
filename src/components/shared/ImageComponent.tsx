import Image from "next/image";
import React from "react";

const ImageComponent = ({ images }: { images: string[] }) => {
  const imageOne = images[0];
  const imageTwo = images[1];
  const imageThree = images[2];
  const imageFour = images[3];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-4">
        <div className="relative">
          <Image
            src={imageOne}
            height={400}
            width={400}
            alt="Physical therapy session"
            className="object-cover rounded-lg w-full h-auto"
          />
        </div>
        <div className="relative">
          <Image
            src={imageTwo}
            height={400}
            width={400}
            alt="Medical consultation"
            quality={100}
            className="object-cover rounded-lg w-full h-auto"
          />
        </div>
      </div>
      <div className="space-y-4">
        <div className="relative">
          <Image
            height={400}
            width={400}
            src={imageThree}
            alt="Patient care"
            quality={100}
            className="object-cover rounded-lg w-full h-auto"
          />
        </div>
        <div className="relative">
          <Image
            src={imageFour}
            height={400}
            width={400}
            alt="Exercise therapy"
            quality={100}
            className="object-cover rounded-lg w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageComponent;
