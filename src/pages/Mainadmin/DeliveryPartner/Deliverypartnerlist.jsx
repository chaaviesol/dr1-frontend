import React, { useEffect, useState } from "react";
import { port } from "../../../config";
import moment from "moment-timezone";
import "../OrderAndPrescription/listtablestyle.css";
import { Loader } from "../../../components/Loader/Loader";
import axios from "axios";

export default function Deliverypartnerlist() {
  const [datalist, setdatalist] = useState([]);
  const [initialData, setinitialData] = useState([]);
  const [completed, setcompleted] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
console.log({datalist})
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${port}/pharmacyquotation/getdeliverypartners`
        );

        if (response?.status === 200) {
          const data = response?.data?.data || [];
          setdatalist(data);
          setcompleted(response?.data);
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
            <h4>Total</h4>
          </div>
        </div>
      </div>

      <h3 style={{ marginBottom: "1.3vw", marginTop: "1.3vw" }}>
        Delivery Partner List
      </h3>
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
              placeholder="Search Name"
            />
          </th>

          <th className="orderlisttableTh">
            {" "}
            <h4>Contact no</h4>
            <input
              type="text"
              onChange={SearchData}
              name="phone"
              placeholder="Search Phone number"
            />
          </th>

          <th className="">
            <h4>Pharmacy Name</h4>
            <input
              type="text"
              // onChange={SearchData}
              
              name="pharmacy_name"
              placeholder="Search name"
            />
          </th>

          <th className="">
            <h4>{datalist[0]?.wallet_date}</h4>
            {/* <input
                  type="text"
                  onChange={SearchData}
                  name="wallet"
                  placeholder="Search by amount"
                /> */}
          </th>
        </tr>
        {datalist?.map((ele, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{ele?.name}</td>
            <td>{ele?.phone}</td>
            <td>{ele?.pharmacy_name}</td>
            {/* <td style={{ backgroundColor: ele?.wallet > 0 ? 'red' : 'white', color: 'black' }}>{ele?.wallet}</td>  */}
            <td style={{ color: ele?.wallet > 0 ? 'red' : 'black' }}>{ele?.wallet}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
