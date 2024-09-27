import axios from "axios";
import React, { useEffect, useState } from "react";
import { port } from "../../../config";
import moment from "moment";
import { getStatus } from "../utils";

export default function Mainadminlabslist({ updateState, setLabDetails }) {
  const [Count, setCount] = useState({});
  const [allLabs, setAllLabs] = useState([
    {
      id: "",
      name: "",
      phone_no: "",
      pincode: "",
      address: "",
      status: "",
      services: "",
      features: "",
      datetime: "",
      email: "",
    },
  ]);
  const [filteredLabs, setFilteredLabs] = useState([
    {
      name: "",
      pincode: "",
      datetime: "",
      services: "",
      features: "",
    },
  ]);

  const [filters, setFilters] = useState({
    labName: "",
    pincode: "",
    date: "",
    services: "",
    feature: "",
  });

  useEffect(() => {
    fetchAllLabDetails();
    const data = { type: "Lab" };
    axios.post(`${port}/admin/total_count`, data).then((res) => {
      console.log("countesss", res);
      setCount(res?.data);
    });
  }, []);

  useEffect(() => {
    if (allLabs.length > 0) {
      handleFilters();
    }
  }, [filters]);

  const fetchAllLabDetails = async () => {
    try {
      const response = await axios.post(`${port}/admin/getalldatas`, {
        type: "Lab",
      });
      console.log(response);
      setAllLabs(response?.data?.data);
      setFilteredLabs(response?.data?.data);
    } catch (err) {
      console.error(err);
    } finally {
    }
  };

  const handleFilters = () => {
    const filteredData = allLabs?.filter((lab) => {
      const nameMatch =
        !filters.labName ||
        lab.name.toLowerCase().includes(filters?.labName.toLowerCase());

      const dateMatch =
        !filters.date || filters?.date === reformatDate(lab?.datetime);

      const pinCodeMatch =
        !filters.pincode ||
        lab?.pincode?.toLowerCase().includes(filters?.pincode?.toLowerCase());
      const servicesMatch =
        !filters.services ||
        lab?.services?.some((service) =>
          service.toLowerCase().includes(filters?.services?.toLowerCase())
        );
      const featuresMatch =
        !filters.feature ||
        lab?.features?.some((feature) =>
          feature.toLowerCase().includes(filters?.feature?.toLowerCase())
        );

      return (
        nameMatch && dateMatch && pinCodeMatch && servicesMatch && featuresMatch
      );
    });
    console.log(filteredData);
    setFilteredLabs(filteredData);
  };
  const reformatDate = (dateString) => {
    return moment(dateString).format("DD-MM-YYYY");
  };
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: name === "date" ? reformatDate(value) : value,
    }));
  };

  const handleLabClick = (labDetail) => {
    setLabDetails(labDetail);
    updateState({ singleLabDetails: true });
  };

  console.log("filters =>", filters);

  return (
    <div>
      <div className="mainadmindoctordatas_chart mainadmindoctordatas_chart_doctor flex">
        <div className="mainadmindoctordatas_chart1 mainadmindoctordatas_chart10 flex">
          <div className="mainadmindoctordatas_chart_icon mainadmindoctordatas_chart_icon10 flex">
            <i class="fi fi-sr-syringe"></i>
          </div>

          <div style={{ marginLeft: "18px" }}>
            <h2>{Count?.alllabs}</h2>
            <h4>Labs</h4>
          </div>
        </div>

        <div className="mainadmindoctordatas_chart1 mainadmindoctordatas_chart2 mainadmindoctordatas_chart11  flex">
          <div className="mainadmindoctordatas_chart_icon mainadmindoctordatas_chart_icon11 flex">
            <i class="ri-rest-time-line"></i>
          </div>

          <div style={{ marginLeft: "18px" }}>
            <h2>{Count?.pendinglabs}</h2>
            <h4>Inactive</h4>
          </div>
        </div>

        <div className="mainadmindoctordatas_chart1 mainadmindoctordatas_chart2 mainadmindoctordatas_chart12 flex">
          <div className="mainadmindoctordatas_chart_icon mainadmindoctordatas_chart_icon12 flex">
            <i class="ri-close-circle-line"></i>
          </div>

          <div style={{ marginLeft: "18px" }}>
            <h2>{Count?.disabledlabs}</h2>
            <h4>Disabled</h4>
          </div>
        </div>
      </div>

      <h3 style={{ marginBottom: "1.3vw" }}>Lab List</h3>
      <table className="doctortable">
        <tr className="doctortableTr">
          <th>No</th>
          <th className="doctortableTh">
            Laboratory Name <br />
            <input
              type="text"
              onChange={handleFilterChange}
              name="labName"
              placeholder="Search labs"
            />
          </th>
          <th>Mobile Number</th>
          <th>
            PIN & Location <br />
            <input
              type="text"
              onChange={handleFilterChange}
              name="pincode"
              placeholder="Search with pincode"
            />
          </th>
          <th>
            Services <br />
            <input
              type="text"
              onChange={handleFilterChange}
              name="services"
              placeholder="Search Services"
            />
          </th>
          <th>
            {" "}
            Features <br />
            <input
              type="text"
              onChange={handleFilterChange}
              name="feature"
              placeholder="Search Feature"
            />
          </th>
          <th>View count</th>
          <th>Counsult count</th>
          <th>
            Join Date <br />
            <input
              type="date"
              max={new Date()}
              onChange={handleFilterChange}
              name="date"
            />
          </th>
          <th>Status</th>
        </tr>
        {filteredLabs?.map((ele, index) => (
          <tr
            className="mainadmin-Lab-tablebody-tr"
            key={ele.id}
            onClick={() => handleLabClick(ele)}
          >
            <td>{index + 1}</td>
            <td>{ele?.name}</td>
            <td>{ele?.phone_no}</td>
            <td>{`${ele?.pincode} , ${ele?.address}`}</td>
            <td>
              {ele?.services?.length > 0 &&
                ele.services.map((service) => `${service} ,`)}
            </td>
            <td>
              {" "}
              {ele?.features?.length > 0 &&
                ele.features.map((feature) => `${feature} ,`)}
            </td>
            <td>{ele?.view_count}</td>
            <td>{ele?.consult_count}</td>

            <td>{moment(ele?.datetime).format("DD-MM-YYYY")}</td>
            <td>{getStatus(ele.status)}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
