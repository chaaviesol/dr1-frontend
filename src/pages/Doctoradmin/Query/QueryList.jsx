import { CircularProgress, Modal } from "@mui/material";
import React, { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { BASE_URL } from "../../../config";
import { useMutation, useQuery } from "@tanstack/react-query";
import "./querylist.css";
import { Loader } from "../../../components/Loader/Loader";
import { toast } from "react-toastify";
import moment from "moment-timezone";

function QueryList({ docId, userType }) {
  const [isModalOpen, setIsModalOpen] = useState({
    addAnswer: false,
    editAnswer: false,
  });
  const [viewManager, setViewManager] = useState({
    queries: true,
    answers: false,
  });
  const [form, setForm] = useState({
    doctorAnswer: { answer: "", queryId: "" },
    editedDoctorAnswer: { answer: "", remarksId: "" },
  });

  const [currentAnsweringQuery, setCurrentAnsweringQuery] = useState();

  const axiosPrivate = useAxiosPrivate();

  const IscloseModal = () => {
    setIsModalOpen({ editAnswer: false, addAnswer: false });
    resetForm();
  };

  const fetchDoctorQueries = async () => {
    const response = await axiosPrivate.get(`${BASE_URL}/secondop/getqueries`);

    return response.data;
  };

  const {
    data: doctorQueries,
    refetch: refetchDoctorQueries,
    isLoading: isDoctorQueriesAndAnswersFetching,
  } = useQuery({
    queryKey: ["fetchDoctorQueries", docId],
    queryFn: () => fetchDoctorQueries(),
    enabled: !!docId && userType === "doctor",
  });

  const viewMyAnswers = () => {
    setViewManager({
      queries: false,
      answers: true,
    });
  };

  const resetForm = () => {
    setForm({
      doctorAnswer: { answer: "", queryId: "" },
      editedDoctorAnswer: { answer: "", queryId: "" },
    });

    //also rseset current answering id,editing text

    setCurrentAnsweringQuery("");
  };

  const answerAQuery = async () => {
    const payload = {
      id: form.doctorAnswer.queryId,
      doctor_remarks: form.doctorAnswer.answer,
      status: "answered",
    };
    console.log({ payload });
    return await axiosPrivate.post(
      `${BASE_URL}/secondop/adddocremarks`,
      payload
    );
  };
  const answerAQueryMutation = useMutation({
    mutationKey: ["answerAQuery", form.doctorAnswer.queryId],
    mutationFn: () => answerAQuery(),
    onSuccess: ({ data }) => {
      resetForm();
      toast.success(data.message);
      refetchDoctorQueries();
      IscloseModal();
    },
    onError: (error) => {
      toast.error(
        `Error: ${error.response?.data?.message || "Something went wrong"}`
      );
    },
  });

  //submiting the answer
  const handleAnswerSubmit = async () => {
    answerAQueryMutation.mutateAsync();
  };

  //entering answer
  const handleAnswerChanges = (e) => {
    const { value, name } = e.target;
    if (name === "edit") {
      setForm((prevForm) => ({
        ...prevForm,
        editedDoctorAnswer: {
          answer: value,
          remarksId: prevForm.editedDoctorAnswer.remarksId,
        },
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        doctorAnswer: { answer: value, queryId: currentAnsweringQuery },
      }));
    }
  };

  //edit a answer

  const editAnAnswer = async () => {
    const payload = {
      remarkid: form.editedDoctorAnswer.remarksId,
      doctor_remarks: form.editedDoctorAnswer.answer,
    };
    console.log({ payload });
    return await axiosPrivate.post(`${BASE_URL}/secondop/editremarks`, payload);
  };
  const editAnAnswerMutation = useMutation({
    mutationKey: ["editAnAnswer", form.editedDoctorAnswer.remarksId],
    mutationFn: () => editAnAnswer(),
    onSuccess: ({ data }) => {
      resetForm();
      toast.success(data.message);
      refetchDoctorQueries();
      IscloseModal();
    },
    onError: (error) => {
      toast.error(
        `Error: ${error.response?.data?.message || "Something went wrong"}`
      );
    },
  });
  console.log("formdata", form);
  return (
    <div style={{ padding: "1rem 2rem" }}>
      {isDoctorQueriesAndAnswersFetching && <Loader />}
      {viewManager.queries && (
        <>
          <div
            className="flex mainadminquestiontitle"
            style={{ marginBottom: "1.3vw", marginTop: "1.3vw" }}
          >
            <h3>Questions</h3>
            <button onClick={viewMyAnswers}>My Answers</button>
          </div>

          {doctorQueries?.questions &&
            doctorQueries?.questions?.length > 0 &&
            doctorQueries.questions.map((question) => (
              <div key={question.id} className="questionlistbox flex">
                <div className="questionlistboximg">
                  <img
                    src={question?.users?.image || "../images/man.jpg"}
                    alt=""
                  />
                </div>
                <div className="questionlistboxdata">
                  <div className="questionlistboxdataname flex">
                    <div className="questionlistboxdatanamesec">
                      <h3 className="questiontitle">{question?.users?.name}</h3>
                      <h4 className="questiondate">
                        {" "}
                        {moment
                          .utc(question?.created_date)
                          .tz("UTC-12")
                          .format("DD/MM/YYYY hh:mm A")}
                      </h4>
                    </div>
                    <div className="questionlistboxdatanamebutton">
                      <button
                        disabled={answerAQueryMutation.isPending}
                        onClick={() => {
                          setIsModalOpen({
                            ...isModalOpen,
                            addAnswer: !isModalOpen.addAnswer,
                          });
                          setCurrentAnsweringQuery(question.id);
                        }}
                      >
                        Answer Now
                      </button>
                    </div>
                    <Modal
                      open={isModalOpen.addAnswer}
                      onClose={() =>
                        setIsModalOpen({ ...isModalOpen, addAnswer: false })
                      }
                    >
                      <div className="addanswermodal">
                        <h3 className="questiontitle">Type Your Answer</h3>

                        <textarea
                          className="questionpara"
                          name="doctorAnswer"
                          id=""
                          onChange={handleAnswerChanges}
                          maxLength={1000}
                        ></textarea>
                        <button
                          className="addanswermodalbutton"
                          onClick={handleAnswerSubmit}
                        >
                          {answerAQueryMutation.isPending ? (
                            <CircularProgress size="1.5rem" />
                          ) : (
                            "      Submit"
                          )}
                        </button>
                        <button
                          onClick={IscloseModal}
                          className="flex answermodal"
                        >
                          <i class="ri-close-line"></i>
                        </button>
                      </div>
                    </Modal>
                  </div>
                  <div className="questionlistboxdataquestion">
                    <h3 className="questiontitle" style={{ marginTop: ".6vw" }}>
                      Question
                    </h3>
                    <p
                      className="questionpara questionparasec"
                      style={{
                        color: "#059669",
                        fontSize: "14px",
                        marginTop: ".4vw",
                      }}
                    >
                      Discipline : {question.department}
                    </p>
                    <p className="questionpara questionparasec">
                      {question?.query}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </>
      )}
      {viewManager.answers && (
        <>
          <div
            style={{
              display: "flex",
              marginBottom: "1.3vw",
              marginTop: "1.3vw",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <button
              className="adpha-back-button"
              onClick={() =>
                setViewManager({
                  queries: true,
                  answers: false,
                })
              }
            >
              <i className="ri-arrow-left-line"></i>
            </button>

            <div className="mainadminquestiontitle">
              <h3>My Answers</h3>
            </div>
          </div>

          {doctorQueries?.myanswers &&
            doctorQueries?.myanswers?.length > 0 &&
            doctorQueries.myanswers.map((answer, index) => (
              <div key={answer.id} className="questionlistbox flex">
                <div className="questionlistboximg">
                  <img src="../images/man.jpg" alt="" />
                </div>
                <div className="questionlistboxdata">
                  <div className="questionlistboxdataname flex">
                    <div className="questionlistboxdatanamesec">
                      <h3 className="questiontitle">{answer?.users?.name}</h3>
                      <h4 className="questiondate">
                        {moment
                          .utc(answer?.created_date)
                          .tz("UTC-12")
                          .format("DD/MM/YYYY hh:mm A")}
                      </h4>
                    </div>
                    <div className="questionlistboxdatanamebutton">
                      <button
                        onClick={() => {
                          setIsModalOpen({
                            ...isModalOpen,
                            editAnswer: !isModalOpen.editAnswer,
                          });
                          setForm((prevForm) => ({
                            ...prevForm,
                            editedDoctorAnswer: {
                              answer: answer.doctor_remarks,
                              remarksId: answer?.doctor_remarksid,
                            },
                          }));
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                  <div className="questionlistboxdataquestion">
                    <p
                      className="questionpara questionparasec"
                      style={{
                        color: "#059669",
                        fontSize: "14px",
                        marginTop: ".4vw",
                      }}
                    >
                      {answer?.department}
                    </p>
                    <h3 className="questiontitle" style={{ marginTop: ".6vw" }}>
                      Question
                    </h3>

                    <p className="questionpara questionparasec">
                      {answer?.query}
                    </p>

                    <h3 className="questiontitle" style={{ marginTop: ".6vw" }}>
                      My Answer
                    </h3>
                    <p className="questionpara questionparasec">
                      {answer?.doctor_remarks}
                    </p>
                  </div>
                </div>

                <Modal
                  open={isModalOpen.editAnswer}
                  onClose={() =>
                    setIsModalOpen({ addAnswer: false, editAnswer: false })
                  }
                >
                  <div className="addanswermodal">
                    <h3 className="questiontitle">Edit Your Answer</h3>

                    <textarea
                      className="questionpara"
                      name="edit"
                      id=""
                      value={form?.editedDoctorAnswer?.answer ?? ""}
                      onChange={handleAnswerChanges}
                    ></textarea>
                    <button
                      disabled={editAnAnswerMutation.isPending}
                      className="addanswermodalbutton"
                      onClick={() => editAnAnswerMutation.mutateAsync()}
                    >
                      Submit
                    </button>
                    <button onClick={IscloseModal} className="flex answermodal">
                      <i class="ri-close-line"></i>
                    </button>
                  </div>
                </Modal>
              </div>
            ))}
        </>
      )}
    </div>
  );
}

export default QueryList;
