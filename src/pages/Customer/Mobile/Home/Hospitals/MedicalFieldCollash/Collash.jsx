import React, { useContext } from "react";
import styles from "./styles.module.css";
import Item from "./items/Item";
import { useNavigate } from "react-router-dom";
const img1 = "./images/mobile/field4.webp";
const img2 = "./images/mobile/field2.webp";
const img3 = "./images/mobile/field3.webp";
const img4 = "./images/mobile/field1.webp";

function Collash() {


  const navigate = useNavigate();

  const handleSelectType = (type) => {
    navigate("/hospitalfilter", { state: { type: type } });
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.firstColumn}>
          <Item
            onClick={() => handleSelectType("Allopathy")}
            img={img1}
            text="Allopathy"
          />
          <Item
            onClick={() => handleSelectType("Homeopathy")}
            img={img2}
            text="Homeopathy"
          />
        </div>
        <div className={styles.secondColumn}>
          <Item
            onClick={() => handleSelectType("Ayurvedic")}
            img={img3}
            text="Ayurvedic"
          />
          <Item
            onClick={() => handleSelectType("Others")}
            img={img4}
            text="Others"
          />
        </div>
      </div>
    </>
  );
}

export default Collash;
