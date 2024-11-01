import React from "react";
import styles from "./myordermobilestyles.module.css";
import BackButtonWithTitle from "../../../components/BackButtonWithTitle";
import { useNavigate } from "react-router-dom";

function MyOrdersMobile() {

  const navigate=useNavigate();
  const handleTrackOrder=()=>{
    navigate("/trackorder")
  }
  return (
    <div>
      <div className={styles.container}>
        <BackButtonWithTitle title="My orders" />
      </div>
      <div className={styles.orderlist}>
        <div className={styles.divider}></div>
        <div className={styles.container}>
          <div className={styles.order}>
            <div className={styles.ordercardtop}>
              <div className={styles.orderdetailes}>
                <span>Order #758748548</span>
                <span>Expected on Thu 22 Aug</span>
              </div>

              <button className={styles.trackbtn} onClick={handleTrackOrder}>Track order</button>
            </div>
            <div className={styles.productsection}>
              <div className={styles.product}>
                <div className={styles.productimgcontainer}>
                  <img src="" alt="" />
                </div>
                <div className={styles.productname}>
                  Hair Fall Rescue <br /> Shampoo
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.divider}></div>
      </div>
    </div>
  );
}

export default MyOrdersMobile;
