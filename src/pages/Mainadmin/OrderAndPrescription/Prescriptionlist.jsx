import React, { useEffect, useState } from "react";
import { PHARMACY_URL, port } from "../../../config";
import axios from "axios";
import moment from "moment";
import "./listtablestyle.css";
import { toast } from "react-toastify";
import { Loader } from "../../../components/Loader/Loader";

export default function Prescriptionlist({
  updateState: { setChangeDashboards, setDetailData },
}) {
  const [datalist, setdatalist] = useState([]);
  const [initialData, setinitialData] = useState([]);
  const [completed, setcompleted] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPrescriptionList = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${PHARMACY_URL}/pharmacy/prescriptionlist`);
      setdatalist(response?.data?.data);
      setcompleted(response?.data);
      setinitialData(response?.data?.data);
    } catch (err) {
      console.error(err);
      toast.error(err.error || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptionList();
  }, []);

  const navigateFn = (data) => {
    setDetailData(data);
    setChangeDashboards({ prescriptionOrderDetail: true });
  };

  const SearchData = (e) => {
    const { name, value } = e?.target;
    let tempData = initialData;
    console.log(value, name);
    if (!value) {
      setdatalist(initialData);
      return;
    }

    tempData = tempData.filter((item) => {
      let itemValue = item?.[name];
      if (name === "patient_name") {
        itemValue = item?.prescription_data[0][name];
      }
      // alert(itemValue)
      if (itemValue !== undefined && itemValue !== null) {
        // Convert itemValue to string for comparison
        itemValue = itemValue.toString().toLowerCase();
        return itemValue.includes(value.toLowerCase());
      }
      return false;
    });

    setdatalist(tempData);
  };
  const reformatDate = (dateString) => {
    return moment(dateString).format("DD-MM-YYYY");
  };
  const filterDate = (e) => {
    const { value } = e.target;

    const formattedDate = reformatDate(value);
    const filteredData = initialData.filter((item) => {
      const dateMatch = reformatDate(item.created_date) === formattedDate;
      return dateMatch;
    });
    setdatalist(filteredData);
  };

  return (
    <div>
      {isLoading && <Loader />}
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
          <h4>Out for delivery</h4>
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
            <h4>Patient Name</h4>
            <input
              type="text"
              onChange={SearchData}
              name="patient_name"
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
              max={new Date().toISOString().split("T")[0]}
              type="date"
              onChange={filterDate}
              name="created_date"
              placeholder="Search by date"
            />
          </th>
          <th className="">
            <h4>Status</h4>
            {/* <input
              type="text"
              onChange={SearchData}
              name="so_status"
              placeholder="Search by status"
            /> */}
          </th>
        </tr>
        {datalist &&
          datalist.length > 0 &&
          datalist.map((ele, index) => (
            <tr
              onClick={() => {
                navigateFn(ele);
              }}
            >
              <td>{index + 1}</td>
              <td>{ele?.patient_name}</td>
              <td>{ele?.contact_no}</td>
              <td>{ele?.pincode}</td>

              <td>{moment(ele?.created_date).format("DD-MM-YYYY")}</td>

              <td>{ele?.so_status}</td>
            </tr>
          ))}
      </table>
    </div>
  );
}
