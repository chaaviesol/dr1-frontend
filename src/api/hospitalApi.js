import axios from "axios";
import { port } from "../config";

const BASE_URL = `${port}/hospital`;

export const fetchFeedbacksAndRating = async (id) => {
  const response = await axios.post(`${BASE_URL}/getahospitalfeedback`, {
    hospital_id: id,
  });
  return response.data;
};
export const fetchDoctorAvailability = async (id) => {
  const response = await axios.post(`${BASE_URL}/consultationdata`, {
    id: id,
  });
  return response.data;
};
