import React, { useState } from "react";
import "./styles.css";
import axios from "axios";
import { BASE_URL, PHARMACY_URL } from "../../../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

function Prescriptions({ Details, setChangeDashboards }) {
  const [isLoading, setIsLoading] = useState(false);
  const sales_id = Details.sales_id;
  console.log(Details);
  const navigate = useNavigate();
  // const data = [
  //   {
  //     id: "#GGJK1001",
  //     attachment: "mypriscription.jpg",
  //     confirmed: "2024-12-01",
  //     packed: "2024-12-02",
  //     dispatched: "2024-12-03",
  //     delivered: "2024-12-05",
  //   },
  // ];

  const fetchOrderDetails = async (sales_id) => {
    const response = await axios.post(
      `${PHARMACY_URL}/pharmacyquotation/getorderdetails`,
      {
        sales_id,
      }
    );
    console.log(response);
    return response.data.data || [];
  };

  const {
    data: orderDetails,
    isLoading: isFetchingOrderDetailsLoading,
    refetch,
  } = useQuery({
    queryKey: ["fetchOrderDetails"],
    queryFn: async ({ queryKey }) => {
      try {
        const response = await fetchOrderDetails(sales_id);
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

  //fetch pharamcy data

  const fetchPharmacyDetails = async (sales_id) => {
    const response = await axios.post(
      `${PHARMACY_URL}/pharmacyquotation/getorderdetails`,
      {
        sales_id,
      }
    );
    console.log(response);
    return response.data.data || [];
  };

  const {
    data: pharamcyDetails,
    isLoading: isFetchingpharamcyDetailsLoading,
    refetch: refetchPharamcy,
  } = useQuery({
    queryKey: ["pharamcyDetails"],
    queryFn: async ({ queryKey }) => {
      try {
        const response = await fetchPharmacyDetails(sales_id);
        return response || [];
      } catch (error) {
        if (error.response && error.response.status === 404) {
          return [];
        }
        throw error;
      }
    },
    enabled: false,
  });

  const assignPharmacy = async (sales_id) => {
    const response = await axios.post(
      `${PHARMACY_URL}/pharmacyquotation/getorderdetails`,
      {
        sales_id,
      }
    );
    console.log(response);
    return response.data.data || [];
  };

  return (
    <div
      style={{
        position: "relative",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <div class="adpha-topcontainer">
        <div class="adpha-left">
          <button
            onClick={() => {
              setChangeDashboards({ prescriptions: true });
            }}
            class="adpha-back-button"
          >
            <i class="ri-arrow-left-line"></i>
          </button>
          <span class="adpha-title">Prescription Orders</span>
        </div>
      </div>

      <div className="mainorderdetails">
        <div className="toptitlepharmacy flex">
          <h2>Order Details</h2>

          <button
            onClick={() =>
              navigate("/billing", { state: { sales_id: Details.sales_id } })
            }
          >
            Start Shipping
          </button>
        </div>

        <div className="toporderditems maincolorpadding">
          <div className="toporderditemstit flex">
            <h4 className="secondtitleparma">Ordered items</h4>
            <h3 className="statusmain">Order confirmed</h3>
          </div>

          <table className="orderdetails-table">
            <thead className="orderdetails-thead">
              <tr className="orderdetails-row">
                <th className="orderdetails-id-column orderdetails-header">
                  Order ID
                </th>
                <th className="orderdetails-header orderdetails-data-attachment">
                  Attachment
                </th>
                <th className="orderdetails-header">Confirmed Date</th>
                <th className="orderdetails-header">Packed Date</th>
                <th className="orderdetails-header">Transist Date</th>
                <th className="orderdetails-header">Delivered Date</th>
              </tr>
            </thead>
            <tbody className="orderdetails-tbody">
              <tr className="orderdetails-row">
                <td className="orderdetails-id-column orderdetails-data">
                  {orderDetails?.so_number}
                </td>
                <td className="orderdetails-data orderdetails-data-attachment">
                  {orderDetails?.attachment}{" "}
                  <h4 title="View prescription">view</h4>{" "}
                </td>
                <td className="orderdetails-data">
                  {" "}
                  {moment(orderDetails?.created_date).format("DD/MM/YYYY")}
                </td>
                <td className="orderdetails-data">{orderDetails?.packed}</td>
                <td className="orderdetails-data">
                  {orderDetails?.dispatched}
                </td>
                <td className="orderdetails-data">{orderDetails?.delivered}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="ordersecondsec">
          <div className="ordersecondsecleft maincolorpadding">
            <h4 className="secondtitleparma">Customer Details</h4>

            <div className="customerdatas flex">
              <h3>Name:</h3>
              <h3> {orderDetails?.user_name}</h3>
            </div>
            <div className="customerdatas flex">
              <h3>Doctor Name:</h3>
              <h3>{orderDetails?.doctor_name}</h3>
            </div>

            <div className="customerdatas flex">
              <h3>Contact Number:</h3>
              <h3>{orderDetails?.contact_no}</h3>
            </div>

            <div className="customerdataremark">
              <h3>Address</h3>
              <h4 className="customerdataspara">
                {orderDetails?.delivery_address}
              </h4>
            </div>

            <div className="customerdataremark">
              <h3>Remarks</h3>
              <h4 className="customerdataspara">{orderDetails?.remarks}</h4>
            </div>
          </div>

          <div className="ordersecondsecright">
            <div className="assignpharmacy maincolorpadding">
              <h4 className="secondtitleparma">Assign Pharmacy</h4>

              <div className="assignpharmacydata flex">
                <div>
                  <h3>Health Point Medicals Pharmacy</h3>
                  <h4 className="lablo"> Kozhikode, Eranhipaalam , 682028</h4>
                </div>

                <button className="assignbutton">Assign</button>
              </div>

              <div className="assignpharmacydata flex">
                <div>
                  <h3>Health Point Medicals Pharmacy</h3>
                  <h4 className="lablo"> Kozhikode, Eranhipaalam , 682028</h4>
                </div>

                <button className="afterassignbutton assignbutton">
                  Assigned
                </button>
              </div>

              <div className="noassign flex">
                <span>Pharmacy not Assigned</span>
              </div>
            </div>

            <div className="assigndelivery maincolorpadding">
              <h4 className="secondtitleparma">Assign Delivery Agent</h4>

              <div className="deliverymanrec flex">
                <div className="deliverymanrecleft flex">
                  <img src="../images/man.jpg" alt="" />

                  <div>
                    <h3>Manu Madhav</h3>
                    <h4 className="deliverymob">98742 48787</h4>
                  </div>
                </div>

                <button className="assignbutton">Assign</button>
              </div>

              <div className="deliverymanrec flex">
                <div className="deliverymanrecleft flex">
                  <img src="../images/man.jpg" alt="" />

                  <div>
                    <h3>Manu Madhav</h3>
                    <h4 className="deliverymob">98742 48787</h4>
                  </div>
                </div>

                <button className="assignbutton">Assign</button>
              </div>

              <div className="noassign flex">
                <span>Delivery not Assigned</span>
              </div>
            </div>
          </div>
        </div>

        <div className="billeditems maincolorpadding">
          {orderDetails?.sales_invoice?.length > 0 ? (
            <>
              <h4 className="secondtitleparma">Billed items</h4>

              <table className="billeddetails-table">
                <thead className="billeddetails-table-head">
                  <tr>
                    <th>Medicine Name</th>
                    <th>Frequency</th>
                    <th>BF/AF</th>
                    <th>QTY</th>
                    <th>Dose</th>
                    <th>hsn</th>
                    <th>MRP</th>
                    <th>Discount (%)</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody className="billeddetails-table-body">
                  {orderDetails?.sales_invoice?.map((med, index) => (
                    <tr key={index}>
                      <td>{med?.medicine[0].name}</td>
                      <td>{med?.afterFd_beforeFd}</td>
                      <td>
                        {" "}
                        {med.timing.length > 0 &&
                          med.timing.map((entry, index) => (
                            <div
                              key={index}
                              style={{
                                display: "inline-block",
                                marginRight: "10px",
                              }}
                            >
                              {Object.values(entry).map(
                                (value, subIndex, array) => (
                                  <span key={subIndex}>
                                    {value}
                                    {subIndex !== array.length - 1 && ", "}
                                  </span>
                                )
                              )}
                            </div>
                          ))}
                      </td>
                      <td>{med?.totalQuantity}</td>
                      <td>{med?.takingQuantity}</td>
                      <td>{med?.medicine[0].details?.generic_prodid?.hsn}</td>
                      <td>{med?.medicine[0].details?.generic_prodid?.mrp}</td>
                      <td>{med?.discount}</td>
                      <td>{med?.medicine[0].details?.selling_price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <div className="noassign flex">
              <span>Not billed yet</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Prescriptions;
