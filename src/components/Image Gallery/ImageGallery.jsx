/* eslint-disable react/prop-types */
import { useState } from "react";

const ImageGallery = ({ mainImage, additionalImages }) => {
  const [selectedImage, setSelectedImage] = useState(mainImage);

  const handleImageClick = (image) => {
    setSelectedImage(image); // Update selected image on click
  };

  return (
    <div className="w-1/2 pr-10">
      {/* Main Image Display */}
      <img
        src={selectedImage}
        alt="Main"
        className="rounded-lg w-full mb-4 object-contain h-96"
      />

      {/* Additional Images Gallery */}
      <h3 className="text-xl font-semibold mb-4">More Images:</h3>
      <div className="pl-[95px] grid grid-cols-5 gap-2">
        {additionalImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Product image ${index + 1}`}
            className="h-32 object-cover rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={() => handleImageClick(image)} // Update selected image on click
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
