import React from "react";
import "./DoctorAdminViews.css";
import moment from "moment/moment";
export const DoctorAdminViews = ({ consultAndViewData }) => {
  console.log("consultAndViewData =>>>>>>", consultAndViewData);
  return (
    <>
      <div className="DoctorAdminViews">
        <h3 style={{ marginBottom: "1.3vw" }}>Views</h3>

        <table className="doctortable">
          <tr>
            <th>No</th>
            <th>Customer Name</th>
            {/* <th>Mobile</th> */}
            <th>Date & Time</th>
            <th>Pincode</th>
            <th>Status</th>
          </tr>

          {consultAndViewData &&
            consultAndViewData.allData.length > 0 &&
            consultAndViewData.allData.map((ele, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{ele?.userid?.name}</td>
                {/* <td>{ele?.userid?.phone_no}</td> */}
                <td> {moment.utc(ele?.created_date).format("DD/MM/YYYY")}</td>
                <td>{ele?.userid?.pincode}</td>
                <td>{ele.consultcount === 1 ? "Contacted" : "Viewed"}</td>
              </tr>
            ))}
        </table>
      </div>
    </>
  );
};
