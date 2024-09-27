import React, { useState, useEffect } from 'react';

// Import local images
import pic1 from '..\\public\\images\\hohero.jpg';
import pic2 from '..\\public\\images\\hos2.jpg';
import pic3 from '..\\public\\images\\hos3.jpg';

const imageList = [pic1, pic2, pic3];
const AUTO_PLAY_INTERVAL = 3000; // Change this value to adjust the speed (in milliseconds)

const MyCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const showPreviousImage = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? imageList.length - 1 : prevIndex - 1
    );
  };

  const showNextImage = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === imageList.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(showNextImage, AUTO_PLAY_INTERVAL);
    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <div className="my-carousel">
      <button className="my-carousel-button" onClick={showPreviousImage}>
        &#10094;
      </button>
      <img src={imageList[activeIndex]} alt="carousel" className="my-carousel-image" />
      <button className="my-carousel-button" onClick={showNextImage}>
        &#10095;
      </button>
    </div>
  );
};

export default MyCarousel;
