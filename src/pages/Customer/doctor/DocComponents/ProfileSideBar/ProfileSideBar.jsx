import React from "react";
import "./ProfileSideBar.css";
import useAuth from "../../../../../hooks/useAuth";
export const ProfileSideBar = ({ data: { SentData, selected } }) => {
  const {auth} = useAuth();
  console.log(auth)
  const FindButtonValue = (data) => {
    SentData(data);
  };
  return (
    <>
      <div className="mainadminsidebar">
        <div
          onClick={() => {
            FindButtonValue("profile");
          }}
          className={
            selected?.profile
              ? "admimmenuicon admimmenuicon2 flex"
              : "admimmenuicon flex"
          }
        >
          <i className="ri-file-chart-fill"></i>
          <h4>Profile</h4>
        </div>

        <div
          onClick={() => {
            FindButtonValue("views");
          }}
          className={
            selected?.views
              ? "admimmenuicon admimmenuicon2 flex"
              : "admimmenuicon flex"
          }
        >
          <i className="fi fi-sr-stethoscope"></i>
          <h4>Views</h4>
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
          <i className="fi fi-sr-users-alt"></i>
          <h4>Feedbacks</h4>
        </div>

        {auth.userType === "doctor" && (
          <div
            onClick={() => {
              FindButtonValue("querylist");
            }}
            className={
              selected?.querylist
                ? "admimmenuicon admimmenuicon2 flex"
                : "admimmenuicon flex"
            }
          >
            <i className="ri-message-2-fill"></i>
            <h4>Queries</h4>
          </div>
        )}
      </div>
    </>
  );
};
