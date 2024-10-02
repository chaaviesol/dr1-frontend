import React, { useEffect, useState } from "react";
import { port } from "../../../config";
import axios from "axios";
import moment from "moment";
// import { useNavigate } from "react-router-dom";
import "./listtablestyle.css";
export default function Orderslist({
    updateState: { setChangeDashboards, setDetailData },
  })  {
  const [datalist, setdatalist] = useState([]);
  const [initialData, setinitialData] = useState([]);
  const [completed,setcompleted]=useState([])
  // const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();
  console.log(datalist);
  useEffect(() => {
    // setIsLoading(true)
    axios.get(`${port}/pharmacy/allsalelist`).then((res) => {
    if(res?.status===200){
        // setIsLoading(false)
        setdatalist(res?.data?.data);
        setcompleted(res?.data);
        setinitialData(res?.data?.data);
    }
  
    });
  }, []);

  const navigateFn = (data) => {
    // navigate("/orderdetail", { state: data });
    setDetailData(data);
    setChangeDashboards({ salesOrderDetail: true });
  };

  const SearchData = (e) => {
    const { name, value } = e?.target;
    let tempData = initialData;
    console.log(value);
    if (!value) {
        setdatalist(initialData);
      return;
    }

    tempData = tempData.filter((item) => {
      let itemValue = item?.[name];
      if (itemValue !== undefined && itemValue !== null) {
        // Convert itemValue to string for comparison
        itemValue = itemValue.toString().toLowerCase();
        return itemValue.includes(value.toLowerCase());
      }
      return false;
    });

    setdatalist(tempData);
  };

  const filterDate = (e) => {
    const { value } = e.target;
    const inputDate = moment(value).startOf("day");
 

    if (!inputDate.isValid()) {
      console.error("Invalid date input");
      return; // Handle invalid date input (optional)
    }

    const filteredData = initialData.filter((item) => {
      const itemDate = moment(item?.created_date).startOf("day");

      if (itemDate.isValid()) {
        // Compare only the date part
        return itemDate.isSame(inputDate, "day");
      }
      return false;
    });

    setdatalist(filteredData);
  };


  return (
    <div>
    
      <div className="mainadmindoctordatas_chart mainadmindoctordatas_chart_doctor flex">
        <div className="mainadmindoctordatas_chart1 mainadmindoctordatas_chart10 flex">
          <div className="mainadmindoctordatas_chart_icon mainadmindoctordatas_chart_icon10 flex">
            <i class="ri-user-shared-line"></i>
          </div>

          <div style={{ marginLeft: "18px" }}>
            <h2>{completed?.requestlength}</h2>
            <h4>Placed</h4>
          </div>
        </div>
        {/* <div className="mainadmindoctordatas_chart1 mainadmindoctordatas_chart2 mainadmindoctordatas_chart11  flex">
          <div className="mainadmindoctordatas_chart_icon mainadmindoctordatas_chart_icon11 flex">
            <i class="ri-user-follow-line"></i>
          </div>

          <div style={{ marginLeft: "18px" }}>
            <h2>{completed?.outfordelivery}</h2>
            <h4>Out for Delivery</h4>
          </div>
        </div> */}

        <div className="mainadmindoctordatas_chart1 mainadmindoctordatas_chart2 mainadmindoctordatas_chart11  flex">
          <div className="mainadmindoctordatas_chart_icon mainadmindoctordatas_chart_icon11 flex">
            <i class="ri-user-follow-line"></i>
          </div>

          <div style={{ marginLeft: "18px" }}>
            <h2>{completed?.otherslength}</h2>
            <h4>Delivered</h4>
          </div>
        </div>
      </div>

      <h3 style={{ marginBottom: "1.3vw", marginTop: "1.3vw" }}>
        Sales Orders
      </h3>
      <table className="orderlisttable">
        <tr className="orderlisttableTr">
          <th className="orderlisttableTh">No</th>

          <th className="orderlisttableTh">
            {" "}
            <h4>Name</h4>
            <input
              type="text"
              onChange={SearchData}
              name="users"
              placeholder="Search Customer"
            />
          </th>

          <th className="">
            <h4>Mobile Number</h4>
            <input
              type="number"
              onChange={SearchData}
              name="contact_no"
              placeholder="Search contact number"
            />
          </th>

          <th className="">
            <h4>PINCODE</h4>
            <input
              type="text"
              onChange={SearchData}
              name="pincode"
              placeholder="Search pincode"
            />
          </th>

          <th className="">
            <h4>Date</h4>
            <input
              type="date"
              onChange={filterDate}
              name="created_date"
              placeholder="Search by date"
            />
          </th>
          <th className="">
            <h4>Status</h4>
            <input
              type="text"
              onChange={SearchData}
              name="so_status"
              placeholder="Search by status"
            />
          </th>
        </tr>
        {datalist.map((ele, index) => (
          <tr
            onClick={() => {
              navigateFn(ele);
            }}
          >
            <td>{index + 1}</td>
            <td>{ele?.users}</td>
            <td>{ele?.contact_no}</td>
            <td>{ele?.pincode}</td>

            <td>{moment(ele?.created_date).subtract(10, "days").calendar()}</td>
            <td>{ele?.so_status}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
