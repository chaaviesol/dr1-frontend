import { useState, useEffect } from "react";
import axios from "axios";
import { port } from "../config";

const useFetchViewsAndContacts = (id, type) => {
  const [consultAndViewData, setConsultAndViewData] = useState({
    allData: [],
    consultCount: "",
    viewCount: "",
  });

  useEffect(() => {
    const fetchViewsAndContacts = async () => {
      try {
        const response = await axios.post(`${port}/user/allcount`, {
          id,
          type,
        });
        console.log(response);
        setConsultAndViewData(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchViewsAndContacts();
  }, [id, type]);

  return consultAndViewData;
};

export default useFetchViewsAndContacts;
