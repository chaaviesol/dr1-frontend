import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../../config";
import axios from "axios";
import moment from "moment";
import "../../OrderAndPrescription/listtablestyle.css";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../../../../components/Loader/Loader";

export default function Secondoplist({
  updateState: { setChangeDashboards, setDetailData },
}) {
  const [datalist, setdatalist] = useState([]);
  const [initialData, setinitialData] = useState([]);
  const [completed, setcompleted] = useState([]);

  const fetchPrescriptionList = async () => {
    const response = await axios.get(`${BASE_URL}/secondop/getallreport`);
    return response.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["fetchPrescriptionList"],
    queryFn: fetchPrescriptionList,
    onError: (err) => {
      console.error(err);
      toast.error(err?.message || "An error occurred");
    },
    enabled: true,
  });

  useEffect(() => {
    if (data) {
      setdatalist(data?.data);
      setcompleted(data);
      setinitialData(data?.data);
    }
  }, [data]);

  const navigateFn = (data) => {
    setDetailData(data);
    setChangeDashboards({ secondopinionDetail: true });
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
      return;
    }

    const filteredData = initialData.filter((item) => {
      const itemDate = moment(item?.created_date).startOf("day");

      if (itemDate.isValid()) {
        return itemDate.isSame(inputDate, "day");
      }
      return false;
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
            <h2>{completed?.otherscount}</h2>
            <h4>Expert team</h4>
          </div>
        </div>

        {/* <div style={{ marginLeft: "18px" }}>
            <h2>{completed?.allrequest}</h2>
            <h4>Requested</h4>
          </div>
        </div> */}

        {/* <div className="mainadmindoctordatas_chart1 mainadmindoctordatas_chart2 mainadmindoctordatas_chart11  flex">
          <div className="mainadmindoctordatas_chart_icon mainadmindoctordatas_chart_icon11 flex">
          <i class="ri-user-shared-line"></i>
          </div>

          <div style={{ marginLeft: "18px" }}>
            <h2>{completed?.otherscount}</h2>
            <h4>Expert team</h4>
          </div>
        </div> */}

        <div className="mainadmindoctordatas_chart1 mainadmindoctordatas_chart2 mainadmindoctordatas_chart11  flex">
          <div className="mainadmindoctordatas_chart_icon mainadmindoctordatas_chart_icon11 flex">
            <i class="ri-user-follow-line"></i>
          </div>

          <div style={{ marginLeft: "18px" }}>
            <h2>{completed?.completedcount}</h2>
            <h4>Completed</h4>
          </div>
        </div>
      </div>

      <h3 style={{ marginBottom: "1.3vw", marginTop: "1.3vw" }}>
        Second Opinion Requests
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

          <th className="orderlisttableTh">
            {" "}
            <h4>Discipline</h4>
            <input
              type="text"
              onChange={SearchData}
              name="department"
              placeholder="Search Discipline"
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
            {/* <input
              type="text"
              onChange={SearchData}
              name="status"
              placeholder="Search by status"
            /> */}
          </th>
        </tr>
        {datalist?.map((ele, index) => (
          <tr
            onClick={() => {
              navigateFn(ele);
            }}
          >
            <td>{index + 1}</td>
            <td>{ele?.patient_name}</td>
            <td>{ele?.department}</td>
            <td>{ele?.alternative_number}</td>
            <td>{moment(ele?.created_date).subtract(10, "days").calendar()}</td>

            <td>
              {ele?.status === "Forwarded to expert team"
                ? "Forwarded to expert team"
                : ele?.status}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
