import React, { useRef, useState, useEffect, Fragment } from "react";
import styles from "./myordermobilestyles.module.css";
import BackButtonWithTitle from "../../../components/BackButtonWithTitle";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../components/Loader/Loader";
import { BASE_URL, PHARMACY_URL } from "../../../config";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

function MyOrdersMobile() {
  const [myOrder, setMyOrder] = useState([]);
  const scrollRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isExpanded, setIsExpanded] = useState(null);
  const [isOrdersLoading, setIsOrdersLoading] = useState(false);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
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

  useEffect(() => {
    setIsOrdersLoading(true);
    const fetchOrders = async () => {
      try {
        const response = await axiosPrivate.get(
          `${PHARMACY_URL}/pharmacy/myorders`
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
  const handleTrackOrder = (order) => {
    navigate("/trackorder", { state: order});
  };
  return (
    <div>
      <div className={styles.container}>
        <BackButtonWithTitle title="My orders" />
      </div>
      <div className={styles.orderlist}>
        <div>
          {isOrdersLoading && <Loader />}
          {myOrder &&
            myOrder.map((data, index) => (
              <Fragment key={index}>
                <div className={styles.divider}></div>
                <div className={`${styles.order} ${styles.container}`}>
                  <div className={styles.ordercardtop}>
                    <div className={styles.orderdetailes}>
                      <span>Order # {data?.so_number}</span>
                      <span>Expected on Thu 22 Aug</span>
                    </div>

                    <button
                      className={styles.trackbtn}
                      onClick={() => handleTrackOrder(data)}
                    >
                      Track order
                    </button>
                  </div>
                  <div className={styles.productsection}>
                    {data.sales_list &&
                      data.sales_list.length > 0 &&
                      data.sales_list.map((products, productIndex) => (
                        <div key={productIndex} className={styles.product}>
                          <div className={styles.productimgcontainer}>
                            <img
                              src={products?.generic_prodid?.images?.image1}
                              alt=""
                            />
                          </div>
                          <div className={styles.productname}>
                            {products?.generic_prodid?.name}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </Fragment>
            ))}
        </div>
        <div className={styles.divider}></div>
      </div>
    </div>
  );
}

export default MyOrdersMobile;
