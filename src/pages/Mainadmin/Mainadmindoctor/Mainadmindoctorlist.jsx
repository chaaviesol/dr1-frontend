import React, { useEffect, useState } from "react";
import { port } from "../../../config";
import axios from "axios";
import moment from "moment";
import { getStatus } from "../utils";
import { Loader } from "../../../components/Loader/Loader";

export default function Mainadmindoctorlist({
  updateState: { setChangeDashboards, setDetailData },
}) {
  const [Doctors, setDoctors] = useState([]);
  const [Count, setCount] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [initialData, setinitialData] = useState([]);
  const fetchData = async () => {
    const requestData = { type: "Doctor" };
    setIsLoading(true);
    try {
      // Fetch doctor data
      const doctorResponse = await axios.post(
        `${port}/admin/getalldatas`,
        requestData
      );
      console.log(doctorResponse);
      setDoctors(doctorResponse?.data?.data);
      setinitialData(doctorResponse?.data?.data);

      // Fetch doctor count
      const countResponse = await axios.post(
        `${port}/admin/total_count`,
        requestData
      );
      console.log("countesss", countResponse);
      setCount(countResponse?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log({ Count });
  const navigateFn = (data) => {
    setDetailData(data);
    setChangeDashboards({ doctorDetail: true });
  };
  const SearchData = (e) => {
    const { name, value } = e?.target;
    let tempData = initialData;
    console.log(value);
    if (!value) {
      setDoctors(initialData);
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

    setDoctors(tempData);
  };

  const filterDate = (e) => {
    const { value } = e.target;
    console.log("Input value:", value);

    const inputDate = moment(value).startOf("day");
    console.log("Parsed input date:", inputDate);

    if (!inputDate.isValid()) {
      console.error("Invalid date input");
      return; // Handle invalid date input (optional)
    }

    const filteredData = initialData.filter((item) => {
      const itemDate = moment(item?.datetime).startOf("day");
      console.log("Item date:", itemDate);

      if (itemDate.isValid()) {
        // Compare only the date part
        return itemDate.isSame(inputDate, "day");
      }
      return false;
    });

    console.log("Filtered data:", filteredData);
    setDoctors(filteredData);
  };

  return (
    <>
      <div className="mainadmindoctordatas_chart mainadmindoctordatas_chart_doctor flex">
        {isLoading && <Loader />}
        <div className="mainadmindoctordatas_chart1 mainadmindoctordatas_chart10 flex">
          <div className="mainadmindoctordatas_chart_icon mainadmindoctordatas_chart_icon10 flex">
            <i class="fi fi-sr-stethoscope"></i>
          </div>

          <div style={{ marginLeft: "18px" }}>
            <h2>{Count?.alldoctors}</h2>
            <h4>Doctors</h4>
          </div>
        </div>

        <div className="mainadmindoctordatas_chart1 mainadmindoctordatas_chart2 mainadmindoctordatas_chart11  flex">
          <div className="mainadmindoctordatas_chart_icon mainadmindoctordatas_chart_icon11 flex">
            <i class="ri-rest-time-line"></i>
          </div>

          <div style={{ marginLeft: "18px" }}>
            <h2>{Count?.pendingdoctors}</h2>
            <h4>Inactive</h4>
          </div>
        </div>

        <div className="mainadmindoctordatas_chart1 mainadmindoctordatas_chart2 mainadmindoctordatas_chart12 flex">
          <div className="mainadmindoctordatas_chart_icon mainadmindoctordatas_chart_icon12 flex">
            <i class="ri-close-circle-line"></i>
          </div>

          <div style={{ marginLeft: "18px" }}>
            <h2>{Count?.disableddoctors}</h2>
            <h4>Disabled</h4>
          </div>
        </div>
      </div>

      <h3 style={{ marginBottom: "1.3vw" }}>Doctor List</h3>
      <table className="doctortable">
        <tr className="doctortableTr">
          <th>No</th>
          <th className="doctortableTh">
            Doctor Name
            <input
              type="text"
              onChange={SearchData}
              name="name"
              placeholder="Search Doctors"
            />
          </th>
          <th>Mobile Number</th>
          <th>
            PIN & Location
            <input
              type="text"
              onChange={SearchData}
              name="pincode"
              placeholder="Search pincode"
            />
          </th>
          <th>
            Specialized
            <input
              type="text"
              onChange={SearchData}
              name="specialization"
              placeholder="Search by Specialization"
            />
          </th>
          <th>View count</th>
          <th>Consult count</th>
          <th>
            Join Date
            <input
              type="date"
              onChange={filterDate}
              name="datetime"
              placeholder="Search by date"
            />
          </th>
          <th>
            Status
            {/* <input
              type="text"
              onChange={SearchData}
              name="status"
              placeholder="Search by Contacts"
            /> */}
          </th>
        </tr>
        {Doctors &&
          Doctors.length > 0 &&
          Doctors.map((ele, index) => (
            <tr
              onClick={() => {
                navigateFn(ele);
              }}
            >
              <td>{index + 1}</td>
              <td>{ele?.name}</td>
              <td>{ele?.phone_no}</td>
              <td>{ele?.pincode}</td>
              <td>{ele?.specialization}</td>
              <td>{ele?.view_count}</td>
              <td>{ele?.consult_count}</td>
              <td>{moment(ele?.datetime).subtract(10, "days").calendar()}</td>
              <td>{getStatus(ele.status)}</td>
            </tr>
          ))}
      </table>
    </>
  );
}
