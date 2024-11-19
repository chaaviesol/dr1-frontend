import React, { useEffect, useReducer, useRef, useState } from "react";
import "./billingStyles.css";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { BASE_URL } from "../../../config";
import { Loader } from '../../../components/Loader/Loader';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { billingReducer, INITIAL_STATE, ACTIONS } from "./billingReducer";

export default function Billing() {

  const [state, dispatch] = useReducer(billingReducer, INITIAL_STATE);
  const [width, setWidth] = useState("50%"); // Initial width state
  const axiosPrivate = useAxiosPrivate();
  const previousSalesId = useRef(null);
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
        const response = await fetchBillDetails(113);
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
      type: ACTIONS.UPDATE_PRODUCT,
      payload: { field, value, id },
    });
  };

  return (
    <div className="billing-container">
      <h1>Dr1 Billing</h1>

      <div className="billingsection flex">
        {isFetchingBillDetailsLoading&&
        
        <Loader/>
        }
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

        <div className="billingright">
          <div className="billingrighttop flex">
            <div className="billinginput">
              <h4>Patient Name</h4>
              <input
                type="text"
                name="user_name"
                value={state?.user_name || ''}
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
                value={state?.contact_no || ''}
                placeholder="Enter Contact Number"
              />
            </div>
            <div className="billinginput">
              <h4>Doctor Name</h4>
              <input
                type="text"
                name="doctor_name"
                value={state?.doctor_name ||''}
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
              value={state?.delivery_address || ''}
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
                      <input
                        type="text"
                        name="name"
                        value={medicine?.name ||''}
                        className="billing-input"
                        readOnly
                        // onChange={(e) => handleProductChange(e, medicine.id)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="batch_no"
                        value={medicine?.batch_no ||''}
                        className="billing-input"
                        onChange={(e) => handleProductChange(e, medicine.id)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="timing"
                        value={medicine?.timing || ''}
                        className="billing-input"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="afterFd_beforeFd"
                        value={medicine?.afterFd_beforeFd ||''}
                        className="billing-input"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="takingQuantity"
                        value={medicine?.takingQuantity ||''}
                        className="billing-input"
                        onChange={(e) => handleProductChange(e, medicine.id)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="totalQuantity"
                        value={medicine?.totalQuantity ||''}
                        className="billing-input"
                        onChange={(e) => handleProductChange(e, medicine.id)}
                        min={0}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="hsn"
                        value={medicine?.hsn ||''}
                        className="billing-input"
                        onChange={(e) => handleProductChange(e, medicine.id)}
                        min={0}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="mrp"
                        value={medicine?.mrp ||''}
                        className="billing-input"
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="selling_price"
                        value={medicine?.selling_price ||''}
                        className="billing-input"
                        readOnly
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
            <button>Print Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
