import React from "react";
import Navbar from "../../../components/Navbar";
import Headroom from "react-headroom";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { BASE_URL } from "../../../config";
import { Loader } from "../../../components/Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { Link, Outlet, useNavigate } from "react-router-dom";
import BackButtonWithTitle from "../../../components/BackButtonWithTitle";

function SecondOpinions() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { userId, userType } = auth;

  const fetchCustomerSecondOpinions = async () => {
    const response = await axiosPrivate.get(
      `${BASE_URL}/secondop/getcussecondop`
    );
    return response.data.data;
  };

  const { data: customerSecondOpinions, isLoading } = useQuery({
    queryKey: ["fetchCustomerSecondOpinions", userId],
    queryFn: fetchCustomerSecondOpinions,
    enabled: !!userId && userType === "customer",
  });

  const toggleAnswers = (id) => {
    // setShowAnswers(!showAnswers);
    // setCustomerQueryData((prevItems) =>
    //   prevItems.map((item) =>
    //     item.id === id ? { ...item, isShowAnswers: !item.isShowAnswers } : item
    //   )
    // );
  };

  const handleNavigate = (id) => {
    navigate("/mysecondopinions/detailed", {
      state: {
        id: id,
      },
    });
  };

  return (
    <div>
      <div>
        <div className="careerformnav">
          <Headroom>
            <Navbar />
          </Headroom>
        </div>

        <div className="careerformbackbtn mobilescreen-container">
          <BackButtonWithTitle title="My Expert opinion queries" />
        </div>

        <div className="container Myquestions">
          {isLoading && <Loader />}
          {/* <div className="myquestionmaintitle" style={{ marginBottom: "2rem" }}>
            <h3>My Expert opinion queries</h3>
          </div> */}

          {customerSecondOpinions &&
            customerSecondOpinions.length > 0 &&
            customerSecondOpinions.map((query, index) => (
              <div
                key={query.id}
                className="myquestionsection flex"
                style={{
                  // marginTop: "2rem",
                  marginBottom: ".5rem",
                  cursor: "pointer",
                  position: "relative",
                }}
                onClick={() => handleNavigate(query.id)}
              >
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    color: "white",
                    fontWeight: 400,
                    fontSize: "14px",
                    textTransform: "capitalize",
                    backgroundColor:
                      query.status === "submitted" ? "#7e83ff" : "#2a9d8f",
                    padding: ".5rem",
                    paddingLeft: "1.2rem",
                    borderTopLeftRadius: "50px",
                    borderBottomLeftRadius: "50px",
                  }}
                >
                  {query.status}
                </div>
                <div className="myquestionlistboxdata">
                  <div className="myquestionlistboxdataname flex">
                    <div className="myquestionlistboxdatanamesec">
                      <h3
                        className="myquestiontitle"
                        style={{ marginTop: ".6vw" }}
                      >
                        {query?.patient_name}
                      </h3>
                      <h4 className="myquestiondate">
                        {" "}
                        {moment
                          .utc(query?.created_date)
                          .tz("Etc/GMT+12")
                          .format("DD/MM/YYYY hh:mm A")}
                      </h4>
                    </div>
                    <div className="myquestionlistboxdatanamebutton"></div>
                  </div>
                  <div className="myquestionlistboxdataquestion">
                    <p
                      className="myquestionpara myquestionparasec"
                      style={{
                        color: "#059669",
                        fontSize: "14px",
                        marginTop: ".4vw",
                      }}
                    >
                      Discipline: {query?.department}
                    </p>
                    <p className="myquestionpara myquestionparasec">
                      {query?.query}
                    </p>
                    <h3
                      className="myquestiontitle"
                      style={{ marginTop: ".6vw" }}
                    >
                      Remarks
                    </h3>
                    <p className="myquestionpara myquestionparasec">
                      {query?.remarks}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SecondOpinions;
