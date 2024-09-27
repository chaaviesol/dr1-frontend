import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { BASE_URL } from "../../../config";
import moment from "moment/moment";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
function Orders({ Details, setChangeDashboards }) {
  // const [customerDetails, setcustomerDetails] = useState(Details);
  const [datastate, Setdatastate] = useState(Details);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  console.log({ datastate });
  const navigate = useNavigate();

  const updatebutton = (status) => {
    setIsLoading(true);
    const fetchData = async () => {
      const data = {
        sales_id: datastate?.sales_id,
        status: status,
      };
      try {
        const response = await axios.post(
          `${BASE_URL}/pharmacy/updatesalesorder`,
          data
        );
        console.log("updaaaaaaaaaaaaaaaaaaaaaaaaa", response);
        if (response.status === 200) {
          toast.success(response?.data?.message);
          setIsLoading(false);
          setChangeDashboards({ orders: true });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  };
  return (
    <>
      {/* 
 Orders */}

      <div class="adpha-topcontainer">
        <div class="adpha-left">
          <button
            onClick={() => {
              setChangeDashboards({ orders: true });
            }}
            class="adpha-back-button"
          >
            <i class="ri-arrow-left-line"></i>
          </button>
          <span class="adpha-title">Order Details</span>
        </div>
    
      </div>
      <div class="adpha-seccontainer flex">
        <div className="adpha-seccontainer-datas">
          <h4>Name</h4>
          <h2>{datastate?.users}</h2>
        </div>

        <div className="adpha-seccontainer-datas">
          <h4>Date</h4>
          <h2>{moment(datastate?.created_date).format("DD/MM/YY")}</h2>
        </div>

        <div className="adpha-seccontainer-datas">
          <h4>Phone Number</h4>
          <h2>{datastate?.contact_no}</h2>
        </div>

        <div className="adpha-seccontainer-datas">
          <h4>Status</h4>
          <h2>{datastate?.so_status}</h2>
        </div>
      </div>

      <div class="adpha-orders">
        <h4 style={{ fontWeight: "600" }}>Orders</h4>

        <div class="admin-order-section">
          {datastate?.sales_list?.map((product, index) => (
            <div className="admin-pharmacyshopproduct flex">
              <div className="adminpharmacyshopproductimg flex">
                <img src="../images/webpro.png" alt="" />
                <h4>{product?.generic_prodid?.category}</h4>
              </div>
              <div className="adminpharmacyshopproducttitle flex">
                <h4>{product?.order_qty}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div class="adpha-remarks">
        <h4 style={{ fontWeight: "600" }}>Delivery Address</h4>

        <h4
          style={{ marginTop: "10px" }}
          className="adpha-remarks-para priscriptionpara"
        >
          {datastate?.delivery_address},{datastate?.pincode}
        </h4>
      </div>

      <div class="adpha-right flex" style={{marginTop:"2rem",position:"sticky",top:"0px",width:"100%",justifyContent:"space-between",alignItems:"center"}}>
      {/* <h5>Update status</h5> */}
          <button
            onClick={() => {
              const status =
                datastate?.so_status === "Placed"
                  ? "Out for delivery"
                  : datastate?.so_status === "Out for delivery"
                  ? "Delivered"
                  : "Out for delivery";

              updatebutton(status);
            }}
            class="adpha-save-button"
            disabled={datastate?.so_status === "Delivered"}
          >
            {datastate?.so_status === "Placed"
              ? "Out for delivery"
              : datastate?.so_status === "Out for delivery"
              ? "Delivered"
              : "Completed"}
          </button>
        </div>
    </>
  );
}

export default Orders;
