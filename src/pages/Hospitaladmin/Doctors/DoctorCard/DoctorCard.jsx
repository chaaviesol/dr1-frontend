import React, { useContext } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { HospitalAdminContext } from "../../../../contexts/Doctor/HospitalAdminProvider";


export const DoctorCard = ({ data, setChangeDashboards }) => {
  console.log({ data });
  const{setSelectedDoc}=useContext(HospitalAdminContext)
  const tempImage = "./images/TempDocImg.webp";
  const handleClick = () => {
    setSelectedDoc(data)
    setChangeDashboards({
      manageDoc: true,
    });
  };
  return (
    <>
      <div onClick={handleClick} className={styles.cardContainer}>
        <div>
          <img
            className={styles.docImage}
            src={data?.image || tempImage}
            alt=""
            style={{objectFit:"contain"}}

          />
        </div>
        <div>
          <div>
            <span style={{ fontWeight: 400, fontSize: 22 }}>{data?.name}</span>
          </div>
          <div>
            {" "}
            <span
              style={{
                fontWeight: 300,
                fontSize: 18,
                color: "#3A65FD",
                textTransform: "capitalize",
              }}
            >
              {data?.specialization || `specialization`}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
