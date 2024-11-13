/* eslint-disable react/prop-types */
import { Image } from "antd";
import { useState } from "react";

const ImageGallery = ({ mainImage, additionalImages }) => {
  const [selectedImage, setSelectedImage] = useState(mainImage);

  const images = [
    mainImage,
    ...additionalImages.filter((img) => img !== mainImage),
  ];

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="w-1/2 pr-10">
      <div className="flex justify-center mb-4">
        <Image
          src={selectedImage}
          alt="Main"
          className="rounded-lg object-contain h-96"
          style={{ width: "320px", height: "420px" }}
        />
      </div>

      <h3 className="text-xl font-semibold mb-4">More Images:</h3>
      <div className="pl-[95px] grid grid-cols-5 gap-2">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Product image ${index + 1}`}
            className="h-32 object-cover rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
