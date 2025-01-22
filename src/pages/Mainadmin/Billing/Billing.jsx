import React, { useEffect, useReducer, useRef, useState } from "react";
import "./billingStyles.css";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { PHARMACY_URL } from "../../../config";
import { Loader } from "../../../components/Loader/Loader";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { billingReducer, INITIAL_STATE, ACTIONS } from "./billingReducer";
import {
  Checkbox,
  CircularProgress,
  FormControl,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

export default function Billing() {
  const [state, dispatch] = useReducer(billingReducer, INITIAL_STATE);
  const [width, setWidth] = useState("50%"); // Initial width state
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const previousSalesId = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const sales_id = location.state.sales_id;

  const ITEM_HEIGHT = 35;
  const ITEM_PADDING_TOP = 0;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 200,
      },
    },
  };
  //fetch billDetails

  const fetchBillDetails = async (sales_id) => {
    const response = await axios.post(
      `${PHARMACY_URL}/pharmacy/getinvsalesorder`,
      {
        sales_id,
      }
    );
    console.log(response);
    return response.data.data || [];
  };

  const {
    data: billDetails,
    isLoading: isFetchingBillDetailsLoading,
    refetch,
  } = useQuery({
    queryKey: ["FetchBillDetails"],
    queryFn: async ({ queryKey }) => {
      try {
        const response = await fetchBillDetails(sales_id);
        return response || [];
      } catch (error) {
        if (error.response && error.response.status === 404) {
          return [];
        }
        throw error;
      }
    },
    enabled: !!sales_id,
  });

  useEffect(() => {
    if (
      billDetails?.sales_id
      //   billDetails.sales_id !== previousSalesId.current
    ) {
      previousSalesId.current = billDetails.sales_id;
      dispatch({
        type: ACTIONS.SET_STATE,
        payload: billDetails,
      });
    }
  }, [billDetails]);
  console.log("state", state);

  const changeWidth = () => {
    setWidth((prevWidth) => (prevWidth === "50%" ? "100px" : "50%"));
  };

  const headings = [
    "Name",
    "Type",
    "Every",
    "Interval",
    "Frequency",
    "BF/AF",
    "Dose",
    "Qty",
    "MRP",
    "HSN",
    "Selling Price",
    "Discount",
    "Total",
  ]; // Custom column names

  const getWidth = (index) => {
    const widths = [
      "13%",
      "9%",
      "9%",
      "9%",
      "9%",
      "9%",
      "6%",
      "6%",
      "6%",
      "6%",
      "6%",
      "6%",
      "6%",
    ];
    return widths[index];
  };

  const handleFormChange = (event) => {
    const { value } = event.target;
    const field = event.target.name;

    dispatch({
      type: ACTIONS.UPDATE_FIELD,
      payload: { field, value },
    });
  };
  const handleProductChange = (e, rowIndex) => {
    const { value } = e.target;
    const field = e.target.name;

    dispatch({
      type: field === "timing" ? ACTIONS.SELECT_TIMING : ACTIONS.UPDATE_PRODUCT,
      payload: { field, value, rowIndex },
    });
  };

  //seperated this function becouse of calculating total of that product
  const handleProductChangeQtyOrDiscount = (e, rowIndex) => {
    const { value } = e.target;
    const field = e.target.name;

    dispatch({
      type: ACTIONS.UPDATE_PRODUCT_QTY_OR_DISCOUNT,
      payload: { field, value, rowIndex },
    });
  };
  //cal total billamount
  const total_amount = state.medicine_details.reduce(
    (acc, currItem) => acc + currItem.total,
    0 // Initial value of the accumulator
  );

  const roundedTotalAmount = total_amount
    ? parseFloat(total_amount.toFixed(2))
    : 0;

  //submit
  const confirmInvoice = async () => {
    const endPoint =
      state.order_type === "prescription"
        ? "prescriptioninvoice"
        : "createinvoice";
    const response = await axiosPrivate.post(
      `${PHARMACY_URL}/pharmacy/${endPoint}`,
      {
        ...state,
        sold_by: "Dr1",
        total_amount: roundedTotalAmount,
      }
    );
    return response.data;
  };

  const confirmInvoiceMutation = useMutation({
    mutationKey: ["confirmInvoice"],
    mutationFn: () => confirmInvoice(),
    onSuccess: (data) => {
      console.log({ data });
      toast.success(data.message);
      navigate("/mainadmin", { state: { sales_id: sales_id } });
    },
    onError: (err) => console.log(err),
  });
  //submit button

  const handleSubmit = () => {
    confirmInvoiceMutation.mutateAsync();
  };

  //fetch products

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${PHARMACY_URL}/pharmacy/getprods`);
      console.log(response.data.data);
      setProducts(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  //dropdown product

  const styles = {
    container: {
      position: "relative",
      width: "300px",
      border: "none",
    },
    input: {
      width: "100%",
      padding: "10px",
      fontSize: "16px",
      borderRadius: "4px",
      height: "100%",
    },
    dropdown: {
      position: "absolute",
      top: "105%",
      left: "0",
      right: "0",
      maxHeight: "200px",
      overflowY: "auto",
      border: "1px solid #ccc",
      backgroundColor: "#fff",
      zIndex: "10",
      borderRadius: "4px",
      // display: showDropdown ? "block" : "none",
    },
    dropdownItem: {
      padding: "10px",
      cursor: "pointer",
      whitespace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      color: "black",
    },
    dropdownItemHover: {
      backgroundColor: "#f0f0f0",
    },
  };

  const handleInputChange = (e, rowIndex) => {
    const value = e.target.value.toLowerCase();
    const field = e.target.name;

    dispatch({
      type: ACTIONS.UPDATE_PRODUCT,
      payload: { field, value, rowIndex },
    });
    if (value) {
      const filtered = products.filter((item) =>
        item.name.toLowerCase().includes(value)
      );

      setFilteredData(filtered);
      setDropdownIndex(rowIndex);
    } else {
      setFilteredData([]);
      setDropdownIndex(null);
    }
  };

  const handleItemClick = (item, rowIndex) => {
    setQuery(item.name);
    console.log("handleItemClick triggered", item, rowIndex); // Debug

    console.log(item);
    dispatch({
      type: ACTIONS.CLICK_A_PRODUCT,
      payload: { item, rowIndex },
    });
    setDropdownIndex(null);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest(".search-container")) {
      setDropdownIndex(null);
    }
  };

  const deleteRow = (rowIndex) => {
    dispatch({
      type: ACTIONS.DELETE_A_PRODUCT,
      payload: { rowIndex },
    });
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  console.log("filteredData", filteredData);

  const imageKeys = Object.keys(billDetails?.prescription_image || {});

  // Handle the next and previous buttons
  const handleNext = () => {
    if (currentIndex < imageKeys.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 1) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Get the current image key
  const currentImageKey = imageKeys[currentIndex - 1];

  return (
    <div className="billing-container">
      <h1>Dr1 Billing</h1>

      <div className="billingsection flex">
        {isFetchingBillDetailsLoading && <Loader />}
        {state && state.order_type === "prescription" && (
          <div className="billingleft flex" style={{ width }}>
            {billDetails?.prescription_image &&
              billDetails.prescription_image[currentImageKey] && (
                <img
                  src={billDetails.prescription_image[currentImageKey]}
                  alt={`Image ${currentIndex}`}
                />
              )}
            <div className="billingimagenumber flex">
              <button onClick={handlePrevious} disabled={currentIndex === 1}>
                <i className="ri-arrow-left-s-line"></i>
              </button>
              <div className="billingimagenumberdata flex">
                {" "}
                {currentIndex}/{imageKeys.length}
              </div>
              <button
                onClick={handleNext}
                disabled={currentIndex === imageKeys.length}
              >
                <i className="ri-arrow-right-s-line"></i>
              </button>
            </div>

            <button className="medmini" onClick={changeWidth}>
              <i className="ri-fullscreen-exit-line"></i>
            </button>
          </div>
        )}

        <div className="billingright">
          <div className="billingrighttop flex">
            <div className="billinginput">
              <h4>Patient Name</h4>
              <input
                type="text"
                name="username"
                value={state?.username || ""}
                placeholder="Enter Patient Name"
                onChange={handleFormChange}
                maxLength={30}
              />
            </div>
            <div className="billinginput">
              <h4>Contact no</h4>
              <input
                type="number"
                name="contact_no"
                value={state?.contact_no || ""}
                placeholder="Enter Contact Number"
              />
            </div>
            <div className="billinginput">
              <h4>Doctor Name</h4>
              <input
                type="text"
                name="doctor_name"
                value={state?.doctor_name || ""}
                placeholder="Enter Doctor Name"
                onChange={handleFormChange}
                maxLength={30}
              />
            </div>
          </div>

          <div className="billingaddress">
            <h4>Address</h4>
            <input
              type="text"
              name="delivery_address"
              value={state?.delivery_address || ""}
              id="delivery_address"
              placeholder="Enter Address"
            />
          </div>

          <div className="billingmed">
            <h4>Medicine Details</h4>

            <table className="billing-table">
              <thead>
                <tr>
                  {headings.map((heading, index) => (
                    <th key={index} style={{ width: getWidth(index) }}>
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {state?.medicine_details.map((medicine, rowIndex) => (
                  <tr key={medicine.id}>
                    <td>
                      {/* //if order type is prescription no need to edit this field so readonly input field */}
                      {state && state.order_type !== "prescription" ? (
                        <input
                          type="text"
                          name="name"
                          title={medicine?.name || ""}
                          value={medicine?.name || ""}
                          className="billing-input"
                          readOnly
                        />
                      ) : (
                        <div
                          className="search-container"
                          style={styles.container}
                        >
                          <input
                            type="text"
                            value={medicine.name || ""}
                            title={medicine?.name || ""}
                            name="name"
                            onChange={(e) => handleInputChange(e, rowIndex)}
                            placeholder="Search..."
                            style={styles.input}
                          />
                          {dropdownIndex === rowIndex &&
                            filteredData.length > 0 && (
                              <div style={styles.dropdown}>
                                {filteredData.map((item, index) => (
                                  <div
                                    key={index}
                                    style={{
                                      ...styles.dropdownItem,
                                      ...(hoveredIndex === index
                                        ? styles.dropdownItemHover
                                        : {}),
                                    }}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    onClick={() =>
                                      handleItemClick(item, rowIndex)
                                    }
                                  >
                                    <h4
                                      style={{ backgroundColor: "transparent" }}
                                    >
                                      {item.name}
                                    </h4>
                                  </div>
                                ))}
                              </div>
                            )}
                        </div>
                      )}
                    </td>
                    <td>
                      <input
                        type="text"
                        style={{ textTransform: "capitalize" }}
                        value={medicine?.product_type || ""}
                        className="billing-input"
                        readOnly
                      />
                    </td>
                    <td>
                      <FormControl
                        fullWidth
                        sx={{ m: 0 }}
                        className="billing-input"
                      >
                        <Select
                          disabled={!medicine.category.includes("MEDICINES")}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 100, // Adjust the dropdown height here
                              },
                            },
                          }}
                          sx={{ height: 42, border: "none" }}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          labelId="demo-simple-select-label"
                          id="demo-simple-selectasas"
                          name="every"
                          value={medicine.every || ""}
                          onChange={(e) => handleProductChange(e, rowIndex)}
                        >
                          <MenuItem value="hours">Hours</MenuItem>
                          <MenuItem value="days">Days</MenuItem>
                          <MenuItem value="weeks">Weeks</MenuItem>
                        </Select>
                      </FormControl>
                    </td>
                    <td>
                      <input
                        disabled={!medicine.category.includes("MEDICINES")}
                        style={{ textAlign: "center" }}
                        type="number"
                        name="interval"
                        value={medicine?.interval || ""}
                        className="billing-input"
                        onChange={(e) => handleProductChange(e, rowIndex)}
                        min={0}
                      />
                    </td>
                    {/* <td>
                      <input
                        type="text"
                        name="batch_no"
                        value={medicine?.batch_no || ""}
                        className="billing-input"
                        onChange={(e) => handleProductChange(e, rowIndex)}
                      />
                    </td> */}
                    <td>
                      <FormControl
                        sx={{ m: 0 }}
                        fullWidth
                        className="billing-input"
                      >
                        <Select
                          disabled={!medicine.category.includes("MEDICINES")}
                          sx={{ height: 42 }}
                          labelId="demo-multiple-checkbox-label"
                          id="demo-multiple-checkboxx"
                          multiple
                          renderValue={(selected) => selected.join(", ")}
                          name="timing"
                          value={medicine?.timing ?? []}
                          onChange={(e) => handleProductChange(e, rowIndex)}
                          input={
                            <OutlinedInput
                              sx={{
                                height: "40px",
                                marginTop: "2px",
                                borderRadius: "6px",
                              }}
                            />
                          }
                          MenuProps={MenuProps}
                        >
                          {["morning", "lunch", "dinner"].map((time) => (
                            <MenuItem key={time} value={time}>
                              <Checkbox
                                checked={
                                  Array.isArray(medicine.timing) &&
                                  medicine.timing.includes(time)
                                }
                              />
                              <ListItemText
                                sx={{ textTransform: "capitalize" }}
                                primary={time}
                              />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </td>
                    <td>
                      <FormControl
                        fullWidth
                        sx={{ m: 0 }}
                        className="billing-input"
                      >
                        <Select
                          disabled={!medicine.category.includes("MEDICINES")}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 100, // Adjust the dropdown height here
                              },
                            },
                          }}
                          sx={{ height: 42, border: "none" }}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          labelId="demo-simple-select-label"
                          id="demo-simple-selectasas"
                          name="afterFd_beforeFd"
                          value={medicine.afterFd_beforeFd}
                          onChange={(e) => handleProductChange(e, rowIndex)}
                        >
                          <MenuItem value="After food">After food</MenuItem>
                          <MenuItem value="Before food">Before food</MenuItem>
                        </Select>
                      </FormControl>
                    </td>
                    <td>
                      <input
                        style={{ textAlign: "center" }}
                        disabled={!medicine.category.includes("MEDICINES")}
                        type="number"
                        name="takingQuantity"
                        value={medicine?.takingQuantity || ""}
                        className="billing-input"
                        onChange={(e) => handleProductChange(e, rowIndex)}
                        max={20}
                        min={1}
                      />
                    </td>
                    <td>
                      <input
                        style={{ textAlign: "center" }}
                        type="number"
                        name="totalQuantity"
                        value={medicine?.totalQuantity || ""}
                        className="billing-input"
                        onChange={(e) =>
                          handleProductChangeQtyOrDiscount(e, rowIndex)
                        }
                        min={1}
                      />
                    </td>
                    <td>
                      <input
                        style={{ textAlign: "right" }}
                        type="text"
                        name="mrp"
                        value={medicine?.mrp}
                        className="billing-input"
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        style={{ textAlign: "center" }}
                        type="number"
                        name="hsn"
                        value={medicine?.hsn || ""}
                        className="billing-input"
                        readOnly
                        min={0}
                      />
                    </td>
                    <td>
                      <input
                        style={{ textAlign: "right" }}
                        type="number"
                        name="selling_price"
                        value={medicine?.selling_price}
                        className="billing-input"
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        style={{ textAlign: "center" }}
                        type="number"
                        name="discount"
                        value={medicine?.discount}
                        className="billing-input"
                        onChange={(e) =>
                          handleProductChangeQtyOrDiscount(e, rowIndex)
                        }
                        max={100}
                        min={0}
                      />
                    </td>
                    <td>
                      <input
                        style={{ textAlign: "right" }}
                        type="number"
                        name="total"
                        value={medicine?.total}
                        className="billing-input"
                        readOnly
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="billingtotalamtcontainer">
            <span>Total amount : {roundedTotalAmount}</span>
          </div>
          <div
            className="billingbutton flex"
            style={{ display: "flex", gap: "15px" }}
          >
            {state && state.order_type === "prescription" && (
              <button
                onClick={() =>
                  dispatch({
                    type: ACTIONS.ADD_NEW_ROW,
                  })
                }
                style={{ height: "40px" }}
              >
                Add new row
              </button>
            )}

            <button
              type="submit"
              disabled={confirmInvoiceMutation.isPending}
              className="billing-confirm-btn"
              onClick={handleSubmit}
            >
              {confirmInvoiceMutation.isPending ? (
                <CircularProgress size="1.5rem" sx={{ color: "white" }} />
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
