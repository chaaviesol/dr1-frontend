import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";


// Array of imported images
const allImages = [
  "/images/sp1.jpg",
  "/images/sp2.jpg",
  "/images/sp3.jpg",
  "/images/sp4.jpg",
  "/images/sp5.jpg",
  "/images/sp6.jpg",
  "/images/sp7.jpg",
  "/images/sp8.jpg",
  // Add more images here
];
const speciality = [
  "Dental",
  "ENT",
  "Cardiology",
  "Dermatology",
  "Peadiatrics",
  "Gynaecology",
  "Orthopedics",
  "Ophthalmology",
];

const ImageScroll = () => {
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollSpeed = 1; // Adjust this value to control scroll speed
      const scrollInterval = 15; // Interval in milliseconds

      const scroll = () => {
        container.scrollLeft += scrollSpeed; // Scroll the container

        // If we've scrolled past the first set of images, reset scroll position for infinite loop
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0; // Reset scroll position to create a loop effect
        }
      };

      const scrollIntervalId = setInterval(scroll, scrollInterval);

      // Cleanup on component unmount
      return () => clearInterval(scrollIntervalId);
    }
  }, []);
  const handleFilterBySpeciality = (Value) => {
    navigate("/hospitalfilter", {
      state: { speciality: Value, type: "Allopathy" },
    });
  };
  const renderContent = () => {
    if (allImages.length === 0) {
      return (
        <div className="empty-scroll-state">
          <p>No images available. Displaying placeholder.</p>
        </div>
      );
    }

    // Duplicate images multiple times for continuous scrolling
    const duplicatedImages = [...allImages, ...allImages, ...allImages];
    const duplicatespecialities = [...speciality, ...speciality, ...speciality];

    return (
      <>
        {duplicatedImages.map((src, index) => (
          <div key={index} className="scroll-image-item-div">
            <img
              key={index}
              src={src}
              alt={`Image ${index}`}
              className="scroll-image-item"
              onClick={() => {
                handleFilterBySpeciality(duplicatespecialities[index]);
              }}
            />

            <div className="scroll-image-item-div2">
              <div key={index}>{duplicatespecialities[index]}</div>
            </div>
            <button class="iconboxnew2">
              <i class="ri-search-line"></i>
            </button>
          </div>
        ))}
      </>
    );
  };

  return (
    <div ref={scrollContainerRef} className="scroll-image-container">
      {renderContent()}
    </div>
  );
};

export default ImageScroll;
