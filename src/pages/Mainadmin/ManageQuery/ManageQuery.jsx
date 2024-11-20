import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { BASE_URL } from "../../../config";
import "./styles.css";
import moment from "moment-timezone";
import { Loader } from "../../../components/Loader/Loader";
import { toast } from "react-toastify";
function ManageQuery({ queryId, setChangeDashboards }) {
  const axiosPrivate = useAxiosPrivate();
  const fetchQueryDetails = async (id) => {
    const response = await axiosPrivate.post(`${BASE_URL}/secondop/getaquery`, {
      id: id,
    });
    return response.data.data;
  };

  const {
    data: queryData,
    isLoading: isQueryDataFetching,
    refetch: refetchQueryData,
  } = useQuery({
    queryKey: ["fetchQueryDetails", queryId],
    queryFn: () => fetchQueryDetails(queryId),
  });

  const selectNewBestAnswer = async (id) => {
    const payload = {
      id: queryId,
      doctor_remarksid: id,
      status: "",
    };
    console.log(payload);
    const response = await axiosPrivate.post(
      `${BASE_URL}/secondop/queryupdate`,
      payload
    );

    return response.data;
  };

  const selectNewBestAnswerMutation = useMutation({
    mutationKey: ["selectNewBestAnswer"],
    mutationFn: (id) => selectNewBestAnswer(id),
    onSuccess: (data) => {
      refetchQueryData();
      toast.success(data?.message);
    },
  });

  console.log(queryData);

  const handleChooseBestAnswer = (id) => {
    //function run only if button is choose as best answer
    const isFunctionShouldRun = queryData.doctor_remarksid !== id;

    if (isFunctionShouldRun) {
      selectNewBestAnswerMutation.mutateAsync(id);
    }
  };

  const handleBack = () => {
    setChangeDashboards({ viewQuery: true });
  };

  return (
    <div style={{ marginTop: "1.3vw" }}>
      <div
        style={{
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <button onClick={handleBack} className="adpha-back-button">
          <i className="ri-arrow-left-line"></i>
        </button>
        <h3>Questions & Answers</h3>
      </div>
      {isQueryDataFetching ||
        (selectNewBestAnswerMutation.isPending && <Loader />)}
      <div className="questionsection flex">
        <div className="questionlistboximg">
          <img src={queryData?.users?.image || "../images/man.jpg"} alt="" />
        </div>
        <div className="questionlistboxdata">
          <div className="questionlistboxdataname flex">
            <div className="questionlistboxdatanamesec">
              <h3 className="questiontitle">{queryData?.users?.name}</h3>
              <h4 className="questiondate">
                {" "}
                {moment
                  .utc(queryData?.created_date)
                  .tz("UTC-12")
                  .format("DD/MM/YYYY hh:mm A")}
              </h4>
            </div>
            <div className="questionlistboxdatanamebutton">
              <button style={{ backgroundColor: "green" }}>
                Mark as completed
              </button>
            </div>
          </div>
          <div className="questionlistboxdataquestion">
            <h3 className="questiontitle" style={{ marginTop: ".6vw" }}>
              Question
            </h3>
            <p
              className="questionpara questionparasec"
              style={{ color: "#059669", fontSize: "14px", marginTop: ".4vw" }}
            >
              Discipline : {queryData?.department}
            </p>
            <p className="questionpara questionparasec">{queryData?.query}</p>
          </div>
        </div>
      </div>
      <div className="answersection">
        <h3 className="questiontitle" style={{ marginBottom: "1.3vw" }}>
          All Answers
        </h3>
        {queryData?.doctor_remarks.map((remark, index) => (
          <div key={remark.id} className="questionlistbox flex">
            <div className="questionlistboximg">
              <img
                src={remark?.doctorid?.image || "/images/dr (3).webp"}
                alt=""
              />
            </div>
            <div className="questionlistboxdata">
              <div className="questionlistboxdataname flex">
                <div className="questionlistboxdatanamesec">
                  <h3 className="questiontitle">{remark?.doctorid?.name}</h3>
                  <h4 className="questiondate">
                    {" "}
                    {moment
                      .utc(remark?.created_date)
                      .tz("UTC-12")
                      .format("DD/MM/YYYY hh:mm A")}
                  </h4>
                </div>
                <div className="questionlistboxdatanamebutton">
                  <button
                    disabled={selectNewBestAnswerMutation.isPending}
                    onClick={() => handleChooseBestAnswer(remark.id)}
                    className="bestanswer"
                    id="bestanswer"
                  >
                    {queryData.doctor_remarksid === remark.id
                      ? " Best Answer"
                      : "Choose as Best Answer"}
                  </button>
                </div>
              </div>
              <div className="questionlistboxdataquestion">
                <h3 className="questiontitle" style={{ marginTop: ".6vw" }}>
                  Answer
                </h3>
                <p className="questionpara questionparasec">
                  {remark?.doctor_remarks}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageQuery;
