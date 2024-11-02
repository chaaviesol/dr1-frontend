import React, { useEffect, useState } from "react";
import "../User/userprofile.css";
import Headroom from "react-headroom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CustomSelect from "../../components/EditProfile/Editps";
import { BASE_URL } from "../../config";
import { axiosPrivate } from "../../api/PrivateAxios/axios";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-toastify";
export default function Userprofile() {
  const [state, setState] = useState({
    name: "",
    gender: "",
    pincode: "",
    image: "",
    ageGroup: "",
  });
  console.log({ state });
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();


  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setState((prevState) => ({
        ...prevState,
        image: event.target.files[0],
      }));
    }
  };
  const handleSelectChange = (name, value) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const inputchange = (event) => {
    const { name, value } = event.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const gender = ["Male", "Female", "Other"];
  const today = new Date();
  const fiveYearsAgo = new Date(today.setFullYear(today.getFullYear() - 5));

  const savebutton = async () => {
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    if (!state.name) {
      toast.error("Please enter your name");
      return;
    }
    if (!state.gender) {
      toast.error("Please select your gender");
      return;
    }
    if (!state.ageGroup) {
      toast.error("Please select your age group");
      return;
    }

    // Validate pincode
    if (!pincodeRegex.test(state.pincode)) {
      toast.error("Please enter a valid 6-digit pincode.");
      return;
    }
    try {
      setLoader(true);
      const formData = new FormData();
      formData.append("image", state.image);

      formData.append("data", JSON.stringify(state));
      console.log({ formData });
      const response = await axiosPrivate.post(
        `${BASE_URL}/user/edituser`,
        formData
      );
      console.log({ response });
      if (response.status === 200) {
        toast.success("Details updated successfully");
        setTimeout(() => {
          setState({
            name: "",
            gender: "",
            pincode: "",
            image: "",
            ageGroup: "",
          });
          setLoader(false);
          navigate("/");
        }, 3000);
      } else if (response.status === 201) {
        toast.error("You haven't made any updates.", {
          autoClose: 3000,
        });

        setLoader(false);
      }
    } catch (error) {
      toast.error("An error occurred while submitting the details.");
      setLoader(false);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoader(true);
      try {
        const response = await axiosPrivate.post(`${BASE_URL}/user/getprofile`);
        const data = response?.data?.userDetails;

        setState({
          name: data?.name || "",
          gender: data?.gender || "",
          pincode: data?.pincode || "",
          image: data?.image || "",
          ageGroup: data?.ageGroup || "",
        });
      } catch (err) {
        console.error("Error fetching user profile:", err);
      } finally {
        setLoader(false);
      }
    };

    fetchUserProfile();
  }, []);

  const cancelButton = () => {
    navigate(-1);
    setState({
      name: "",
      gender: "",
      pincode: "",
      image: [],
      ageGroup: "",
    });
  };

  return (
    <div>
      <Headroom>
        <Navbar />
      </Headroom>
      <div className="container-third">
        {loader ? <Loader /> : ""}

        <div className="editing-section flex">
          <div>
            <div className="photo-section flex">
              <img
                alt=""
                src={
                  state.image &&
                  typeof state.image === "object" &&
                  state.image instanceof File
                    ? URL.createObjectURL(state.image)
                    : state.image
                }
              />

              {/* <button onClick={handleButtonClick}>Add New Photo</button> */}

              <div
                className="photo-sectionButtonUser"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  htmlFor="fileInput"
                >
                  <h4
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Add New Photo
                  </h4>
                </label>
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
          </div>

          <div className="editing-data-section">
            <h2>
              Edit Your <span className="color-blue">Profile</span>
            </h2>
            <div className="editing-input-section">
              <div className="flex editing-input-label1">
                <div className="editing-input-label">
                  <h4>Name</h4>
                  <input
                    value={state?.name}
                    name="name"
                    onChange={inputchange}
                    type="text"
                    maxLength={40}
                  />
                </div>

                <div className="editing-input-label">
                  <h4>Gender</h4>
                  <CustomSelect
                    value={state?.gender}
                    onChange={(value) => handleSelectChange("gender", value)}
                    placeholder="Select gender"
                    options={gender}
                  />
                </div>
              </div>

              <div className="flex editing-input-label1">
                <div className="editing-input-label">
                  <h4>DOB</h4>
                  <input
                    type="date"
                    name="ageGroup"
                    value={state.ageGroup}
                    max={fiveYearsAgo.toISOString().split("T")[0]}
                    onChange={inputchange}
                  />
                </div>
                {/* <CustomSelect
                    options={ageGroup}
                    placeholder="Select age group "
                    value={state.ageGroup}
                    onChange={(value) => handleSelectChange("ageGroup", value)}
                  /> */}

                <div className="editing-input-label">
                  <h4>Pincode</h4>
                  <div>
                    <input
                      onChange={inputchange}
                      type="number"
                      maxLength={6}
                      value={state?.pincode}
                      name="pincode"
                    />
                    {/* <CustomSelect
                      placeholder="Select your Gender"
                      options={gender}
                    /> */}
                  </div>
                </div>
              </div>

              <div className="editing-button-section flex">
                <button className="cancel-edit" onClick={cancelButton}>
                  Cancel
                </button>
                <button
                  className="cancel-edit cancel-edit2"
                  onClick={savebutton}
                  style={{ cursor: "pointer" }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
