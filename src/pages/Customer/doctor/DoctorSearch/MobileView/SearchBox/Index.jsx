import { React, useState, useEffect, useRef } from "react";
import styles from "./index.module.css";
import { useOutsideClick } from "../../../../../../hooks/useOutsideClick";
import { port } from "../../../../../../config";
import { toast } from "react-toastify";
import axios from "axios";
import { Divider } from "@mui/material";

const Box = ({ updateDocs, docNames }) => {
  const [showSearchList, setShowSearchList] = useState(false);
  const [placeLists, setplaceLists] = useState([]);
  const [searchPlace, setSearchPlace] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [loading, setLoading] = useState(false);

  const boxRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${port}/doctor/suggest`, {
          searchitem: searchPlace,
        });
        const placeLists = response.data.data;
        setplaceLists(placeLists);
        setShowSearchList(placeLists?.length > 0);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    const handleSearch = setTimeout(() => {
      if (searchPlace) {
        fetchData();
      }
    }, 500);

    return () => clearTimeout(handleSearch);
  }, [searchPlace]);
  console.log(placeLists);

  const handleClickPlace = async (data) => {
    setLoading(true);
    const placeName = `${data.postname}, ${data.district}`;
    setSelectedPlace(placeName);
    setShowSearchList(false);
    try {
      const response = await axios.post(`${port}/doctor/get_pincode`, {
        selectedArea_id: data.id,
      });
      const docData = response.data.data;
      console.log({ docData });
      setLoading(false);
      updateDocs(docData); //run function on searchdoc
    } catch (err) {
      console.error(err);
      updateDocs([]); //run function on searchdoc
    } finally {
      setLoading(false);
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
          placeholder="Search doctor"
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
