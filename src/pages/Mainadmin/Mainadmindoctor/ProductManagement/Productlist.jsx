import React, { useState, useEffect, useRef } from "react";
import "./productlist.css";
import CustomSelect from "../../../../components/EditProfile/Editps";
import { BASE_URL, PHARMACY_URL } from "../../../../config";
import axios from "axios";
import { Loader } from "../../../../components/Loader/Loader";

export default function Productlist({
  updateState: { setChangeDashboards, setDetailData },
}) {
  const [state, setState] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredState, setFilteredState] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef();
  console.log({ state });
  useEffect(() => {
    setIsLoading(true);
    axios.get(`${PHARMACY_URL}/pharmacy/getproducts`).then((res) => {
      if (res?.status === 200) {
        setIsLoading(false);
        setState(res?.data?.data);
        setFilteredState(res?.data?.data);
      }
    });
  }, []);
  const navigateFn = () => {
    setChangeDashboards({ categorymanagement: true });
  };
  const navigateProductadd = () => {
    setChangeDashboards({ addproduct: true });
    setDetailData("");
  };

  const handleSelectChange = (field, value) => {
    let searchValue = searchRef.current.value?.toLowerCase() || "";

    if (field === "category") {
      setSelectedCategory(value);

      const filtered = state.filter((item) => {
        const categoryMatch = value
          ? item.category.some(
              (cat) => cat.toLowerCase() === value.toLowerCase()
            )
          : true;

        const searchMatch = searchValue
          ? item.name.toLowerCase().includes(searchValue)
          : true;

        return categoryMatch && searchMatch;
      });

      setFilteredState(filtered); 
    }
  };

  //  => NOT WORKING
  const handleSearchChange = (searchTerm) => {
    let filtered = state;

    if (selectedCategory) {
      filtered = filtered.filter((item) =>
        item.category.some(
          (cat) => cat.toLowerCase() === selectedCategory.toLowerCase()
        )
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((item) => {
        const name = item.name ? item.name.toLowerCase() : "";
        const brand = item.brand ? item.brand.toLowerCase() : "";
        return (
          name.includes(searchTerm.toLowerCase()) ||
          brand.includes(searchTerm.toLowerCase())
        );
      });
    }

    setFilteredState(filtered);
  };

  const navigateAddP = (data) => {
    console.log(data);

    // if (isAnyFieldMissing || isAnyImageMissing) {
    //   toast.error("All fields are mandatory, fill them all");
    // } else {
    setDetailData({ data });
    setChangeDashboards({ productmanagementOrderDetail: true });
    // }
  };

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${BASE_URL}/product/getcategory`).then((res) => {
      console.log(res?.data?.data);
      if (res?.status === 200) {
        setIsLoading(false);
        const categoriesData = res.data.data.map((item) => item.category);
        setCategories(categoriesData);
      }
    });
  }, []);

  return (
    <div>
      <h3 style={{ marginTop: "15px" }}>Product Management</h3>
      {isLoading && <Loader />}
      <div className="manageprotop flex">
        <div className="manageprotop-left flex">
          <div className="input_search_box_adminP">
            <input
              ref={searchRef}
              type="text"
              placeholder="Search products..."
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            <div className="input_search_box_adminPICn">
              <i className="ri-search-2-line"></i>
            </div>
          </div>

          <div className="manageprotop-left-select">
            <CustomSelect
              value={selectedCategory}
              onChange={(value) => handleSelectChange("category", value)}
              placeholder="Select category"
              options={categories}
            />
          </div>
        </div>

        <div className="manageprotop-right flex">
          <button onClick={navigateFn}>Manage Category</button>
          <button onClick={navigateProductadd} className="flex">
            <i class="ri-add-circle-line"></i>
            <h4>Add New Product</h4>
          </button>
        </div>
      </div>

      <div className="productlistadmin">
        <div class="product-section-pro">
          {filteredState?.map((key, index) => (
            <div
              onClick={() => navigateAddP(key)}
              className="pharmacyshopproduct-pro flex"
            >
              <div className="pharmacyshopproductimg-pro flex">
                <img src={key?.images?.image1} alt="" />
              </div>
              <div className="pharmacyshopproducttitle-pro">
                <h4>{key?.brand}</h4>
                <h3>
                  {key?.name.length > 20
                    ? `${key?.name.substring(0, 20)}...`
                    : key?.name}
                </h3>
              </div>

              <div className="flex price-section-pro">
                <h2>₹ {key?.mrp}</h2>
                <button onClick={() => navigateAddP(key)}>view</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
