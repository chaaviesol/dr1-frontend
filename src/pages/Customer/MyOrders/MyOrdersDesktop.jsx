import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../../components/Navbar";
import Headroom from "react-headroom";
import "./myorders.css";
import Footer from "../../../components/Footer";
import { axiosPrivate } from "../../../api/PrivateAxios/axios";
import { BASE_URL } from "../../../config";
import { Loader } from "../../../components/Loader/Loader";

function MyOrdersDesktop() {
  const [myOrder, setMyOrder] = useState([]);
  const scrollRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isExpanded, setIsExpanded] = useState(null);
  const [isOrdersLoading, setIsOrdersLoading] = useState(false);
  console.log({ myOrder });
  const handleMouseDown = (e) => {
    setIsDown(true);
    const element = scrollRef.current;
    setStartX(e.pageX - element.offsetLeft);
    setScrollLeft(element.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const element = scrollRef.current;
    const x = e.pageX - element.offsetLeft;
    const walk = (x - startX) * 2;
    element.scrollLeft = scrollLeft - walk;
  };

  //   const toggleDropdown = () => {
  //     setIsExpanded(!isExpanded);
  //   };
  useEffect(() => {
    setIsOrdersLoading(true);
    const fetchOrders = async () => {
      try {
        const response = await axiosPrivate.get(
          `${BASE_URL}/pharmacy/myorders`
        );
        setMyOrder(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsOrdersLoading(false);
      }
    };

    fetchOrders();
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const weekday = weekdays[date.getUTCDay()];
    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];

    return `${weekday} ${day} ${month}`;
  };

  return (
    <div>
      {/* <OrderProgress /> */}
      {/* <Headroom> */}
      <Navbar />
      {/* </Headroom> */}
      {isOrdersLoading && <Loader />}
      <div style={{ backgroundColor: "#f8f9fe", minHeight: "80vh" }}>
        <div className="container">
          <div className="orderlisttitle">
            <h2>My Orders</h2>
          </div>
          {myOrder &&
            myOrder.map((data, index) => (
              <div className="oderlistcard">
                <div className="oderlistcardtop flex">
                  <div className="oderlistcardleft">
                    <h4>ORDER ID #{data.so_number}</h4>

                    {data?.total_amount && <h3>₹ {data.total_amount}</h3>}
                    <button
                      onClick={() =>
                        setIsExpanded(isExpanded === index ? null : index)
                      }
                    >
                      {isExpanded === index ? (
                        <>
                          Less Details{" "}
                          <i className="ri-arrow-down-s-line arrow-icon2"></i>
                        </>
                      ) : (
                        <>
                          More Details{" "}
                          <i className="ri-arrow-right-s-line arrow-icon2"></i>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="listcardprogress flex">
                    <div className="progresscard flex">
                      <div
                        // className="progresscardmark isFullfilled flex"

                        className={`flex ${
                          data.so_status === "Placed" ||
                          data.so_status === "Out for delivery" ||
                          data.so_status === "Delivered"
                            ? "progresscardmark"
                            : "progresscardmarknotfilled"
                        }`}
                      >
                        {data.so_status === "Placed" ||
                        data.so_status === "Out for delivery" ||
                        data.so_status === "Delivered" ? (
                          <i className="ri-check-line"></i>
                        ) : null}
                        <div
                          // className="progresscardmarkline"
                          className={`${
                            data.so_status === "Placed" ||
                            data.so_status === "Out for delivery" ||
                            data.so_status === "Delivered"
                              ? "progresscardmarkline"
                              : "progresscardmarklinenotfilled"
                          }`}
                        ></div>
                      </div>

                      <div className="progresscarddate">
                        <h2>Order Confirmed</h2>
                        <h4>{formatDate(data.created_date)}</h4>
                      </div>
                    </div>

                    <div className="progresscard flex">
                      <div
                        className={`flex ${
                          data.so_status === "Out for delivery" ||
                          data.so_status === "Delivered"
                            ? "progresscardmark"
                            : "progresscardmarknotfilled"
                        }`}
                      >
                        <i className="ri-check-line"></i>

                        <div
                          className={`${
                            data.so_status === "Out for delivery" ||
                            data.so_status === "Delivered"
                              ? "progresscardmarkline"
                              : "progresscardmarklinenotfilled"
                          }`}
                        ></div>
                      </div>

                      <div className="progresscarddate">
                        <h2>Order Packed</h2>
                        <h4>
                          {data.so_status === "Out for delivery" ||
                          data.so_status === "Delivered"
                            ? formatDate(data.updated_date)
                            : "Processing"}
                        </h4>
                      </div>
                    </div>

                    <div className="progresscard flex">
                      <div
                        className={`flex ${
                          data.so_status === "Out for delivery" ||
                          data.so_status === "Delivered"
                            ? "progresscardmark"
                            : "progresscardmarknotfilled"
                        }`}
                      >
                        <i class="ri-check-line"></i>
                        <div
                          className={`${
                            data.so_status === "Out for delivery" ||
                            data.so_status === "Delivered"
                              ? "progresscardmarkline"
                              : "progresscardmarklinenotfilled"
                          }`}
                        ></div>
                      </div>

                      <div className="progresscarddate">
                        <h2>In Transit</h2>
                        <h4>
                          {data.so_status === "Out for delivery" ||
                          data.so_status === "Delivered"
                            ? formatDate(data.updated_date)
                            : "Processing"}
                        </h4>
                      </div>
                    </div>

                    <div className="progresscard flex">
                      <div
                        className={`flex ${
                          data.so_status === "Delivered"
                            ? "progresscardmark"
                            : "progresscardmarknotfilled"
                        }`}
                      >
                        <i class="ri-check-line"></i>
                      </div>

                      <div className="progresscarddate">
                        <h2>Delivered</h2>
                        <h4>
                          {data.so_status === "Delivered"
                            ? formatDate(data.updated_date)
                            : "Processing"}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`orderlistmore ${
                    isExpanded === index ? "expanded2" : ""
                  }`}
                >
                  {isExpanded === index &&
                    data.sales_list.map((products, productIndex) => (
                      <div
                        className="productdetialsorder flex"
                        ref={scrollRef}
                        key={products.generic_prodid.id}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                      >
                        <div className="orderproductcard flex">
                          <div className="orderproductcardimg">
                            <img
                              src={products?.generic_prodid?.images?.image1}
                              alt=""
                            />
                          </div>

                          <div className="orderproductcarddata">
                            <h5>{products?.generic_prodid?.name}</h5>
                            <h4>₹ {products?.generic_prodid?.mrp}</h4>
                          </div>
                        </div>

                        {/* <div className="orderproductcard "></div> */}
                      </div>
                    ))}
                </div>
                {isExpanded === index && (
                  <div className="orderaddress_price flex">
                    <div className="orderaddress">
                      <h3>Address</h3>
                      <h4>
                        {data?.delivery_address}
                        {data?.pinocode}, Phone Number{data?.contact_no}
                      </h4>
                    </div>
                    {data?.total_amount && (
                      <div className="orderprice">
                        <div className="orderpriceitem flex">
                          <h4>List Price :</h4>
                          <h4>₹ 2000</h4>
                        </div>
                        <div className="orderpriceitem flex">
                          <h4>Selling Price :</h4>
                          <h4>₹ 1900</h4>
                        </div>
                        <div className="orderpriceitem flex">
                          <h4>Delivery Charge :</h4>
                          <h4>₹ 50</h4>
                        </div>
                        <div className="orderpriceitemtotal flex">
                          <h4>Total Price :</h4>
                          <h4>₹ {data?.total_amount}</h4>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyOrdersDesktop;
