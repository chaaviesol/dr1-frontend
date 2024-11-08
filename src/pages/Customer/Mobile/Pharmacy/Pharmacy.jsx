import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import { BASE_URL } from "../../../../config";
import { Loader } from "../../../../components/Loader/Loader";

import ClickToSearchBox from "../components/ClickToSearchBox/ClickToSearchBox";
import CartIcon from "../../../../components/CartIcon";
function Pharmacy() {
  const [marketplaceProducts, setMarketplaceProducts] = useState([]);
  const [isCategoryFetching, setIsCategoryFetching] = useState(false);

  const { auth } = useAuth();
  const navigate = useNavigate();

  const handleOpen = () => {
    console.log({ auth });
    if (auth.userId && auth.userType === "customer") {
      navigate("/uploadprescription");
    } else {
      toast.info("Please login as a customer!");
    }
  };

  const handleNavigation = (categoryId) => {
    navigate("/pharmacyproducts", {
      state: { passedCategoryId: categoryId },
    });
  };

  const fetchCategories = async () => {
    try {
      setIsCategoryFetching(true);
      const response = await axios.get(`${BASE_URL}/product/getcategory`);
      setMarketplaceProducts(response?.data?.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsCategoryFetching(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <>
      <div className="pharmacysection">
        <div
          style={{
            marginBottom: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "50px",
          }}
        >
          <div style={{ width: "83%", height: "50px" }}>
            <ClickToSearchBox placeholder="Search product" />
          </div>
          <div
            style={{ height: "50px", width: "50px" }}
            onClick={() => navigate("/cart")}
          >
            <CartIcon />{" "}
          </div>
        </div>
        {isCategoryFetching && <Loader />}
        <div className="uploadprescriptionsection flex">
          <div className="uploadprescriptionsecleft flex">
            <h3>
              Get Your Medicine
              <h3>At Home</h3>
            </h3>

            <div className="ploadprescriptionfesec">
              <div className="ploadprescriptionfe flex">
                <i className="ri-calendar-schedule-line"></i>
                <h4>Fast Delivery</h4>
              </div>
              <div className="ploadprescriptionfe flex">
                <i className="ri-cash-line"></i>
                <h4>Cash On Delivery</h4>
              </div>
            </div>

            <button
              style={{ padding: "1rem 2rem" }}
              onClick={handleOpen}
              className="uploadprescriptionbutton flex"
            >
              <h4>Upload Prescription</h4>
            </button>
          </div>

          <div className="uploadprescriptionsecright flex">
            <img src="/images/mobile/pre.png" alt="" />
          </div>
        </div>

        <div className="mobiledoctorprofiletitle">
          <h3>Explore Our Shop</h3>
        </div>
        <div className="pharmacyshop">
          <div className="pharmacyshopcatemobile">
            {marketplaceProducts.length > 0 &&
              marketplaceProducts.map((product, index) => (
                <div
                  key={index}
                  style={{ marginBottom: "10px", backgroundColor: "#f2f5ff" }}
                  onClick={() => handleNavigation(product.id)}
                  className="pharmacyshopproduct flex"
                >
                  <div className="pharmacyshopproductimg flex">
                    <img src={product?.image} alt="" />
                  </div>
                  <div className="pharmacyshopproducttitle flex">
                    <h4>
                      {product?.category
                        ?.toLowerCase()
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </h4>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Pharmacy;
