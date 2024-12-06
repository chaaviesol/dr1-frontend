import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { BASE_URL, PHARMACY_URL } from "../../../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import { Loader } from "../../../components/Loader/Loader";
import { Modal } from "@mui/material";

function Prescriptions({ Details, setChangeDashboards }) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isShowImgModal, setIsShowImgModal] = useState(false);

  const sales_id = Details.sales_id;
  const [width, setWidth] = useState("100%");
  const navigate = useNavigate();

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
      `${PHARMACY_URL}/pharmacyquotation/getpharmacies`,
      {
        sales_id,
      }
    );
    console.log(response);
    return response.data || [];
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
    enabled: !!sales_id,
  });

  const handleAssignPharamcy = async (sales_id, pharmacy_id, status) => {
    console.log(sales_id, pharmacy_id, status);
    try {
      const response = await axios.post(
        `${PHARMACY_URL}/pharmacyquotation/assignpharmacy`,
        {
          sales_id,
          pharmacy_id,
          status,
        }
      );
      console.log(response);
      refetchPharamcy();
    } catch (error) {
      console.error("Error assigning pharmacy:", error);
    } finally {
    }
  };

  // const { mutateAsync: assignPharamcyMutation } = useMutation({
  //   mutationKey: ["assignPharmacy"],
  //   mutationFn: (sales_id, pharmacy_id, status) =>
  //     assignPharmacy(sales_id, pharmacy_id, status),
  //   onSuccess: () => {
  //     refetchPharamcy(); // Refetch after success
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //     toast.error(error.message || "Something went wrong");
  //   },
  // });

  const goBack = (order_type) => {
    if (order_type === "salesorder") {
      setChangeDashboards({ orders: true });
    } else if (order_type === "prescription") {
      setChangeDashboards({ prescriptions: true });
    }
  };

  useEffect(() => {
    if (sales_id) {
      refetch();
      refetchPharamcy();
    }
  }, [sales_id, refetch, refetchPharamcy]);

  //image

  const imageKeys = Object.keys(orderDetails?.prescription_image || {});

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
    <div
      style={{
        position: "relative",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      {(isFetchingpharamcyDetailsLoading || isFetchingOrderDetailsLoading) && (
        <Loader />
      )}
      <div className="adpha-topcontainer">
        <div className="adpha-left">
          <button
            onClick={() => goBack(orderDetails.order_type)}
            className="adpha-back-button"
          >
            <i className="ri-arrow-left-line"></i>
          </button>
          <span className="adpha-title">
            {orderDetails &&
              orderDetails.order_type === "salesorder" &&
              "Sales order list"}
            {orderDetails?.order_type === "prescription" &&
              "Prescription order list"}
          </span>
        </div>
      </div>

      <div className="mainorderdetails">
        <div className="toptitlepharmacy flex">
          <h2>Order Details</h2>

          <button
            onClick={() =>
              navigate("/billing", { state: { sales_id: Details.sales_id } })
            }
            disabled={orderDetails?.so_status !== "Placed"}
          >
            Start Shipping
          </button>
        </div>

        <div className="toporderditems maincolorpadding">
          <div className="toporderditemstit flex">
            <h4 className="secondtitleparma">Ordered items</h4>
            <h3 className="statusmain">{orderDetails?.so_status}</h3>
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
                <th className="orderdetails-header">Shipping Date</th>
                <th className="orderdetails-header">Delivered Date</th>
              </tr>
            </thead>
            <tbody className="orderdetails-tbody">
              <tr className="orderdetails-row">
                <td className="orderdetails-id-column orderdetails-data">
                  {orderDetails?.so_number}
                </td>
                <td className="orderdetails-data orderdetails-data-attachment">
                  {orderDetails?.order_type === "prescription" && (
                    <button
                      disabled={orderDetails?.order_type !== "prescription"}
                      onClick={() => setIsShowImgModal(true)}
                      style={{
                        border: "1px solid blue",
                        borderRadius: "20px",
                        padding: "5px 16px",
                        backgroundColor: "white",
                      }}
                    >
                      View Files
                    </button>
                  )}
                </td>
                <td className="orderdetails-data">
                  {" "}
                  {moment(orderDetails?.created_date).format("DD/MM/YYYY")}
                </td>
                <td className="orderdetails-data">
                  {orderDetails?.packedDate !== "" &&
                    moment(orderDetails?.packedDate).format("DD/MM/YYYY")}
                </td>
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

              {orderDetails?.so_status !== "Placed" &&
                pharamcyDetails &&
                pharamcyDetails?.data &&
                pharamcyDetails?.data.length > 0 &&
                pharamcyDetails?.data.map((pharmacy) => (
                  <div
                    key={pharmacy?.pharm_id?.id}
                    className="assignpharmacydata flex"
                  >
                    <div>
                      <h3>{pharmacy?.pharm_id?.name}</h3>
                      <h4 className="lablo">
                        {pharmacy?.pharm_id?.address[0]?.address},{" "}
                        {pharmacy?.pharm_id?.pincode}
                      </h4>
                    </div>

                    {pharamcyDetails?.data?.length === 1 ? (
                      <button className="afterassignbutton assignbutton">
                        Assigned
                      </button>
                    ) : (
                      <button
                        className="assignbutton"
                        onClick={() =>
                          handleAssignPharamcy(
                            sales_id,
                            pharmacy?.pharm_id?.id,
                            "requested"
                          )
                        }
                      >
                        Assign
                      </button>
                    )}
                  </div>
                ))}

              {orderDetails?.so_status === "Placed" && (
                <div className="noassign flex">
                  <span>Pharmacy not Assigned</span>
                </div>
              )}
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
          {orderDetails?.so_status !== "Placed" &&
          orderDetails?.products &&
          orderDetails?.products?.length > 0 ? (
            <>
              <h4 className="secondtitleparma">Billed items</h4>

              <table className="billeddetails-table">
                <thead className="billeddetails-table-head">
                  <tr>
                    <th>Product Name</th>
                    <th>BF/AF</th>
                    <th>Frequency</th>
                    <th>QTY</th>
                    <th>Dose</th>
                    <th>No Of Days</th>
                    <th>hsn</th>
                    <th>MRP</th>
                    <th>Discount (%)</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody className="billeddetails-table-body">
                  {orderDetails?.products?.map((med, index) => (
                    <tr key={med.product_id}>
                      <td>{med?.generic_prodid?.name}</td>
                      <td>
                        {
                          med?.generic_prodid?.medicine_timetable
                            ?.afterFd_beforeFd
                        }
                      </td>
                      <td>
                        {" "}
                        {med?.generic_prodid?.medicine_timetable?.timing
                          ?.length > 0 &&
                          med?.generic_prodid?.medicine_timetable?.timing?.map(
                            (entry, index) => (
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
                            )
                          )}
                      </td>
                      <td>{med?.order_qty}</td>
                      <td>
                        {
                          med?.generic_prodid?.medicine_timetable
                            ?.takingQuantity
                        }
                      </td>
                      <td>
                        {" "}
                        {med?.generic_prodid?.medicine_timetable?.no_of_days}
                      </td>
                      <td>{med?.generic_prodid?.hsn}</td>
                      <td>{med?.generic_prodid?.mrp}</td>
                      <td>{med?.discount}</td>
                      <td>{med?.selling_price}</td>
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

      <Modal
        open={isShowImgModal}
        onClose={() => {
          setIsShowImgModal(false);
          // setSelectedSpecs([])
        }}
      >
        <div className="modalContainerbilling">
          {orderDetails && orderDetails.order_type === "prescription" && (
            <div className="billingleft flex" style={{ width }}>
              {orderDetails?.prescription_image[currentImageKey] && (
                <img
                  src={orderDetails?.prescription_image[currentImageKey]}
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

              <button className="medmini">
                <i className="ri-fullscreen-exit-line"></i>
              </button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default Prescriptions;
