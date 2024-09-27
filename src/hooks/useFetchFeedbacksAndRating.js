import { useQuery } from "@tanstack/react-query";
import { fetchFeedbacksAndRating as fetchHospitalFeedbacksAndRating } from "../api/hospitalApi";
import { fetchFeedbacksAndRating as fetchDoctorFeedbacksAndRating } from "../api/doctorApi";
import { fetchFeedbacksAndRating as fetchLabFeedbacksAndRating } from "../api/labApi";

function useFetchFeedbacksAndRating({ type, id }) {
  let queryFn;

  if (type === "hospital") {
    queryFn = fetchHospitalFeedbacksAndRating;
  } else if (type === "doctor") {
    queryFn = fetchDoctorFeedbacksAndRating;
  } else if (type === "lab") {
    queryFn = fetchLabFeedbacksAndRating;
  } else {
    throw new Error(`Unsupported type: ${type}`);
  }

  const { data: feedbacks } = useQuery({
    queryKey: ["fetchFeedbacksAndRatings", type, id],
    queryFn: () => queryFn(id),
  });
  return feedbacks;
}

export default useFetchFeedbacksAndRating;
