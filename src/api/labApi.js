import axios from "axios";
import { port } from "../config";

const BASE_URL = `${port}/lab`;

export const fetchFeedbacksAndRating = async (id) => {
  const response = await axios.post(`${BASE_URL}/getalabfeedback`, {
    lab_id: id,
  });
  return response.data;
};
