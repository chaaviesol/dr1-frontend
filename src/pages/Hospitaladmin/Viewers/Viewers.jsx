import moment from "moment";
import React from "react";

function Viewers({ consultAndViewData }) {
  return (
    <>
      <h3 style={{ marginBottom: "1.3vw", marginTop: "2vw" }}>Views</h3>

      <table className="doctortable">
        <tr>
          <th>No</th>
          <th>Customer Name</th>
          <th>Date & Time</th>
          <th>PIN & Location</th>
          <th>Type</th>
        </tr>
    
        {consultAndViewData &&
          consultAndViewData.allData.length > 0 &&
          consultAndViewData.allData.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data?.userid?.name}</td>
              <td>{moment(data?.created_date).format("DD/MM/YYYY")}</td>
              <td>{data?.userid?.pincode || 673001} , Kozhikode</td>
              <td>{data.consultcount === 1 ? "Consulted" : "Viewed"}</td>
            </tr>
          ))}
      </table>
    </>
  );
}

export default Viewers;
