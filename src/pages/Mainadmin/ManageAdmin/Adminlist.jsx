import React from "react";
import "../Mainadmin/mainadmin.css";
import AdminCard from "./AdminCard";
import axios from "axios";
import { port } from "../../../config";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function Adminlist({ setChangeDashboards }) {
  const fetchAdmins = async () => {
    const response = await axios.get(`${port}/admin/getadmin`);
    return response.data.data;
  };
  const { data: adminsData, isLoading } = useQuery({
    queryKey: ["fetchAdmins"],
    queryFn: fetchAdmins,
  });
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setChangeDashboards({
      addadmin: true,
    });
  };
  console.log({ adminsData });
  return (
    <div>
      <div style={{ marginTop: "1.3vw" }} className="flex admin_view_more">
        <h3>Admins</h3>
        <button
          style={{ backgroundColor: "#3A65FD", color: "white" }}
          disabled={isLoading}
          onClick={handleButtonClick}
        >
          Add New Admins
          <i style={{ marginLeft: "0.5vw" }} class="ri-add-circle-line"></i>
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "60px",
        }}
      >
        {adminsData?.length > 0 &&
          adminsData.map((ele) => <AdminCard admin={ele} />)}
      </div>
    </div>
  );
}
