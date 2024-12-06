import React, { useEffect, useState } from "react";
import "./categorys.css";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import CartControl from "./CartControl";
import useAuth from "../../../../../hooks/useAuth";
import { toast } from "react-toastify";
import SearchBox from "../../../../Pharmacy/Product/SearchBox";
import axios from "axios";
import { BASE_URL, PHARMACY_URL } from "../../../../../config";
import { useMutation, useQuery } from "@tanstack/react-query";
import CartIcon from "../../../../../components/CartIcon";
import { usePharmacyContext } from "../../../../../contexts/PharmacyContext";
import { debounce } from "lodash";
import { Loader } from "../../../../../components/Loader/Loader";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import CartTopbarWithBackButton from "../../../../../components/CartTopbarWithBackButton";
// import { LoginModal } from "../../../../../components/LoginModal/LoginModal";

export default function SelectCategory({ isMobile, passedCategoryId }) {
  const [currentActiveCategoryIndex, setCurrentActiveCategoryIndex] =
    useState(0);
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartItems, setCartItems, refetchCart } = usePharmacyContext();

  const navigate = useNavigate();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const fetchProducts = async (id) => {
    const response = await axios.get(`${PHARMACY_URL}/product/products`);
    return response.data.data;
  };

  const {
    data: products,
    isLoading: isFetchingProducts,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["fetchProducts"],
    queryFn: () => fetchProducts(),
  });
  useEffect(() => {
    if (products) {
      setFilteredProducts(products);
    }
  }, [products]);
  useEffect(() => {
    if (auth.userId) {
      refetchProducts();
    }
  }, [auth.userId]);

  const addTocart = async (payload) => {
    console.log(payload);
    const finalPayload = {
      ...payload,
      prod_id: payload.prodId,
    };
    const response = await axiosPrivate.post(
      `${PHARMACY_URL}/pharmacy/addToCart`,
      finalPayload
    );
    return response.data.data;
  };

  const addTocartMutation = useMutation({
    mutationKey: ["fetchBotCallResultMutation"],
    mutationFn: (data) => addTocart(data),
    onSuccess: () => {
      refetchCart();
    },
    onError: (error) => {
      console.log("popo");
    },
  });

  console.log(products);

  const handleAddToCart = async (event, prodId) => {
    event.stopPropagation();

    if (auth.userId && auth.userType === "customer") {
      const quantity = 1;
      const data = {
        prodId,
        quantity,
      };
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.product_id === prodId ? { ...item, quantity: 1 } : item
        )
      );
      try {
        await addTocartMutation.mutateAsync(data);
      } catch (error) {
        console.error("Failed to update cart:", error);
      }
    } else {
      navigate("/login")
    }
  };

  const handleViewProductInfo = (product) => {
    navigate("/productdetails", { state: { clickedProductDetails: product } });
  };
  const filterProducts = () => {
    const activeProductArray =
      products?.[currentActiveCategoryIndex]?.products || [];

    const filteredProductsArray = activeProductArray.filter((product) => {
      const nameMatch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const brandMatch = product.brand
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return nameMatch || brandMatch;
    });
    const prodData = products.map((category, index) => {
      if (index === currentActiveCategoryIndex) {
        return { ...category, products: filteredProductsArray };
      }
      return category; // Keep other categories untouched
    });

    // Set the filtered products
    setFilteredProducts(prodData);
  };
  const handleProductSearchChanges = debounce((e) => {
    setSearchQuery(e.target.value);
  }, 500);
  //update vcurrent showing category and products
  const handleUpdateSelectedCategory = (index) => {
    setCurrentActiveCategoryIndex(index);
    setFilteredProducts(products);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (products) {
      filterProducts();
    }
  }, [searchQuery, products]);
  useEffect(() => {
    if (passedCategoryId && products && products.length > 0) {
      const categoryIndex = products.findIndex(
        (ele) => ele.id === passedCategoryId
      );
      // alert(categoryIndex);
      handleUpdateSelectedCategory(categoryIndex);
    }
  }, [passedCategoryId, products]);
  console.log("cartItems =>", cartItems);

  return (
    <div className="category_page">
      {isFetchingProducts && <Loader />}
      <div className="scsb">
        <CartTopbarWithBackButton />
      </div>
      <div className="scsb">
        <SearchBar handleProductSearch={handleProductSearchChanges} />
      </div>
      <div className="searchProdContainer">
        <div className="searchProdContainer-searchboxandcartcontainer">
          <div className="searchProdContainer-searchbox">
            <SearchBox handleProductSearch={handleProductSearchChanges} />
          </div>
          <div style={{ height: "50px", width: "50px" }}>
            <CartIcon />
          </div>
        </div>
      </div>
      <div className="subcategory_section">
        <div className="subcategory_list">
          {products &&
            products.length > 0 &&
            products.map((ele, index) => (
              <div
                style={{ WebkitTapHighlightColor: "transparent" }}
                key={ele.id}
                className="subcategory_item"
                onClick={() => handleUpdateSelectedCategory(index)}
              >
                <div
                  className={`subcategory-item ${
                    index === currentActiveCategoryIndex ? "selected" : ""
                  }`}
                >
                  <img
                    src={ele.categoryImage}
                    alt=""
                    className="product_image_main"
                  />
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    textAlign: "center",
                  }}
                >
                  {/* {ele.categoryName} */}
                  {ele?.categoryName
                    ?.toLowerCase()
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </span>
              </div>
            ))}
        </div>

        <div
          className="product_list_scroll"
          style={{ maxHeight: "85vh", overflow: "auto" }}
        >
          {filteredProducts &&
            filteredProducts?.length > 0 &&
            filteredProducts[currentActiveCategoryIndex].products.map(
              (product) => {
                // Find the product in cartItems by product id
                const productInCart =
                  cartItems &&
                  cartItems.length > 0 &&
                  cartItems.find(
                    (cartItem) => cartItem.product_id === product.id
                  );

                return (
                  <div key={product?.id} className="product_tile">
                    {/* Product Image */}
                    <div
                      onClick={() => handleViewProductInfo(product)}
                      className="product_image"
                    >
                      <img src={product?.images?.image1} alt={product?.name} />
                    </div>

                    {/* Product Info */}
                    <div
                      onClick={() => handleViewProductInfo(product)}
                      className="product_info"
                      style={{ textAlign: "left", width: "100%" }}
                    >
                      <h2 className="product_brand_name">{product?.brand}</h2>
                      <h2 className="product_name">
                        {" "}
                        {product?.name?.length > 18
                          ? `${product.name.slice(0, 18)}...`
                          : product.name}
                      </h2>
                      {/* <h2 className="product_qlty">{product?.quantity}</h2> */}
                    </div>

                    {/* Product Price and Cart Control */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        paddingTop: "10px",
                      }}
                    >
                      <span className="product_price">₹ {product?.mrp}</span>

                      {/* Conditionally render CartControl or Add Button */}
                      {productInCart ? (
                        <CartControl product={productInCart} />
                      ) : (
                        <button
                          disabled={
                            addTocartMutation.isPending === true ||
                            isFetchingProducts === true
                          }
                          style={{
                            background: "#3a65fd",
                            WebkitTapHighlightColor: "transparent",
                          }}
                          onClick={(event) =>
                            handleAddToCart(event, product.id)
                          }
                          className="pharmacy-category-addbutton"
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                );
              }
            )}
        </div>
      </div>
   
    </div>
  );
}
