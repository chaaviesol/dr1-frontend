import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import "./labadminprofile.css";
import { toast } from "react-toastify";
import { IconButton } from "@mui/material";

import { BASE_URL } from "../../../config";
import { Loader } from "../../../components/Loader/Loader";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
export const Labadminprofile = ({
  consultAndViewData,
  LabData,
  setLabData,
  isLabDataFetching,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [isAboutEditable, setIsAboutEditable] = useState(false);
  const [about, setAbout] = useState({
    about: LabData?.about,
  });
  const axiosPrivate = useAxiosPrivate();

  const toastConfig = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
  };

  const handleAboutEditToggle = () => {
    setIsAboutEditable(!isAboutEditable);
  };

  const handleAboutEdit = (e) => {
    const { name, value } = e.target;
    setAbout({ [name]: value });
  };
  const handleSentAbout = async () => {
    if (about?.about === LabData?.about) {
      toast.warning("No changes were made", {
        ...toastConfig,
        autoClose: "6000",
      });
      return;
    }
    setIsLoading(true);
    try {
      const payload = {
        lab_id: LabData.id,
        about: about?.about,
      };
      const response = await axiosPrivate.post(
        `${BASE_URL}/lab/editlab`,
        payload
      );
      setIsAboutEditable(isAboutEditable);
      toast.success(response.data.message, toastConfig);
    } catch (err) {
      console.error("Error updating hospital info:", err);
      toast.error("Failed to update hospital information.");
    } finally {
      setIsLoading(false);
    }
  };
  if (LabData?.name) {
    return (
      <>
        {(isLoading || isLabDataFetching) && <Loader />}
        <div className="mainadmindoctordatas flex">
          <div className="mainadmindoctordatas_profile flex">
            <img
              className="mainadmindoctordatas_profile_photo"
              src={LabData?.photo?.image1}
              alt=""
            />

            <div className="mainadmindoctordatas_profile_data flex">
              <div className="flex">
                {" "}
                <h2> {LabData?.name}</h2>{" "}
                {/* <h4
                  className="highlight_data"
                  style={{
                    background: "#2A9D8F",
                    color: "white",
                    marginLeft: "10px",
                  }}
                >
                  {LabData?.type}
                </h4> */}
              </div>

              <h4
                className="highlight_data"
                style={{ background: "#3A65FD", color: "white" }}
              >
                {/* {LabData?.license_no} */}
                {LabData?.timing?.opening_time} to{" "}
                {LabData?.timing?.closing_time}
              </h4>

              <div className="flex">
                <div className="flex texticonset">
                  <i class="fi fi-sr-call-outgoing"></i>
                  <h4 style={{ marginLeft: "10px" }}>{LabData?.phone_no}</h4>
                </div>
              </div>

              <div className="flex texticonset">
                <i class="fi fi-sr-envelope"></i>
                <h4 style={{ marginLeft: "10px" }}>{LabData?.email}</h4>
              </div>
            </div>
          </div>

          <div className="mainadmindoctordatas_chart flex">
            <div className="mainadmindoctordatas_chart1 flex">
              <div className="mainadmindoctordatas_chart_icon flex">
                <i class="fi fi-sr-overview"></i>
              </div>
              <div style={{ marginLeft: "18px" }}>
                <h2>{consultAndViewData?.viewCount}</h2>
                <h4>Views</h4>
              </div>
            </div>

            <div className="mainadmindoctordatas_chart1 mainadmindoctordatas_chart2 flex">
              <div className="mainadmindoctordatas_chart_icon flex">
                <i class="fi fi-sr-call-outgoing"></i>
              </div>

              <div style={{ marginLeft: "18px" }}>
                <h2>{consultAndViewData?.consultCount}</h2>
                <h4>Contacted</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="photosdivadmin">
          <h3 style={{ marginBottom: "1.3vw" }}>Images</h3>
          <div className="photosdivadminsection flex">
            <img src={LabData?.photo?.image1} alt="" />
            <img src={LabData?.photo?.image2} alt="" />
            <img src="/images/doc.jpg" alt="" />
          </div>
        </div>

        <div className="mainadmindoctoraboutavail flex">
          <div className="mainadmindoctorabout">
            <div
              style={{
                marginBottom: "1.3vw",
                display: "flex",
                alignItems: "center",
              }}
              className="mainadmindoctoraboutDiv"
            >
              <h3>About </h3>
              <div>
                <IconButton
                  onClick={handleAboutEditToggle}
                  sx={{ padding: ".8rem" }}
                >
                  <EditIcon
                    style={{ color: isAboutEditable ? "blue" : "black" }}
                  />
                </IconButton>{" "}
              </div>
            </div>
            {isAboutEditable ? (
              <textarea
                onChange={handleAboutEdit}
                className="adimindoctorpinAbout"
                value={about?.about || LabData?.about}
                name="about"
              ></textarea>
            ) : (
              <h4 style={{ marginBottom: "1.3vw" }}>
                {about?.about || LabData?.about}
              </h4>
            )}
            {isAboutEditable && (
              <div className="mainadmindoctoraboutConfirmBtn">
                <button onClick={handleSentAbout}>Update</button>
              </div>
            )}
            <h3 style={{ marginBottom: "1.3vw" }}>Address</h3>

            <h4 style={{ marginBottom: "1vw" }}>{LabData?.address}</h4>
            <div className="flex adimindoctorpin">
              <h4 style={{ background: "#3A65FD", color: "white" }}>
                {LabData?.pincode}
              </h4>
              <h4 style={{ background: "#F3F6FF", color: "#6B8CFE" }}>
                {LabData?.district}
              </h4>
            </div>
          </div>

          <div className="mainadmindoctoravilability mainadmindoctoravilability2">
            <div className="admin_fea_avai flex">
              <div className="admin_fea_avai_left">
                <h3 style={{ marginBottom: "1.3vw" }}> Services</h3>
                {LabData?.services?.length > 0 &&
                  LabData.services.map((speciality) => (
                    <h4 style={{ marginBottom: "1.3vw" }}>
                      <i class="ri-arrow-right-circle-fill"></i>
                      {speciality}
                    </h4>
                  ))}
              </div>

              <div className="admin_fea_avai_right">
                <h3 style={{ marginBottom: "1.3vw" }}>Features</h3>
                {LabData?.features?.length > 0 &&
                  LabData.features.map((feature) => (
                    <h4 style={{ marginBottom: "1.3vw" }}>
                      <i class="ri-arrow-right-circle-fill"></i>
                      {feature}
                    </h4>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Loader />
      </>
    );
  }
};
