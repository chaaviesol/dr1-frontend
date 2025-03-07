import axios from "axios";
import React from "react";
import { port } from "../../../config";
import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import { toast } from "react-toastify";
import { Loader } from "../../../components/Loader/Loader";
import FeedbackCard from "./FeedbackCard";

export default function Mainadminfeedback() {
  const fetchFeedbacks = async () => {
    const response = await axios.get(`${port}/admin/alltypefeedback`);
    return response.data.data;
  };
  const {
    data: allFeedbacks,
    isLoading: isFeedbacksLoading,
    refetch: refetchFeedbacks,
  } = useQuery({
    queryKey: ["fetchFeedbacks"],
    queryFn: fetchFeedbacks,
  });

  return (
    <div>
      {isFeedbacksLoading && <Loader />}
      <div style={{ marginTop: "1.3vw" }} className="flex admin_view_more">
        <h3>Feedbacks</h3>
        <h4>
          Filter
          <i style={{ marginLeft: "0.5vw" }} class="ri-equalizer-3-line"></i>
        </h4>
      </div>

      <div className="feedbacksection flex">
        {allFeedbacks?.length > 0 &&
          allFeedbacks.map((ele) => (
            // <div key={ele.id} className="feedbacksectioncard">
            //   <div className="feedbacksectioncardtop flex">
            //     <img src="/images/doc.jpg" alt="" />
            //     <div style={{ marginLeft: "10px" }}>
            //       <h3>{ele?.username}</h3>
            //       <h4>{moment(ele?.created_date).format("DD/MM/YYYY")}</h4>
            //     </div>
            //   </div>

            //   <div className="feedbacksectioncardrewiew">
            //     <div className="feedbacksectioncardrewiewstar flex">
            //       <StarRating rating={ele?.rating} />
            //     </div>
            //     <div className="feedbacksectioncardrewiewpara">
            //       <div className="feedbacksectioncardrewiewpara2">
            //         <h4>{ele?.message}</h4>
            //       </div>
            //     </div>
            //   </div>

            //   <div className="feedbacksectioncardbutton flex">
            //     <div className="photoandtitle flex">
            //       <img src="/images/doc.jpg" alt="" />
            //       <h3 style={{ marginLeft: "10px" }}>{ele?.typename}</h3>
            //     </div>

            //     <div className="photoandtitle admin-feedback-buttons-container  flex">
            //       <button
            //         disabled={statusUpdateMutation.isPending}
            //         type="button"
            //         onClick={() =>
            //           statusUpdateMutation.mutate({
            //             id: ele.id,
            //             status: "rejected",
            //             type: ele.type,
            //           })
            //         }
            //       >
            //         Reject
            //       </button>
            //       <button
            //         type="button"
            //         disabled={statusUpdateMutation.isPending}
            //         onClick={() =>
            //           statusUpdateMutation.mutate({
            //             id: ele.id,
            //             status: "accepted",
            //             type: ele.type,
            //           })
            //         }
            //       >
            //         Approve
            //       </button>
            //     </div>
            //   </div>
            // </div>

            <FeedbackCard refetchFeedbacks={refetchFeedbacks} ele={ele} />
          ))}
      </div>
    </div>
  );
}
