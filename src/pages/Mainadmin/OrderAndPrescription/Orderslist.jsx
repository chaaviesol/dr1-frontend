import React, { useEffect, useState } from "react";
import { BASE_URL, PHARMACY_URL, port } from "../../../config";
import axios from "axios";
import moment from "moment";
// import { useNavigate } from "react-router-dom";
import "./listtablestyle.css";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../../../components/Loader/Loader";
export default function Orderslist({
  updateState: { setChangeDashboards, setDetailData },
}) {
  const [datalist, setdatalist] = useState([]);
  const [initialData, setinitialData] = useState([]);
  const [completed, setcompleted] = useState([]);
  const [filters, setFilters] = useState({
    so_number: "",
    users: "",
    contact_no: "",
    pincode: "",
  });

  //clear details data

  useEffect(() => {
    setDetailData(null);
  }, []);

  const fetchSalesList = async () => {
    try {
      const response = await axios.get(`${PHARMACY_URL}/pharmacy/allsalelist`);
      return response.data;
    } catch (error) {
      // Handling API error in a single place
      throw new Error(
        error?.response?.data?.message ||
          "An error occurred while fetching sales data"
      );
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["fetchSalesList"],
    queryFn: fetchSalesList,
    onError: (err) => {
      console.error(err);
      toast.error(err?.message || "An error occurred");
    },
    enabled: true,
  });

  useEffect(() => {
    if (data) {
      console.log(data?.data);
      setdatalist(data?.data);
      setcompleted(data);
      setinitialData(data?.data);
    }
  }, [data]);

  const navigateFn = (data) => {
    // navigate("/orderdetail", { state: data });
    setDetailData(data);
    setChangeDashboards({ prescriptionOrderDetail: true });
  };
  const SearchData = (e) => {
    const { name, value } = e?.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  //filtering
  useEffect(() => {
    const filtering = () => {
      const filteredData = initialData.filter((data) => {
        const so_number_match =
          !filters?.so_number ||
          data.so_number
            .toLowerCase()
            .includes(filters?.so_number?.toLowerCase());
        const name_match =
          !filters?.users ||
          data.users.toLowerCase().includes(filters?.users?.toLowerCase());
        const contactMatch =
          !filters?.contact_no || data.contact_no.includes(filters?.contact_no);
        const pincode = String(data?.pincode || "");
        const pincodeMatch =
          !filters.pincode || pincode.includes(filters.pincode);

        return so_number_match && name_match && contactMatch && pincodeMatch;
      });
      console.log(filteredData);
      setdatalist(filteredData);
    };
    if (initialData.length > 0) {
      filtering();
    }
  }, [filters]);

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

  console.log({ datalist });
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
        <tbody>
          <tr className="orderlisttableTr">
            <th className="orderlisttableTh">No</th>
            <th className="orderlisttableTh">
              <h4> Order no</h4>
              <input
                type="text"
                onChange={SearchData}
                name="so_number"
                placeholder="Search"
              />
            </th>

            <th className="orderlisttableTh">
              {" "}
              <h4>Customer name</h4>
              <input
                type="text"
                onChange={SearchData}
                name="users"
                placeholder="Search"
              />
            </th>

            <th className="">
              <h4>Mobile number</h4>
              <input
                type="number"
                onChange={SearchData}
                name="contact_no"
                placeholder="Search"
              />
            </th>

            <th className="">
              <h4>Pincode</h4>
              <input
                type="text"
                onChange={SearchData}
                name="pincode"
                placeholder="Search"
              />
            </th>

            <th className="">
              <h4>Date</h4>
              <input
                type="date"
                max={new Date().toISOString().split("T")[0]}
                onChange={filterDate}
                name="created_date"
              />
            </th>
            <th className="">
              <h4>Status</h4>
            </th>
          </tr>
          {datalist.map((ele, index) => (
            <tr
              key={index}
              onClick={() => {
                navigateFn(ele);
              }}
            >
              <td>{index + 1}</td>
              <td>{ele?.so_number}</td>
              <td>{ele?.users}</td>
              <td>{ele?.contact_no}</td>
              <td>{ele?.pincode}</td>
              <td>{moment.utc(ele?.created_date).format("DD-MM-YYYY")}</td>
              <td>
                {" "}
                <div
                  style={{
                    backgroundColor:
                      ele?.so_status === "placed"
                        ? "#6b8cfe"
                        : ele?.so_status === "confirmed"
                        ? "#FB8500"
                        : ele?.so_status === "packed"
                        ? "#ff5722"
                        : ele?.so_status === "delivered"
                        ? "#2A9D8F"
                        : "gray",
                    borderRadius: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    padding: "5px 10px",
                    textTransform:"capitalize",
                    cursor:"pointer"

                  }}
                >
                  {ele?.so_status}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
