import React from "react";
import "./ProductPage.css"; // Import the CSS file for styling
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
  const { cartItems } = usePharmacyContext();
  const navigate = useNavigate();

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
              {product?.brand_name}
            </h3>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "20px",
          }}
        >
          <img
            src={product?.images.image1}
            alt="Seda Shampoo 1"
            className="product-image"
            height="110px"
            width="20px"
            style={{ objectFit: "contain" }}
          />
        </div>
        {/* <Carousel showThumbs={false} showStatus={false}>
          <div>
            <img src="Mobile images/Icons/pngwing.com.png" alt="Seda Shampoo 2" className="product-image" />
          </div>
          <div>
            <img src="Mobile images/Icons/pngwing.com.png" alt="Seda Shampoo 3" className="product-image" />
          </div>
        </Carousel> */}
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
  );
};

export default ProductPage;
