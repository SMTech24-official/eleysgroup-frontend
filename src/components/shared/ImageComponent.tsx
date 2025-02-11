/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React from "react";

const ImageComponent = ({ images }: { images: any }) => {
  console.log(images);
  // const imageOne = images[0]?.url;
  // const imageTwo = images[1]?.url;
  // const imageThree = images[2]?.url;
  // const imageFour = images[3]?.url;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {images?.map((image: any, index: number) => (
        <div key={index} className="">
          <Image src={image.url || image} alt="image" height={400} width={400} className="h-[200px] w-[200x]" />
        </div>
      ))}
    </div>
  );
};

export default ImageComponent;
