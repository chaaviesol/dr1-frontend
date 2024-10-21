import React, { useEffect, useState } from "react";
import { port } from "../../../config";
import moment from "moment-timezone";
// import { useNavigate } from "react-router-dom";
import "../OrderAndPrescription/listtablestyle.css";
import { Loader } from "../../../components/Loader/Loader";
import axios from "axios";

export default function HealthPartners() {
    const [datalist, setdatalist] = useState([]);
    const [initialData, setinitialData] = useState([]);
  
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(`${port}/admin/getchatdata`);
  
          if (response?.status === 200) {
            const data = response?.data?.data || [];
            setdatalist(data);
  
            setinitialData(data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    const navigateFn = (id) => {
      // setQueryId(id);
      // setChangeDashboards({ manageQuery: true });
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
            <h2>{initialData?.length}</h2>
            <h4>Requested</h4>
          </div>
        </div>

        {/* <div className="mainadmindoctordatas_chart1 mainadmindoctordatas_chart2 mainadmindoctordatas_chart11  flex">
          <div className="mainadmindoctordatas_chart_icon mainadmindoctordatas_chart_icon11 flex">
            <i class="ri-user-follow-line"></i>
          </div>

          <div style={{ marginLeft: "18px" }}>
            <h2>{}</h2>
            <h4>Answered</h4>
          </div>
        </div> */}
      </div>

      <h3 style={{ marginBottom: "1.3vw", marginTop: "1.3vw" }}>Query List</h3>
      <table className="orderlisttable">
        <tr className="orderlisttableTr">
          <th className="orderlisttableTh">No</th>

          <th className="orderlisttableTh">
            {" "}
            <h4> Name</h4>
            <input
              type="text"
              onChange={SearchData}
              name="name"
              placeholder="Search name"
            />
          </th>

          <th className="orderlisttableTh">
            {" "}
            <h4>Type</h4>
            <input
              type="text"
              onChange={SearchData}
              name="type"
              placeholder="Search Type"
            />
          </th>
          <th className="orderlisttableTh">
            {" "}
            <h4>Contact no</h4>
            <input
              type="text"
              onChange={SearchData}
              name="contact_no"
              placeholder="Search contact_no"
            />
          </th>

          <th className="">
            <h4>Date</h4>
            <input
              type="date"
              max={new Date().toISOString().split("T")[0]}
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
            key={index}
            onClick={() => {
              navigateFn(ele.id);
            }}
          >
            <td>{index + 1}</td>
            <td>{ele?.name}</td>
            <td>{ele?.type}</td>
            <td>{ele?.contact_no}</td>
            <td>{moment(ele?.created_date).format("DD-MM-YYYY")}</td>

            <td>{ele?.status}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}
