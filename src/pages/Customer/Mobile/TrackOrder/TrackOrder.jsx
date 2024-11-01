import React, { useState } from "react";
import styles from "./styles.module.css";
import BackButtonWithTitle from "../../../../components/BackButtonWithTitle";

function TrackOrder() {
  const [s] = useState([1, 2, 3, 4, 5]);
  const data = {
    so_status: "Delivered",
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
          <span className={styles.orderid}>Order #758748548</span>
          <div className={styles.tracks}>
            <div className={styles.listcardprogress}>
              {s.map((progress) => (
                <div className={styles.progresscard}>
                  <div
                    style={{ display: "flex", flexDirection: "column" }}
                    className={` ${
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
                      <i className="ri-check-line "></i>
                    ) : null}
                    {progress !== 5 && (
                      <div
                        className={`${
                          data.so_status === "Placed" ||
                          data.so_status === "Out for delivery" ||
                          data.so_status === "Delivered"
                            ? styles.progressfilled
                            : styles.progressnotfilled
                        }`}
                      ></div>
                    )}
                  </div>

                  <div className={styles.progresscarddate}>
                    <h2>Order Confirmed</h2>
                    <h4>{formatDate(data.created_date)}</h4>
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
        <div className={styles.product}>
          <div className={styles.productimgcontainer}>
            <img src="" alt="" />
          </div>
          <div className={styles.productname}>
            Hair Fall Rescue <br /> Shampoo
          </div>
        </div>
      </div>
      <div className="mobilescreen-container">
        <div className={styles.pricingsection}>
          <div className={styles.listprice}>
            <span>List price </span> <span>3000</span>
          </div>
          <div className={styles.listprice}>
            <span>List price </span> <span>3000</span>
          </div>
          <div className={styles.listprice}>
            <span>List price </span> <span>3000</span>
          </div>
          <div className={styles.pricingdivider}></div>
          <div className={styles.totalprice}>
            <span>Total amount </span> <span>3000</span>
          </div>
        </div>

        <div className={styles.address}>
          <span style={{ marginBottom: "10px" }}>
            Address <br />
          </span>
          Nadakkavu, Kottaram Cross Road
        </div>
      </div>
    </div>
  );
}

export default TrackOrder;
