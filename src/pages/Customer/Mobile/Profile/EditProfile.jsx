import React, { useEffect, useState } from "react";
import "./editprofile.css";
import BackButtonWithTitle from "../../../../components/BackButtonWithTitle";
import { useTabBarContext } from "../../../../contexts/MobileScreen/TabBarProvider";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../../../api/PrivateAxios/axios";
import { BASE_URL, PHARMACY_URL } from "../../../../config";
import { toast } from "react-toastify";

function EditProfile() {
  const { setActiveTab } = useTabBarContext();
  const [userdata, setUserdata] = useState({});
  const [loader, setLoader] = useState(false);
  console.log({ userdata });
  const navigate = useNavigate();
  const fetch = async () => {
    const getaxios = await axiosPrivate.post(`${PHARMACY_URL}/user/getprofile`);
    setUserdata(getaxios.data.data);
  };
  const today = new Date();
  const fiveYearsAgo = new Date(today.setFullYear(today.getFullYear() - 5));
  useEffect(() => {
    setActiveTab("profile");
    fetch();
  }, []);

  const handleonchange = (e) => {
    const { name, value } = e.target;
    if (name === "pincode" && value.length > 6) {
      return;
    }

    setUserdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleKeyPress = (event) => {
    if (
      event?.key === "." ||
      event?.key === "-" ||
      event?.key === "e" ||
      event?.key === "+" ||
      event?.key === "E"
    ) {
      event.preventDefault();
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setUserdata((prevState) => ({
        ...prevState,
        image: event.target.files[0],
      }));
    }
  };

  const onSave = async () => {
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    if (!userdata.name || userdata.name.trim() === "") {
      toast.error("Name is missing");
      return;
    }
    if (!userdata.gender) {
      toast.error("Gender is missing");
      return;
    }
    if (!userdata.ageGroup) {
      toast.error("Date of Birth is missing");
      return;
    }
    if (!pincodeRegex.test(userdata.pincode)) {
      toast.error("Please enter a valid 6-digit pincode.");
      return;
    }
    if (!userdata.pincode || userdata.pincode.trim() === "") {
      toast.error("Pincode is missing");
      return;
    }
    if (!userdata.image || userdata.image.length === 0) {
      toast.error("Please attach at least one report");
      return;
    }

    try {
      setLoader(true);
      const formData = new FormData();
      formData.append("image", userdata.image);

      formData.append("data", JSON.stringify(userdata));
      console.log({ formData });
      const response = await axiosPrivate.post(
        `${BASE_URL}/user/edituser`,
        formData
      );

      if (response.status === 200) {
        toast.success(response.data.message, { autoClose: 3000 });

        setTimeout(() => {
          setUserdata({
            name: "",
            gender: "",
            ageGroup: "",
            pincode: "",
            image: [],
          });
          setLoader(false);
          navigate("/");
        }, 3000);
      } else {
        toast.error(response.data.message || "Failed to submit details.");
        setLoader(false);
      }
    } catch (error) {
      toast.error("An error occurred while submitting the details.");
      setLoader(false);
    }
  };

  return (
    <div className="mobilescreen-container">
      <div onClick={() => navigate(-1)}>
        <BackButtonWithTitle title="Edit profile" />
      </div>

      <div className="editimagemob flex ">
        <div className="editimagemobdiv">
          <img
            alt=""
            src={
              userdata.image &&
              typeof userdata.image === "object" &&
              userdata.image instanceof File
                ? URL.createObjectURL(userdata.image)
                : userdata.image
            }
          />
          {/* <img src={userdata?.image || "./images/man.jpg"} alt="" /> */}
          <div
            className="editimagemobicon flex"
            onClick={() => document.getElementById("fileInput").click()}
          >
            {" "}
            <i class="ri-ball-pen-fill"></i>
          </div>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            multiple
            style={{ display: "none" }}
            accept=".png, .jpg, .jpeg"
          />
        </div>
      </div>

      <div className="editformmob">
        <div>
          <h4>Name</h4>
          <input
            type="text"
            placeholder="Name"
            name="name"
            maxLength={30}
            onChange={handleonchange}
            value={userdata?.name}
          />
        </div>

        <div>
          <h4>Gender</h4>
          <select
            value={userdata?.gender || ""}
            name="gender"
            onChange={handleonchange}
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div>
          <h4>Date of birth</h4>
          <input
            type="date"
            id="date"
            name="ageGroup"
            onChange={handleonchange}
            value={userdata.ageGroup}
            max={fiveYearsAgo.toISOString().split("T")[0]}
          />
        </div>

        <div>
          <h4>Pincode</h4>
          <input
            type="number"
            onChange={handleonchange}
            value={userdata?.pincode}
            name="pincode"
            maxLength="6"
            onKeyDown={handleKeyPress}
          />
        </div>

        <button onClick={onSave}>Save</button>
      </div>
    </div>
  );
}

export default EditProfile;
