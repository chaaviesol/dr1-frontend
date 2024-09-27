import axios from "axios";
import { port } from "../config";

const BASE_URL = `${port}/user`;


export const customerLogin = async (payload) => {
  const response = await axios.post(`${BASE_URL}/userlogin`, payload);

  return response.data;
};


