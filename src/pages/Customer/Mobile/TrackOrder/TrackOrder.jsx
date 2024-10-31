import React from "react";
import styles from "./styles.module.css";
import BackButtonWithTitle from "../../../../components/BackButtonWithTitle";

function TrackOrder() {
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
            <div className="listcardprogress">
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
        </div>
      </div>
    </div>
  );
}

export default TrackOrder;
