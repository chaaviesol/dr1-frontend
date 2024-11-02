import React, { useContext, useState } from "react";
import styles from "./styles.module.css";
import ClickToSearchBox from "../components/ClickToSearchBox/ClickToSearchBox";
import ClickableNavigationIcon from "../components/ClickableNavigationIcon";
import { Modal } from "@mui/material";
import { MyContext } from "../../../../contexts/Contexts";

function Community() {
  const [isOpenQueryModal, setOpenQueryModal] = useState(false);
  const { Categories } = useContext(MyContext);

  const speacializationNames = Categories?.allopathySpecs;
  return (
    <>
      <div
        className={`${styles.maincontainer}avoidbottombar`}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <div className={styles.top}>
          <div>
            <ClickToSearchBox placeholder="Search a query or blog" />
          </div>
          <div>
            <ClickableNavigationIcon icon="ri-questionnaire-line" />
          </div>
        </div>

        <div className={styles.blogsection}>
          <span>Blog section coming soon</span>
        </div>
        <div className={styles.addquery}>
          <button onClick={() => setOpenQueryModal(true)}>Add query</button>
        </div>
      </div>

      {/* add query modal */}

      <Modal open={isOpenQueryModal} onClose={() => setOpenQueryModal(false)}>
        <div className={styles.addquerymobmodal}>
          <h3>Add Query</h3>

          <div>
            <select>
              <option value="">Select Discipline</option>
              {speacializationNames&&speacializationNames.length>0&& speacializationNames.map((specialization) => (
                <option value={specialization}>{specialization}</option>
              ))}
            </select>
          </div>

          <textarea name="" id="" placeholder="Type your query"></textarea>
          <div className={`${styles.addmobquerybtn} flex`}>
            <button onClick={()=>setOpenQueryModal(false)}>Cancel</button>
            <button>Submit</button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Community;
