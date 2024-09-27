import React, { useEffect, useState } from "react";
import { port } from "../../../config";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { getStatus } from "../utils";
import { Loader } from "../../../components/Loader/Loader";
export default function Mainadminhospitallist({
  updateState: { setChangeDashboards, setDetailData },
}) {
  const navigate = useNavigate();
  const [Hospital, setHospital] = useState([]);
  const [Count, setCount] = useState({});
  const [initialData, setinitialData] = useState([]);
  const [isLoading,setIsLoading]=useState(true)
  const navigateFn = (data) => {
    // navigate("/mainadminhospitaldetails", { state: { data: data } })
    setChangeDashboards({ hospitaldetails: true });
    setDetailData(data);
  };
 
  const fetchData = async () => {
    const requestData = { type: "Hospital" };
    setIsLoading(true);  // Set loading state to true before starting API requests

    try {
      // Fetch hospital data
      const hospitalResponse = await axios.post(`${port}/admin/getalldatas`, requestData);
      console.log(hospitalResponse);
      setHospital(hospitalResponse?.data?.data);
      setinitialData(hospitalResponse?.data?.data);

      // Fetch hospital count
      const countResponse = await axios.post(`${port}/admin/total_count`, requestData);
      console.log("countesss", countResponse);
      setCount(countResponse?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);  // Set loading state to false after data has been fetched or error occurs
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const SearchData = (e) => {
    const { name, value } = e?.target;
    let tempData = initialData;
    console.log(value);
    if (!value) {
      setHospital(initialData);
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

    setHospital(tempData);
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
    setHospital(filteredData);
  };
  const SearchSpeFe = (e) => {
    const { name, value } = e?.target;
    let FilteredData = "";

    FilteredData = initialData.filter((ele) => {
      if (Array.isArray(ele?.[name])) {
        return ele[name].some((FilEle) => {
          return FilEle.toLowerCase().includes(value.toLowerCase());
        });
      }
      return false;
    });

    // Assuming setHospital is a state-setting function
    setHospital(FilteredData);
    console.log("FilteredData>>>>", FilteredData);
  };

  return (
    <div>
      {isLoading&&<Loader/>}
      <div className="mainadmindoctordatas_chart mainadmindoctordatas_chart_doctor flex">
        <div className="mainadmindoctordatas_chart1 mainadmindoctordatas_chart10 flex">
          <div className="mainadmindoctordatas_chart_icon mainadmindoctordatas_chart_icon10 flex">
            <i class="fi fi-sr-hospital"></i>
          </div>

          <div style={{ marginLeft: "18px" }}>
            <h2>{Count?.allhospitals}</h2>
            <h4>Hospital</h4>
          </div>
        </div>

        <div className="mainadmindoctordatas_chart1 mainadmindoctordatas_chart2 mainadmindoctordatas_chart11  flex">
          <div className="mainadmindoctordatas_chart_icon mainadmindoctordatas_chart_icon11 flex">
            <i class="ri-rest-time-line"></i>
          </div>

          <div style={{ marginLeft: "18px" }}>
            <h2>{Count?.pendinghospitals}</h2>
            <h4>Inactive</h4>
          </div>
        </div>

        <div className="mainadmindoctordatas_chart1 mainadmindoctordatas_chart2 mainadmindoctordatas_chart12 flex">
          <div className="mainadmindoctordatas_chart_icon mainadmindoctordatas_chart_icon12 flex">
            <i class="ri-close-circle-line"></i>
          </div>

          <div style={{ marginLeft: "18px" }}>
            <h2>{Count?.disabledhospitals}</h2>
            <h4>Disabled</h4>
          </div>
        </div>
      </div>

      <h3 style={{ marginBottom: "1.3vw" }}>Hospital List</h3>

      <table className="doctortable">
        <tr className="doctortableTr">
          <th>No</th>
          <th className="doctortableTh">
            Hospital Name
            <input
              type="text"
              onChange={SearchData}
              name="name"
              placeholder="Search Hospital"
            />
          </th>
          <th>Mobile Number</th>
          <th>
            Pincode
            <input
              type="text"
              onChange={SearchData}
              name="pincode"
              placeholder="Search pincode"
            />
          </th>
          <th>
            Type
            <input
              type="text"
              onChange={SearchData}
              name="type"
              placeholder="Search by type"
            />
          </th>
          <th>
            Features
            <input
              type="text"
              onChange={SearchSpeFe}
              name="feature"
              placeholder="Search by features"
            />
          </th>
          <th>
            Speciality
            <input
              type="text"
              onChange={SearchSpeFe}
              name="speciality"
              placeholder="Search by speciality"
            />
          </th>
          <th>View count</th>
          <th>Counsult count</th>
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
            <input
              type="text"
              onChange={SearchData}
              name="status"
              placeholder="Search by Contacts"
            />
          </th>
        </tr>
        {Hospital.map((ele, index) => (
          <tr
            onClick={() => {
              navigateFn(ele);
            }}
          >
            <td>{index + 1}</td>
            <td>{ele?.name}</td>
            <td>{ele?.contact_no}</td>
            <td>{ele?.pincode}</td>
            <td>{ele?.type}</td>
            <td>
              {ele.feature !== null &&
                ele.feature.length > 0 &&
                ele?.feature?.map((ele) => ele && `${ele}, `)}
            </td>
            <td>{ele?.speciality?.map((ele) => `${ele}, `)}</td>
            <td>{ele?.view_count}</td>
            <td>{ele?.consult_count}</td>
            <td>{moment(ele?.datetime).subtract(10, "days").calendar()}</td>
            <td>{getStatus(ele.status)}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
