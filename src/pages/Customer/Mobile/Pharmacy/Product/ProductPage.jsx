import React, { useState, useEffect } from "react";
import "./ProductPage.css";
import AddButton from "../components/AddButton";
import CartControl from "../Category/CartControl";
import { usePharmacyContext } from "../../../../../contexts/PharmacyContext";
import { useNavigate } from "react-router-dom";
import CartTopbarWithBackButton from "../../../../../components/CartTopbarWithBackButton";

const ProductPage = ({
  handleAddToCart,
  product,
  productInCart,
  isAddingToCart,
}) => {
  const images = [
    product?.images.image1,
    product?.images.image2,
    product?.images.image3,
    product?.images.image4,
  ];
  const [currentImage, setCurrentImage] = useState(0);
  const [startX, setStartX] = useState(null);

  const handleMouseMove = (e) => {
    const { clientX, target } = e;
    const { width } = target.getBoundingClientRect();
    const offsetX = clientX / width;

    // Calculate the index based on mouse position (for visual feedback)
    const newIndex = Math.floor(offsetX * images.length);
    if (newIndex !== currentImage) {
      setCurrentImage(Math.min(newIndex, images.length - 1));
    }
  };

  const handleMouseLeave = () => {
    setCurrentImage(currentImage); // Reset to current image on mouse leave
  };

  const handleDotClick = (index) => {
    setCurrentImage(index);
  };

  const handleImageClick = (e) => {
    const { clientX, target } = e;
    const { width } = target.getBoundingClientRect();
    const offsetX = clientX / width;

    // Change image based on click position
    const newIndex = Math.floor(offsetX * images.length);
    setCurrentImage(Math.min(newIndex, images.length - 1));
  };

  // Handle touch start event
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  // Handle touch move event
  const handleTouchMove = (e) => {
    if (!startX) return;

    const currentX = e.touches[0].clientX;
    const diffX = startX - currentX;

    if (diffX > 50) {
      // Swipe left
      setCurrentImage((prev) => Math.min(prev + 1, images.length - 1));
      setStartX(null); // Reset startX after swipe
    } else if (diffX < -50) {
      // Swipe right
      setCurrentImage((prev) => Math.max(prev - 1, 0));
      setStartX(null); // Reset startX after swipe
    }
  };

  useEffect(() => {
    // Set up mousemove listener
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="product-page productPageBg">
      <div className="product-details">
        <CartTopbarWithBackButton />

        <div style={{ marginTop: "20px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "10px",
            }}
          >
            <h1>{product?.name}</h1>
            <h3 style={{ fontSize: "12px", opacity: ".6" }}>
              {product?.brand}
            </h3>
          </div>
        </div>

        {/* carousel */}
        <div
          className="carousel-container"
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <img
            src={images[currentImage]} // Show the current image
            alt="carousel"
            className="carousel-image"
            onClick={handleImageClick} // Change image on click
          />
          <div className="dots-container">
            {images.map((_, index) => (
              <div
                key={index}
                className={`dot ${currentImage === index ? "active" : ""}`}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>
        </div>
        {/* carousel */}
      </div>

      <div className="price-add-section">
        <div className="price">₹ {product?.mrp}</div>

        {productInCart ? (
          <CartControl product={productInCart} />
        ) : (
          <AddButton
            isAddingToCart={isAddingToCart}
            onClick={(event) => handleAddToCart(event, product.id)}
          />
        )}
      </div>
      <div className="description-section">
        <h3>Description</h3>
        <p style={{ marginBottom: "20px", marginTop: "5px" }}>
          {product.description}
        </p>
        <div className="row">
          <div className="col-sm"></div>
        </div>
        <div className="desc_points align-items-center">
          <img
            src="/images/mobile/files/Icons/hexagon-check.png"
            alt=""
            className="bullet_icon"
          />
          <p>feature options</p>
        </div>
        <div className="desc_points align-items-center">
          <img
            src="/images/mobile/files/Icons/hexagon-check.png"
            alt=""
            className="bullet_icon"
          />
          <p>feature options</p>
        </div>
        <div className="desc_points align-items-center">
          <img
            src="/images/mobile/files/Icons/hexagon-check.png"
            alt=""
            className="bullet_icon"
          />
          <p>feature options</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
