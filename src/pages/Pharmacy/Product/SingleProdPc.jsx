import React, { useState } from "react";

import AddButton from "../../Customer/Mobile/Pharmacy/components/AddButton";
import CartControl from "../../Customer/Mobile/Pharmacy/Category/CartControl";
import Navbar from "../../../components/Navbar";
import CartTopbarWithBackButton from "../../../components/CartTopbarWithBackButton";

const SingleProductDetailsPC = ({
  handleAddToCart,
  product,
  productInCart,
  isAddingToCart,
}) => {
  const [currentImage, setCurrentImage] = useState(product?.images.image1);
  return (
    <>
      <Navbar />

      <div
        className="product-page productPageBg"
        style={{
          paddingLeft: "7rem",
          paddingRight: "7rem",
          paddingTop: "1rem",
          background: "white",
          dsiplay: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ padding: "0rem 1rem" }}>
          <CartTopbarWithBackButton />
        </div>
        <div style={{ height: "65vh", display: "flex" }}>
          {/* left section */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "70%",
                alignItems: "center",
                justifyContent: "center",
                height: "80%",
              }}
            >
              <div
                style={{
                  borderRadius: "10px",
                  padding: "1rem",
                  backgroundColor: "#F3F3F8",
                  height: "80%",
                  width: "100%",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  // src={product?.images.image1}
                  src={currentImage}
                  alt="Seda Shampoo 1"
                  className="product-image"
                  height="210px"
                  width="80px"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "2rem",
                justifyContent: "center",
                width: "70%",
              }}
            >
              {Object.keys(product?.images).map((img, index) => (
                <div
                  key={index}
                  style={{
                    borderRadius: "10px",
                    padding: "1rem",
                    backgroundColor: "#F3F3F8",
                    height: "100px",
                    width: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={()=>setCurrentImage(product?.images[img])}
                >
                  <img
                    src={product?.images[img]}
                    alt="Seda Shampoo 1"
                    className="product-image"
                    height="60px"
                    width="20px"
                    style={{ objectFit: "contain" }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* right */}

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ marginTop: "20px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingLeft: "10px",
                }}
              >
                <h3 style={{ fontSize: "12px", opacity: ".6" }}>
                  {product?.brand}
                </h3>
                <h1>{product?.name}</h1>
              </div>
            </div>

            <div
              className="price-add-section"
              style={{ border: "none", margin: "0" }}
            >
              <div className="price">₹{product?.mrp}</div>

              {productInCart ? (
                <CartControl
                  product={productInCart}
                  isLoading={isAddingToCart}
                />
              ) : (
                <AddButton
                  isAddingToCart={isAddingToCart}
                  onClick={(event) => handleAddToCart(event, product.id)}
                />
              )}
            </div>
            <div
              className="description-section"
              style={{ border: "none", paddingBottom: "0" }}
            >
              <h3>Description</h3>
              <p style={{ marginBottom: "20px", marginTop: "5px" }}>
                {product.description}
              </p>

              <div className="desc_points align-items-center">
                <img
                  src="/images/mobile/musthu/Icons/hexagon-check.png"
                  alt=""
                  className="bullet_icon"
                />
                <p>feature options</p>
              </div>
              <div className="desc_points align-items-center">
                <img
                  src="/images/mobile/musthu/Icons/hexagon-check.png"
                  alt=""
                  className="bullet_icon"
                />
                <p>feature options</p>
              </div>
              <div className="desc_points align-items-center">
                <img
                  src="/images/mobile/musthu/Icons/hexagon-check.png"
                  alt=""
                  className="bullet_icon"
                />
                <p>feature options</p>
              </div>
              <div className="desc_points align-items-center">
                <img
                  src="/images/mobile/musthu/Icons/hexagon-check.png"
                  alt=""
                  className="bullet_icon"
                />
                <p>feature options</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProductDetailsPC;
