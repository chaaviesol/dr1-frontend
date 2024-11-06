import React, { useState } from "react";
import styles from "./styles.module.css";
import BackButtonWithTitle from "../../../../components/BackButtonWithTitle";
import { useLocation } from "react-router-dom";

function TrackOrder() {
  const [progressSteps] = useState([
    "Confirmed",
    "Packed",
    "In Transist",
    "Delivered",
  ]);
  const location = useLocation();
  const order = location.state;
  console.log(order);
  const isStepComplete = (step) => {
    const statuses = ["Placed", "Out for delivery", "Delivered"];
    return (
      statuses.includes(order.so_status) &&
      step <= statuses.indexOf(order.so_status) + 1
    );
  };

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
      <div className="mobilescreen-container">
        <BackButtonWithTitle title="Track order" />
      </div>
      <div className={styles.divider}></div>

      <div className="mobilescreen-container">
        <div className={styles.order}>
          <span className={styles.orderid}>Order #{order.so_number}</span>
          <div className={styles.tracks}>
            <div className={styles.listcardprogress}>
              {progressSteps.map((progress, index) => (
                <div key={progress} className={styles.progresscard}>
                  <div
                    style={{ display: "flex", flexDirection: "column" }}
                    className={` ${
                      isStepComplete(index + 1)
                        ? "progresscardmark"
                        : "progresscardmarknotfilled"
                    }`}
                  >
                    {isStepComplete(index + 1) ? (
                      <i className="ri-check-line "></i>
                    ) : null}
                    {index + 1 !== 4 && (
                      <div
                        className={`${
                          isStepComplete(progress)
                            ? styles.progressfilled
                            : styles.progressnotfilled
                        }`}
                      ></div>
                    )}
                  </div>

                  <div className={styles.progresscarddate}>
                    <h2> Order is {progress}</h2>
                    <h4>{formatDate(order.created_date)}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.divider}></div>
      <div className={`${styles.productsection} mobilescreen-container`}>
        <span>Order details</span>
        <div>

        {order.sales_list &&
          order.sales_list.length > 0 &&
          order.sales_list.map((product, productIndex) => (
            <div className={styles.product} key={productIndex}>
              <div className={styles.productimgcontainer}>
                <img src={product?.generic_prodid?.images?.image1} alt="" />
              </div>
              <div className={styles.productname}>
                {product?.generic_prodid?.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mobilescreen-container">
        <div className={styles.pricingsection}>
          <div className={styles.listprice}>
            <span>List price </span> <span>3000</span>
          </div>
          <div className={styles.listprice}>
            <span>Selling price </span> <span>3000</span>
          </div>
          <div className={styles.listprice}>
            <span>Delivery charge </span> <span>60</span>
          </div>
          <div className={styles.pricingdivider}></div>
          <div className={styles.totalprice}>
            <span>Total amount </span> <span>{order?.total_amount}</span>
          </div>
        </div>

        <div className={styles.address}>
          <span>Address</span>
          <span>{order?.delivery_address}</span>
        </div>
      </div>
    </div>
  );
}

export default TrackOrder;
