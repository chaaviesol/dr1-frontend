import React, { useState } from "react";
import "./styles.css";
import axios from "axios";
import { BASE_URL } from "../../../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Prescriptions({ Details, setChangeDashboards }) {
  const [isLoading, setIsLoading] = useState(false);

  
  const navigate = useNavigate();
  const data = [
    {
      id: "#GGJK1001",
      attachment: "mypriscription.jpg",
      confirmed: "2024-12-01",
      packed: "2024-12-02",
      dispatched: "2024-12-03",
      delivered: "2024-12-05",
    },
  ];

  const medicines = [
    {
      name: "Paracetamol",
      frequency: "2x daily",
      time: "BF",
      qty: 10,
      dose: "500mg",
      hsn: "3004",
      mrp: 50,
      discount: 5,
      price: 45,
    },
    {
      name: "Ibuprofen",
      frequency: "3x daily",
      time: "AF",
      qty: 15,
      dose: "200mg",
      hsn: "3005",
      mrp: 75,
      discount: 10,
      price: 67.5,
    },
    {
      name: "Amoxicillin",
      frequency: "1x daily",
      time: "AF",
      qty: 20,
      dose: "250mg",
      hsn: "3006",
      mrp: 100,
      discount: 15,
      price: 85,
    },
  ];

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
            onClick={() => navigate("/billing", { state: { sales_id: Details.sales_id } })}
          >
            Start Shipping
          </button>
        </div>

        <div className="toporderditems maincolorpadding">
          <div className="toporderditemstit flex">
            <h4 className="secondtitleparma">Ordered items</h4>
            <h3 className="statusmain">Order confiremd</h3>
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
                <th className="orderdetails-header">Trasist Date</th>
                <th className="orderdetails-header">Delivered Date</th>
              </tr>
            </thead>
            <tbody className="orderdetails-tbody">
              {data.map((item) => (
                <tr key={item.id} className="orderdetails-row">
                  <td className="orderdetails-id-column orderdetails-data">
                    {item.id}
                  </td>
                  <td className="orderdetails-data orderdetails-data-attachment">
                    {item.attachment} <a href="">view</a>{" "}
                  </td>
                  <td className="orderdetails-data">{item.confirmed}</td>
                  <td className="orderdetails-data">{item.packed}</td>
                  <td className="orderdetails-data">{item.dispatched}</td>
                  <td className="orderdetails-data">{item.delivered}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="ordersecondsec">
          <div className="ordersecondsecleft maincolorpadding">
            <h4 className="secondtitleparma">Customer Details</h4>

            <div className="customerdatas flex">
              <h3>Name:</h3>
              <h3>Aswanth Up</h3>
            </div>
            <div className="customerdatas flex">
              <h3>Doctor Name:</h3>
              <h3>Arun Manoj</h3>
            </div>

            <div className="customerdatas flex">
              <h3>Contact Number:</h3>
              <h3>+91 9898899989</h3>
            </div>

            <div className="customerdataremark">
              <h3>Address</h3>
              <h4 className="customerdataspara">
                Door No. 48, 1541, Ponnurunni-Chalikkavattom Rd, Ponnurunni
                East, Ponnurunni, Vyttila, Kochi, Ernakulam, Kerala 682028
              </h4>
            </div>

            <div className="customerdataremark">
              <h3>Remarks</h3>
              <h4 className="customerdataspara">
                A doctor is a medical professional who diagnoses, treats, and
                prevents illnesses, injuries, and various medical conditions in
                individuals. Doctors play a crucial role in maintaining and
                improving the health and well-being of their patients.{" "}
              </h4>
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
          <h4 className="secondtitleparma">Billed items</h4>

          <table className="billeddetails-table">
            <thead className="billeddetails-table-head">
              <tr>
                <th>Medicine Name</th>
                <th>Frequency</th>
                <th>BF/AF</th>
                <th>QTY</th>
                <th>Dose</th>
                <th>HSN</th>
                <th>MRP</th>
                <th>Discount (%)</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody className="billeddetails-table-body">
              {medicines.map((med, index) => (
                <tr key={index}>
                  <td>{med.name}</td>
                  <td>{med.frequency}</td>
                  <td>{med.time}</td>
                  <td>{med.qty}</td>
                  <td>{med.dose}</td>
                  <td>{med.hsn}</td>
                  <td>₹{med.mrp.toFixed(2)}</td>
                  <td>{med.discount}%</td>
                  <td>₹{med.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="noassign flex">
            <span>Not billed yet</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prescriptions;
