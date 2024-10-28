import React from "react";

import { toast } from "react-toastify";
import { port } from "../../../config";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export default function Mainadminlabsapprove({ Details, setChangeDashboards }) {
  const Data = Details;
  const axiosPrivate = useAxiosPrivate();
  console.log(Data);
  const ResponseAdmin = (which) => {
    let data = "";
    if (which === "reject") {
      data = {
        id: Data?.id,
        status: "R",
      };
    } else {
      data = {
        id: Data?.id,
        status: "Y",
      };
    }
    console.log("data>>>>>", data);
    if (data?.id && data?.status) {
      axiosPrivate
        .post(`${port}/lab/approvelab`, data)
        .then((res) => {
          toast.success(res?.data?.message);
        })
        .catch((err) => {
          toast.info(err?.response.data.message);
        });
    }
  };
  const handleBack = () => {
    setChangeDashboards({ onboarding: true });
  };
  
  return (
    <>
      <button
        onClick={handleBack}
        className="adpha-back-button"
        style={{ marginTop: "1rem" }}
      >
        <i className="ri-arrow-left-line"></i>
      </button>
      <div className="mainadmindoctordatas flex">
        <div className="mainadmindoctordatas_profile flex">
          <img
            className="mainadmindoctordatas_profile_photo"
            src={Data?.photo?.image1 || "/images/doc.jpg"}
            alt="/images/doc.jpg"
          />

          <div className="mainadmindoctordatas_profile_data flex">
            <div className="flex">
              {" "}
              <h2>{Data?.name}</h2>{" "}
              <h4
                className="highlight_data"
                style={{
                  background: "#2A9D8F",
                  color: "white",
                  marginLeft: "10px",
                }}
              >
                {Data?.timing?.opening_time} - {Data?.timing?.closing_time}
              </h4>
            </div>

            <h4
              className="highlight_data"
              style={{ background: "#3A65FD", color: "white" }}
            >
              {Data?.license_no}
            </h4>

            <div className="flex">
              <div className="flex texticonset">
                <i class="fi fi-sr-call-outgoing"></i>
                <h4 style={{ marginLeft: "10px" }}>+91 {Data?.phone_no}</h4>
              </div>
            </div>

            <div className="flex texticonset">
              <i class="fi fi-sr-envelope"></i>
              <h4 style={{ marginLeft: "10px" }}>{Data?.email}</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="photosdivadmin">
        <h3 style={{ marginBottom: "1.3vw" }}>Images</h3>
        <div className="photosdivadminsection flex">
          {Data?.photo ? (
            <>
              <img src={Data?.photo?.image1 || "/images/doc.jpg"} alt="" />
              <img src={Data?.photo?.image2 || "/images/doc.jpg"} alt="" />
              <img src={Data?.photo?.image3 || "/images/doc.jpg"} alt="" />
            </>
          ) : (
            <>
              <img src="/images/doc.jpg" alt="" />
              <img src="/images/doc.jpg" alt="" />
              <img src="/images/doc.jpg" alt="" />
            </>
          )}
        </div>
      </div>

      <div className="mainadmindoctoraboutavail flex">
        <div className="mainadmindoctorabout ">
          <h3 style={{ marginBottom: "1.3vw" }}>About</h3>
          {/* <div className='flex' style={{marginBottom:"1vw"}}><h4 className='highlight_data' style={{background:"#2A9D8F", color:"white",}}>Allopathy</h4> <h4 className='highlight_data' style={{marginLeft:"20px", background:"#FB8500", color:"white",}}>Epilepsy</h4></div> */}

          <h4 style={{ marginBottom: "1.3vw" }}>{Data?.about}</h4>
          <h3 style={{ marginBottom: "1.3vw" }}>Address</h3>

          <h4 style={{ marginBottom: "1vw" }}>{Data?.address}</h4>
          <div className="flex adimindoctorpin">
            <h4 style={{ background: "#3A65FD", color: "white" }}>
              {Data?.pincode}
            </h4>
            {Data?.location && (
              <h4 style={{ background: "#F3F6FF", color: "#6B8CFE" }}>
                {Data?.location}
              </h4>
            )}
          </div>
        </div>

        <div className="mainadmindoctoravilability mainadmindoctoravilability2">
          <div className="admin_fea_avai flex">
            <div className="admin_fea_avai_left">
              <h3 style={{ marginBottom: "1.3vw" }}>Features</h3>
              {Data?.features.map((ele) => (
                <h4 style={{ marginBottom: "1.3vw" }}>
                  <i class="ri-arrow-right-circle-fill"></i>
                  {ele}
                </h4>
              ))}
            </div>

            <div className="admin_fea_avai_right">
              <h3 style={{ marginBottom: "1.3vw" }}>Services</h3>
              {Data?.services.map((ele) => (
                <h4 style={{ marginBottom: "1.3vw" }}>
                  <i class="ri-arrow-right-circle-fill"></i>
                  {ele}
                </h4>
              ))}
            </div>
          </div>
        </div>
      </div>
      {Data?.status === "N" || Data?.status === "R" ? (
        <div className="admin_disable_section admin_disable_section2  flex">
          <div className="flex">
            <i class="fi fi-sr-exclamation"></i>
            <h4 style={{ marginLeft: "0.6vw" }}>
              This user has been rejected.
            </h4>
          </div>

          <div className="admin_disable_button flex">
            <h4
              style={{
                marginLeft: "0.6vw",
                backgroundColor: "red",
                cursor: "not-allowed",
              }}
            >
              Rejected
            </h4>
            <h4
              style={{
                marginLeft: "0.6vw",
                backgroundColor: "rgb(42, 157, 143)",
              }}
              onClick={() => ResponseAdmin("approve")}
            >
              Approve
            </h4>
          </div>
        </div>
      ) : (
        <div className="admin_disable_section admin_disable_section2  flex">
          <div className="flex">
            <i class="fi fi-sr-exclamation"></i>
            <h4 style={{ marginLeft: "0.6vw" }}>Waiting for your response</h4>
          </div>

          <div className="admin_disable_button flex">
            <h4 onClick={() => ResponseAdmin("reject")}>Reject</h4>
            <h4
              style={{
                marginLeft: "0.6vw",
                backgroundColor: "rgb(42, 157, 143)",
              }}
              onClick={() => ResponseAdmin("approve")}
            >
              Approve
            </h4>
          </div>
        </div>
      )}
    </>
  );
}
