import React, { useContext, useState } from "react";
import styles from "./styles.module.css";
import ClickToSearchBox from "../components/ClickToSearchBox/ClickToSearchBox";
import ClickableNavigationIcon from "../components/ClickableNavigationIcon";
import { Modal } from "@mui/material";
import { MyContext } from "../../../../contexts/Contexts";
import { toast } from "react-toastify";
import { axiosPrivate } from "../../../../api/PrivateAxios/axios";
import { BASE_URL } from "../../../../config";
import { Loader } from "../../../../components/Loader/Loader";
import useAuth from "../../../../hooks/useAuth";
function Community() {
  const [isOpenQueryModal, setOpenQueryModal] = useState(false);
  const { Categories } = useContext(MyContext);
  const [formData, setFormData] = useState({ department: "", query: "" });
  const speacializationNames = Categories?.allopathySpecs;
  const [loader, setLoader] = useState(false);
  const { auth } = useAuth();
  const handleNavigate = () => {
    if (auth.userId && auth.userType === "customer") {
      setOpenQueryModal(true);
    } else {
      toast.info("login to continue");
    }
  };
  const handleSubmit = async () => {
    const { department, query } = formData;
    if (!department || department === "") {
      toast.info("Discipline is missing");
      return;
    }
    if (!query) {
      toast.error("Please enter your queries.");
      return;
    }

    try {
      setLoader(true);

      const response = await axiosPrivate.post(
        `${BASE_URL}/secondop/addquery`,
        formData
      );
      if (response.status === 200) {
        setLoader(false);
        toast.success("Details submitted successfully!", {
          autoClose: 3000,
        });

        setFormData({
          query: "",
          department: "",
        });
        setOpenQueryModal(false);
      } else if (response.status === 400) {
        toast.error(response.data.message);
        setLoader(false);
      } else {
        toast.error("Failed to submit details.");
        setLoader(false);
      }
    } catch (error) {
      toast.error("An error occurred while submitting the details.");
      setLoader(false);
    }
  };
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
          <button onClick={handleNavigate}>
            <i className="ri-add-circle-line"></i>
            Add query
          </button>
        </div>
      </div>

      {/* add query modal */}

      <Modal open={isOpenQueryModal} onClose={() => setOpenQueryModal(false)}>
        <div className={styles.addquerymobmodal}>
          {loader ? <Loader /> : ""}
          <h3>Add Query</h3>

          <div>
            <select
              value={formData.department}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
            >
              <option value="">Select Discipline</option>
              {speacializationNames &&
                speacializationNames.length > 0 &&
                speacializationNames.map((specialization, index) => (
                  <option key={index} value={specialization}>
                    {specialization}
                  </option>
                ))}
              <option value="Not Sure">Not Sure</option>          
            </select>
          </div>

          <textarea
            value={formData.query}
            onChange={(e) =>
              setFormData({ ...formData, query: e.target.value })
            }
            placeholder="Type your query"
          ></textarea>
          <div className={`${styles.addmobquerybtn} flex`}>
            <button
              onClick={() => {
                setOpenQueryModal(false);
                setFormData({
                  query: "",
                  department: "",
                });
              }}
            >
              Cancel
            </button>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Community;
