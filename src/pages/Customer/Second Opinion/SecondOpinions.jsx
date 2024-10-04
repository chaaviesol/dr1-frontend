import React from "react";
import Navbar from "../../../components/Navbar";
import Headroom from "react-headroom";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { BASE_URL } from "../../../config";
import { Loader } from "../../../components/Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

function SecondOpinions() {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const { userId, userType } = auth;

  const fetchCustomerSecondOpinions = async () => {
    const response = await axiosPrivate.get(`${BASE_URL}/secondop/getcusquery`);
    return response.data.data;
  };

  const {
    data: customerQueries,
    isLoading,
    refetch,
  } = useQuery({
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

  return (
    <div>
      <div>
        <Headroom>
          <Navbar />
        </Headroom>

        <div className="container Myquestions">
          {isLoading && <Loader />}
          <div className="myquestionmaintitle">
            <h3>My Expert opinion queries</h3>
          </div>

          {customerQueries &&
            customerQueries.length > 0 &&
            customerQueries.map((query, index) => (
              <div key={query.id} className="myquestionsection flex">
                <div className="myquestionlistboxdata">
                  <div className="myquestionlistboxdataname flex">
                    <div className="myquestionlistboxdatanamesec">
                      <h4 className="myquestiondate">
                        {" "}
                        {moment
                          .utc(query?.created_date)
                          .tz("UTC-12")
                          .format("DD/MM/YYYY hh:mm A")}
                      </h4>
                    </div>
                    <div className="myquestionlistboxdatanamebutton">
                    </div>
                  </div>
                  <div className="myquestionlistboxdataquestion">
                    <h3
                      className="myquestiontitle"
                      style={{ marginTop: ".6vw" }}
                    >
                      Question
                    </h3>
                    <p
                      className="myquestionpara myquestionparasec"
                      style={{
                        color: "#059669",
                        fontSize: "14px",
                        marginTop: ".4vw",
                      }}
                    >
                      Department: {query?.department}
                    </p>
                    <p className="myquestionpara myquestionparasec">
                      {query?.query}
                    </p>

                    {/* Button to toggle answers */}
                    <button
                      className="flex firstbuttonanswer"
                      onClick={() => toggleAnswers(query.id)}
                    >
                      <i className="ri-chat-quote-line"></i>
                      <h4>{query.doctor_remarks.length} Answers</h4>
                      <i
                        className={
                          query.isShowAnswers
                            ? "ri-arrow-down-s-fill"
                            : "ri-arrow-right-s-fill"
                        }
                      ></i>
                    </button>

                    {/* Conditionally render answers based on showAnswers state */}
                    {query.doctor_remarks.length > 0 &&
                      query.doctor_remarks.map(
                        (answer, answerIndex) =>
                          query.isShowAnswers && (
                            <div key={answer.id} className="myanswerssection">
                              <div className="myallanswers flex">
                                <div className="myquestionlistboximg">
                                  <img
                                    src={
                                      answer?.doctorid?.image ||
                                      "/images/dr (4).jpg"
                                    }
                                    alt=""
                                  />
                                </div>
                                <div className="myquestionlistboxdata">
                                  {answer.id === query.doctor_remarksid && (
                                    <>
                                      <h4 className="bestanswerstop">
                                        <i class="ri-medal-2-line"></i>
                                        <span>BEST ANSWER</span>
                                      </h4>
                                    </>
                                  )}
                                  <h3 className="myquestiontitle">
                                    {answer?.doctorid?.name}
                                  </h3>
                                  <h4 className="myquestiondate">
                                    {answer?.doctorid?.education_qualification}{" "}
                                    ,
                                    {moment
                                      .utc(answer?.created_date)
                                      .tz("UTC-12")
                                      .format("DD/MM/YYYY hh:mm A")}
                                  </h4>
                                  <p className="myquestionpara questionparasec">
                                    {answer?.doctor_remarks}
                                  </p>
                                </div>
                              </div>

                              {/* {answer} */}
                              {query.doctor_remarks.length - 1 ===
                                answerIndex && (
                                <button className="loadmoreanswers">
                                  More Answers
                                </button>
                              )}
                            </div>
                          )
                      )}
                  </div>
                  {/* )} */}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SecondOpinions;
