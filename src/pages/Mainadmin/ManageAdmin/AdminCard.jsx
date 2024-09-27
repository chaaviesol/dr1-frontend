import React from "react";
import "../Mainadmin/mainadmin.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function AdminCard({ admin }) {
  const navigate = useNavigate();
  console.log({ admin });
  const handleEdit = () => {
    navigate('/addadmin', { state: { admin } });
  };

  return (
    <div className="admincard">
      <div className="adminlistnamesection flex">
        <img src="../images/man.jpg" alt="" />
        <div style={{ marginLeft: "20px" }}>
          <h4>{admin?.name}</h4>
          <h4 className="admintype">{admin?.adm_type}</h4>
        </div>
      </div>
      <div className="adminlistdatasection">
        <div className="flex texticonset">
          <i class="fi fi-sr-call-outgoing"></i>
          <h4 style={{ marginLeft: "10px" }}>{admin?.phone_no}</h4>
        </div>

        <div className="flex texticonset">
          <i class="fi fi-sr-envelope"></i>
          <h4 style={{ marginLeft: "10px" }}>{admin?.emailid}</h4>
        </div>
      </div>
      <div className="adminlistbuttonsection flex">
        <button style={{ backgroundColor: "#F35454" }} className="flex">
          Remove
        </button>

        <button style={{ backgroundColor: "#2A9D8F" }} onClick={handleEdit} className="flex">
          Edit
        </button>
      </div>
    </div>
  );
}

AdminCard.propTypes = {
  admin: PropTypes.shape({
    id: PropTypes.number.isRequired,
    adm_id: PropTypes.string.isRequired,
    adm_type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    emailid: PropTypes.string.isRequired,
    phone_no: PropTypes.string.isRequired,
    is_active: PropTypes.string.isRequired,
  }).isRequired,
};

export default AdminCard;
