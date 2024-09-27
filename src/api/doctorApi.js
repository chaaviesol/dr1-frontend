import axios from "axios";
import { port } from "../config";

const BASE_URL = `${port}/doctor`;

export const fetchFeedbacksAndRating = async (id) => {
  const response = await axios.post(`${BASE_URL}/getadoctorfeedback`, {
    doctor_id: id,
  });
  return response.data;
};
