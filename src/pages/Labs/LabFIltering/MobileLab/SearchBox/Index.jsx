import { React, useState, useEffect, useRef } from "react";
import styles from "./index.module.css";
import { useOutsideClick } from "../../../../../hooks/useOutsideClick";
import { port } from "../../../../../config";
import { toast } from "react-toastify";
import { Loader } from "../../../../../components/Loader/Loader";
import { useDebounce } from "../../../../../hooks/useDebounce";
import axios from "axios";
import { Divider } from "@mui/material";
const Box = ({ updateDocs, docNames }) => {
  const [showSearchList, setShowSearchList] = useState(false);
  const [placeLists, setplaceLists] = useState([]);
  const [searchPlace, setSearchPlace] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [loading, setLoading] = useState(false);
  const [debouncedInputValue, setDebouncedInputValue] = useDebounce(500);

  const boxRef = useRef();

  useEffect(() => {
    const handleSearch = setTimeout(() => {
      const fetchData = async () => {
        try {
          const response = await axios.post(`${port}/doctor/suggest`, {
            searchitem: searchPlace,
          });
          const placeLists = response.data.data;
          if (!placeLists?.length > 0) {
            toast.info("Location not found");
          }
          setplaceLists(placeLists);
        } catch (err) {
          console.error("Error fetching data:", err);
        }
        setShowSearchList(true);
      };
      if (searchPlace) {
        fetchData();
      }
    }, 400);

    return () => clearTimeout(handleSearch);
  }, [searchPlace]);
  console.log(placeLists);

  const handleClickPlace = async (data) => {
    setLoading(true);
    const placeName = `${data.postname}, ${data.district}`;
    setSelectedPlace(placeName);
    setShowSearchList(false);
    try {
      const response = await axios.post(`${port}/lab/pincode_result`, {
        selectedArea_id: data.id,
      });
      const docData = response.data.data;
      console.log({ docData });
      setLoading(false);
      updateDocs(docData); //run function on searchdoc
    } catch (err) {
      setLoading(false);
      toast.info(err?.response?.data?.message);
      console.log(err?.response?.data);
      updateDocs([]); //run function on searchdoc
    }
  };

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };
  const searchNames = (event) => {
    const { value } = event.target;
    docNames(value);
  };
  const debouncedSearchChanges = debounce(searchNames, 500);
  // const searchNames = (event) => {
  //   const { value } = event.target;
  //   setDebouncedInputValue(value);
  // };
  // useEffect(() => {
  //   if (docNames) {
  //     docNames(debouncedInputValue);
  //   }
  // }, [debouncedInputValue]);

  useOutsideClick(() => {
    setShowSearchList(false);
  }, boxRef);

  return (
    // loading ?  <Loader /> :
    <div className={styles.container}>
      <div className={styles.left}>
        <i className="ri-map-pin-2-line" />
        <input
          ref={boxRef}
          onChange={(event) => {
            setSelectedPlace("");
            setSearchPlace(event.target.value);
          }}
          value={selectedPlace || searchPlace}
          placeholder="Search location"
        />
      </div>
      <div className={styles.center}>
        <input
          placeholder="Search Laboratory"
          onChange={debouncedSearchChanges}
          type="text"
        />
      </div>
      <div className={styles.right}>
        <div>
          <i className="ri-search-2-line" />
        </div>
      </div>
      {showSearchList && (
        <div className={styles.placeContainer}>
          <div className={styles.data}>
            {placeLists.map((data, index) => (
              <>
                <div
                  key={index}
                  onClick={() => handleClickPlace(data)}
                  className={styles.places}
                >
                  {data?.postname}, {data?.district}
                </div>
                <Divider />
              </>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Box;
