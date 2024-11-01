import React, { useEffect, useState } from "react";
import { port } from "../../../config";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { Loader } from "../../../components/Loader/Loader";
export default function Mainadmincustomer({
  updateState: { setChangeDashboards, setDetailData },
}) {
  const [Customer, setCustomer] = useState([]);
  const [initialData, setinitialData] = useState([]);

  const { auth } = useAuth();

  const fetchCustomerList = async () => {
    const response = await axios.get(`${port}/user/getusers`);
    return response.data;
  };

  const { data: customers, isLoading: isUserListFetching } = useQuery({
    queryKey: ["fetchCustomerList", auth.userId],
    queryFn: fetchCustomerList,
  });

  useEffect(() => {
    if (!isUserListFetching && customers) {
      setCustomer(customers.data);
      setinitialData(customers.data);
    }
  }, [customers]);

  const navigateFn = (data) => {
    setDetailData(data);
    setChangeDashboards({ customerDetail: true });
  };

  const SearchData = (e) => {
    const { name, value } = e?.target;
    let tempData = initialData;
    console.log(value);
    if (!value) {
      setCustomer(initialData);
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

    console.log("tempData =>", tempData);

    setCustomer(tempData);
  };

  const reformatDate = (dateString) => {
    return moment(dateString).format("DD-MM-YYYY");
  };


  const filterDate = (e) => {
    const { value } = e.target;
    // console.log("initialData", initialData);
    const formattedDate = reformatDate(value);
    const filteredData = initialData.filter((item) => {
      const dateMatch = reformatDate(item.datetime) === formattedDate;
      return dateMatch;
    });

    // console.log("Filtered data:", filteredData);
    setCustomer(filteredData);
  };

  return (
    <div>
      {isUserListFetching && <Loader />}
      <div className="mainadmindoctordatas_chart mainadmindoctordatas_chart_doctor flex">
        <div className="mainadmindoctordatas_chart1 mainadmindoctordatas_chart10 flex">
          <div className="mainadmindoctordatas_chart_icon mainadmindoctordatas_chart_icon10 flex">
            <i class="ri-user-shared-line"></i>
          </div>

          <div style={{ marginLeft: "18px" }}>
            <h2>{customers?.allregisteredcount || 0}</h2>
            <h4>Registered</h4>
          </div>
        </div>

        <div className="mainadmindoctordatas_chart1 mainadmindoctordatas_chart2 mainadmindoctordatas_chart11  flex">
          <div className="mainadmindoctordatas_chart_icon mainadmindoctordatas_chart_icon11 flex">
            <i class="ri-user-follow-line"></i>
          </div>

          <div style={{ marginLeft: "18px" }}>
            <h2>{customers?.allcompletedcount || 0}</h2>
            <h4>Completed</h4>
          </div>
        </div>
      </div>

      <h3 style={{ marginBottom: "1.3vw", marginTop: "1.3vw" }}>Customers</h3>
      <table className="doctortable">
        <tr className="doctortableTr">
          <th>No</th>
          <th
            className="doctortableTh"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {" "}
            Name
            <input
              type="text"
              onChange={SearchData}
              name="name"
              placeholder="Search Customer"
            />
          </th>
          <th>Mobile Number</th>
          <th style={{ display: "flex", flexDirection: "column" }}>
            Pincode
            <input
              type="text"
              onChange={SearchData}
              name="pincode"
              placeholder="Search pincode"
            />
          </th>

          <th>Age group</th>
          <th style={{ display: "flex", flexDirection: "column" }}>
            Join Date
            <input
              type="date"
              onChange={filterDate}
              name="datetime"
              max={new Date().toISOString().split("T")[0]}
              placeholder="dd/mm/yyyy"
            />
          </th>
          <th>
            Status
            {/* <input
              type="text"
              onChange={SearchData}
              name="status"
              placeholder="Search by status"
            /> */}
          </th>
        </tr>
        {!isUserListFetching &&
          Customer &&
          Customer.length > 0 &&
          Customer.map((ele, index) => (
            <tr
              onClick={() => {
                navigateFn(ele);
              }}
            >
              <td>{index + 1}</td>
              <td style={{ textTransform: "capitalize" }}>{ele?.name}</td>
              <td>{ele?.phone_no}</td>
              <td>{ele?.pincode}</td>
              <td>{ele?.ageGroup}</td>
              <td>{moment(ele?.datetime).format("DD-MM-YYYY")}</td>
              <td>{ele?.status === "Y" ? "Active" : "inActive"}</td>
            </tr>
          ))}
      </table>
    </div>
  );
}
