import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const allImages = [
  "/images/sp1.jpg",
  "/images/sp2.jpg",
  "/images/sp3.jpg",
  "/images/sp4.jpg",
  "/images/sp6.jpg",
  "/images/sp7.jpg",
  "/images/sp8.jpg",
  "/images/sp9.jpg",
  // Add more images here
];
const speciality = [
  "Dental",
  "ENT",
  "Cardiology",
  "Dermatology",
  "Peadiatrics",
  "Gynecology",
  "Orthopedics",
  "Ophthalmology",
];

const ImageScroll = () => {
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollIntervalId = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      startScrolling();
      return () => stopScrolling(); // Cleanup on component unmount
    }
  }, []);
  
  const handleFilterBySpeciality = (Value) => {
    navigate("/hospitalfilter", {
      state: { speciality: Value, type: "Allopathy" },
    });
  };

  const startScrolling = () => {
    const container = scrollContainerRef.current;
    const scrollSpeed = 1;
    const scrollInterval = 15;

    scrollIntervalId.current = setInterval(() => {
      container.scrollLeft += scrollSpeed;
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }
    }, scrollInterval);
  };

  const stopScrolling = () => {
    if (scrollIntervalId.current) {
      clearInterval(scrollIntervalId.current);
      scrollIntervalId.current = null;
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const renderContent = () => {
    if (allImages.length === 0) {
      return (
        <div className="empty-scroll-state">
          <p>No images available. Displaying placeholder.</p>
        </div>
      );
    }

    const duplicatedImages = [...allImages, ...allImages, ...allImages];
    const duplicatespecialities = [...speciality, ...speciality, ...speciality];

    return (
      <>
        {duplicatedImages.map((src, index) => (
          <div key={index} className="scroll-image-item-div">
            <img
              src={src}
              alt=""
              draggable="false"  // Disable image dragging
              className="scroll-image-item"
            />
            <div className="scroll-image-item-div2">
              <div>{duplicatespecialities[index]}</div>
            </div>
            <button onClick={() =>
                handleFilterBySpeciality(duplicatespecialities[index])
              } className="iconboxnew2">
              <i className="ri-search-line"></i>
            </button>
          </div>
        ))}
      </>
    );
  };

  return (
    <div
      ref={scrollContainerRef}
      className="scroll-image-container"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => { handleMouseUp(); startScrolling(); }}
      onMouseEnter={stopScrolling}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {renderContent()}
    </div>
  );
};

export default ImageScroll;