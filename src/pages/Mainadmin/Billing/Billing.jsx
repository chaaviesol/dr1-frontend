import React, { useEffect, useReducer, useRef, useState } from "react";
import "./billingStyles.css";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { BASE_URL } from "../../../config";
import { Loader } from "../../../components/Loader/Loader";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { billingReducer, INITIAL_STATE, ACTIONS } from "./billingReducer";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

export default function Billing() {
  const [state, dispatch] = useReducer(billingReducer, INITIAL_STATE);
  const [width, setWidth] = useState("50%"); // Initial width state
  const [products, setProducts] = useState([]);

  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const previousSalesId = useRef(null);

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
    const response = await axios.post(`${BASE_URL}/pharmacy/getinvsalesorder`, {
      sales_id,
    });
    console.log(response);
    return response.data.data || [];
  };

  const {
    data: billDetails,
    isLoading: isFetchingBillDetailsLoading,
    refetch,
  } = useQuery({
    queryKey: ["FetchBillDetails", 1],
    queryFn: async ({ queryKey }) => {
      try {
        //113 153
        const response = await fetchBillDetails(153);
        return response || [];
      } catch (error) {
        if (error.response && error.response.status === 404) {
          return [];
        }
        throw error;
      }
    },
    enabled: true,
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
  console.log(state);

  const changeWidth = () => {
    setWidth((prevWidth) => (prevWidth === "50%" ? "150px" : "50%"));
  };

  const headings = [
    "Medicine Name",
    "Batch Number",
    "Frequency",
    "BF/AF",
    "Dose",
    "Qty",
    "HSN",
    "MRP",
    "Price",
  ]; // Custom column names

  const getWidth = (index) => {
    const widths = [
      "20%",
      "15%",
      "10%",
      "10%",
      "10%",
      "6%",
      "10%",
      "10%",
      "15%",
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
  const handleProductChange = (event, id) => {
    const { value } = event.target;
    const field = event.target.name;

    dispatch({
      type: field === "timing" ? ACTIONS.SELECT_TIMING : ACTIONS.UPDATE_PRODUCT,
      payload: { field, value, id },
    });
  };

  //submit
  const confirmInvoice = async () => {
    const total_amount = state.medicine_details.reduce(
      (acc, currItem) => acc + currItem.selling_price * currItem.totalQuantity,
      0 // Initial value of the accumulator
    );
    const endPoint =
      state.order_type === "prescription"
        ? "prescriptioninvoice"
        : "createinvoice";
    console.log(endPoint);
    const response = await axiosPrivate.post(
      `${BASE_URL}/pharmacy/${endPoint}`,
      {
        ...state,
        sold_by: "Pharamcy 1",
        total_amount
      }
    );
    return response.data;
  };

  const confirmInvoiceMutation = useMutation({
    mutationKey: ["confirmInvoice"],
    mutationFn: () => confirmInvoice(),
    onSuccess: (data) => {
      console.log({ data });
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
      const response = await axios.get(`${BASE_URL}/pharmacy/getproducts`);
      console.log(response);
      setProducts(response.data.data);
    } catch (err) {}
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
      display: showDropdown ? "block" : "none",
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

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    if (value) {
      const filtered = products.filter((item) =>
        item.name.toLowerCase().includes(value)
      );

      setFilteredData(filtered);
      setShowDropdown(true);
    } else {
      setFilteredData([]);
      setShowDropdown(false);
    }
  };

  const handleItemClick = (item, rowIndex) => {
    setQuery(item.name);
    console.log("handleItemClick triggered", item, rowIndex); // Debug
    setShowDropdown(false);
    console.log(item);
    dispatch({
      type: ACTIONS.CLICK_A_PRODUCT,
      payload: { item, rowIndex },
    });
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest(".search-container")) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  console.log("filteredData", filteredData);

  return (
    <div className="billing-container">
      <h1>Dr1 Billing</h1>

      <div className="billingsection flex">
        {isFetchingBillDetailsLoading && <Loader />}
        {state && state.order_type === "prescription" && (
          <div className="billingleft flex" style={{ width }}>
            <img
              src="https://www.rbcinsurance.com/group-benefits/_assets-custom/images/prescription-drug-sample-receipt-en.jpg"
              alt=""
            />
            <div className="billingimagenumber flex">
              <button>
                <i className="ri-arrow-left-s-line"></i>
              </button>
              <div className="billingimagenumberdata flex">1/2</div>
              <button>
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
                name="user_name"
                value={state?.user_name || ""}
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
                      {state && state.order_type !== "prescription" ? (
                        <input
                          type="text"
                          name="name"
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
                            value={query || ""}
                            onChange={handleInputChange}
                            placeholder="Search..."
                            style={styles.input}
                          />
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
                                onClick={() => handleItemClick(item, rowIndex)}
                              >
                                <h4 style={{ backgroundColor: "transparent" }}>
                                  {item.name}
                                </h4>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </td>
                    <td>
                      <input
                        type="text"
                        name="batch_no"
                        value={medicine?.batch_no || ""}
                        className="billing-input"
                        onChange={(e) => handleProductChange(e, medicine.id)}
                      />
                    </td>
                    <td>
                      <FormControl
                        sx={{ width: 200, m: 0 }}
                        fullWidth
                        className="billing-input"
                      >
                        <Select
                          sx={{ height: 42 }}
                          labelId="demo-multiple-checkbox-label"
                          id="demo-multiple-checkboxx"
                          multiple
                          renderValue={(selected) => selected.join(", ")}
                          name="timing"
                          value={medicine?.timing ?? []}
                          onChange={(e) => handleProductChange(e, medicine.id)}
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
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 100, // Adjust the dropdown height here
                              },
                            },
                          }}
                          sx={{ height: 42, width: "100%", border: "none" }}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          labelId="demo-simple-select-label"
                          id="demo-simple-selectasas"
                          name="afterFd_beforeFd"
                          value={medicine.afterFd_beforeFd}
                          onChange={(e) => handleProductChange(e, medicine.id)}
                        >
                          <MenuItem value="After food">After food</MenuItem>
                          <MenuItem value="Before food">Before food</MenuItem>
                        </Select>
                      </FormControl>
                    </td>
                    <td>
                      <input
                        type="number"
                        name="takingQuantity"
                        value={medicine?.takingQuantity || ""}
                        className="billing-input"
                        onChange={(e) => handleProductChange(e, medicine.id)}
                        max={20}
                        min={1}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="totalQuantity"
                        value={medicine?.totalQuantity || ""}
                        className="billing-input"
                        onChange={(e) => handleProductChange(e, medicine.id)}
                        min={0}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="hsn"
                        value={medicine?.hsn || ""}
                        className="billing-input"
                        onChange={(e) => handleProductChange(e, medicine.id)}
                        min={0}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="mrp"
                        value={medicine?.mrp || ""}
                        className="billing-input"
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="selling_price"
                        value={medicine?.selling_price || ""}
                        className="billing-input"
                        onChange={(e) => handleProductChange(e, medicine.id)}
                        min={0}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            className="billingbutton flex"
            style={{ display: "flex", gap: "15px" }}
          >
            <button
              onClick={() =>
                dispatch({
                  type: ACTIONS.ADD_NEW_ROW,
                })
              }
            >
              Add new row
            </button>
            <button
              type="submit"
              disabled={confirmInvoiceMutation.isPending}
              style={{ backgroundColor: "Green" }}
              onClick={handleSubmit}
            >
              Confirm
            </button>
            <button>Print Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
