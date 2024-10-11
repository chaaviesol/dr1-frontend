import React from "react";

export default function Mainadminsidebar({ data: { SentData, selected } }) {
  console.log("selected>>>>", selected);
  const FindButtonValue = (data) => {
    SentData(data);
  };
  return (
    <div className="mainadminsidebar">
      <div
        onClick={() => {
          FindButtonValue("overview");
        }}
        className={
          selected?.overview
            ? "admimmenuicon admimmenuicon2 flex"
            : "admimmenuicon flex"
        }
      >
        <i class="ri-file-chart-fill"></i>
        <h4>Overview</h4>
      </div>

      <div
        onClick={() => {
          FindButtonValue("customer");
        }}
        className={
          selected?.customer
            ? "admimmenuicon admimmenuicon2 flex"
            : "admimmenuicon flex"
        }
      >
        <i class="fi fi-sr-users-alt"></i>
        <h4>Customer</h4>
      </div>

      <div
        onClick={() => {
          FindButtonValue("doctor");
        }}
        className={
          selected?.doctor
            ? "admimmenuicon admimmenuicon2 flex"
            : "admimmenuicon flex"
        }
      >
        <i class="fi fi-sr-stethoscope"></i>
        <h4>Doctor</h4>
      </div>

      <div
        onClick={() => {
          FindButtonValue("hospital");
        }}
        className={
          selected?.hospital
            ? "admimmenuicon admimmenuicon2 flex"
            : "admimmenuicon flex"
        }
      >
        <i class="fi fi-sr-hospital"></i>
        <h4>Hospital</h4>
      </div>

      <div
        onClick={() => {
          FindButtonValue("lab");
        }}
        className={
          selected?.lab || selected.singleLabDetails
            ? "admimmenuicon admimmenuicon2 flex"
            : "admimmenuicon flex"
        }
      >
        <i class="fi fi-sr-syringe"></i>
        <h4>Labs</h4>
      </div>

      <div
        onClick={() => {
          FindButtonValue("feedback");
        }}
        className={
          selected?.feedback
            ? "admimmenuicon admimmenuicon2 flex"
            : "admimmenuicon flex"
        }
      >
        <i class="fi fi-sr-feedback-review"></i>

        <h4>Feedback</h4>
      </div>

      <div
        onClick={() => {
          FindButtonValue("orders");
        }}
        className={
          selected?.orders
            ? "admimmenuicon admimmenuicon2 flex"
            : "admimmenuicon flex"
        }
      >
        <i class="ri-edit-line"></i>
        <h4>Orders</h4>
      </div>
      <div
        onClick={() => {
          FindButtonValue("prescriptions");
        }}
        className={
          selected?.prescriptions
            ? "admimmenuicon admimmenuicon2 flex"
            : "admimmenuicon flex"
        }
      >
        <i class="ri-edit-line"></i>
        <h4>Prescriptions</h4>
      </div>
      <div
        onClick={() => {
          FindButtonValue("productmanagement");
        }}
        className={
          selected?.productmanagement
            ? "admimmenuicon admimmenuicon2 flex"
            : "admimmenuicon flex"
        }
      >
        <i class="ri-edit-line"></i>
        <h4>Product Management</h4>
      </div>
      <div
        onClick={() => {
          FindButtonValue("secondopinion");
        }}
        className={
          selected?.secondopinion
            ? "admimmenuicon admimmenuicon2 flex"
            : "admimmenuicon flex"
        }
      >
        <i class="ri-edit-line"></i>
        <h4>Second Opinion</h4>
      </div>
      <div
        onClick={() => {
          FindButtonValue("category");
        }}
        className={
          selected?.category
            ? "admimmenuicon admimmenuicon2 flex"
            : "admimmenuicon flex"
        }
      >
        <i class="ri-edit-line"></i>
        <h4>Edit category</h4>
      </div>
      <div
        onClick={() => {
          FindButtonValue("viewQuery");
        }}
        className={
          (selected?.manageQuery || selected?.viewQuery )
            ? "admimmenuicon admimmenuicon2 flex"
            : "admimmenuicon flex"
        }
      >
        <i class="fi fi-sr-feedback-review"></i>
        <h4>Manage query</h4>
      </div>
      <div
        onClick={() => {
          FindButtonValue("createCampaign");
        }}
        className={
          (selected?.createCampaign  )
            ? "admimmenuicon admimmenuicon2 flex"
            : "admimmenuicon flex"
        }
      >
        <i class="ri-discount-percent-fill"></i>
        <h4>Campaign</h4>
      </div>
      <div
        onClick={() => {
          FindButtonValue("homeservicelist");
        }}
        className={
          (selected?.homeservicelist  )
            ? "admimmenuicon admimmenuicon2 flex"
            : "admimmenuicon flex"
        }
      >
        <i class="ri-service-fill"></i>
        <h4>Home Services</h4>
      </div>
      <div
        onClick={() => {
          FindButtonValue("careerlist");
        }}
        className={
          (selected?.careerlist  )
            ? "admimmenuicon admimmenuicon2 flex"
            : "admimmenuicon flex"
        }
      >
       <i class="ri-nurse-fill"></i>
        <h4>Career</h4>
      </div>
    </div>
  );
}
