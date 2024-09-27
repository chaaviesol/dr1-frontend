import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import {
  Button,
  Input,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { BASE_URL } from "../../../config";
import { ToastContainer, toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "../../../components/Loader/Loader";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function UserProfileCompleteModal({ open, onClose }) {
  const [fileName, setFileName] = useState("");
  const [loader, setloader] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient()
  const schema = yup.object({
    image: yup.mixed().notRequired(),
    ageGroup: yup.string().required(),
    gender: yup.string().required(),
    pincode: yup.string().required(),
  });
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const imageFile = watch("image");

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      setFileName(imageFile[0].name);
    }
  }, [imageFile]);
  const completeUserRegistration = async (payload) => {
    const response = await axiosPrivate.post(
      `${BASE_URL}/user/completeRegistration`,
      payload
    );

    return response.data;
  };

  const { mutateAsync: completeUserRegistationMutation, isPending } =
    useMutation({
      mutationKey: ["completeUserRegistration"],
      mutationFn: completeUserRegistration,
      onSuccess: (data) => {
        onClose(false);
        reset();
        handleCreateSuccess(data?.message);
        queryClient.invalidateQueries(["fetchUserProfileDetails", auth.userId]);
      },
      onError: (error) => {
        console.error("completeUserRegistationMutation error:", error);
      },
    });
  const onSubmit = async (dataForm) => {
    setloader(true);
    dataForm.user_id = auth.userId;
    const formData = new FormData();
    if (dataForm.image && dataForm.image[0]) {
      formData.append("image", dataForm.image[0]);
    }
    formData.append("data", JSON.stringify(dataForm));
    await completeUserRegistationMutation(formData);
  };

  const handleCreateSuccess = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <>
      <Modal open={open} onClose={() => onClose(false)}>
        <div className={styles.modalContainer}>
          {isPending && <Loader />}
          <div className={styles.top}>
            <div className={styles.flexRow}>
              <img
                src="/images/doconelogo.jpg"
                className="dr_one_logo"
                alt=""
              />
              {/* <div className={styles.logo}></div> */}
              <h6>DR ONE</h6>
            </div>
            <div className={styles.flexRow}>
              <h6>Would you like to edit your profile?</h6>
              <h6
                className={styles.edit}
                onClick={() => navigate("/userprofile")}
              >
                Edit
              </h6>
            </div>
          </div>
          <div className={styles.form}>
            <div className={styles.heading}>
              <h4>Have you completed your profile?</h4>
              <h4>Complete your profile</h4>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.dddd}>
                <div className={styles.inputSection}>
                  <div className={styles.row}>
                    <div>
                      <label htmlFor="">Profile photo</label>
                      <div className={styles.imageMain}>
                        <div className={styles.imageContainer}>
                          <input
                            type="file"
                            id="file"
                            accept="image/png, image/jpeg ,image/jpg"
                            className={styles.filePicker}
                            {...register("image")}
                          />
                          <label for="file" className={styles.selectB}>
                            Upload
                          </label>

                          <input
                            disabled
                            type="text"
                            id="fileName"
                            value={fileName}
                            className={styles.imageInputBox}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={styles.inputContainer}>
                      <label htmlFor="">Gender</label>

                      <Select
                        id="gender"
                        {...register("gender")}
                        required
                        className={styles.select}
                        defaultValue=""
                      >
                        <MenuItem disabled>
                          <em></em>
                        </MenuItem>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">female</MenuItem>
                        <MenuItem value="others">Others</MenuItem>
                      </Select>
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.inputContainer}>
                      <label htmlFor="">Age group</label>
                      <Select
                        id="ageGroup"
                        {...register("ageGroup")}
                        className={styles.select}
                        required
                        defaultValue=""
                      >
                        <MenuItem disabled>
                          <em></em>
                        </MenuItem>
                        <MenuItem value="18-24">18-24</MenuItem>
                        <MenuItem value="25-34">25-34</MenuItem>
                        <MenuItem value="35-44">35-44</MenuItem>
                        <MenuItem value="45-54">45-54</MenuItem>
                        <MenuItem value="55-64">55-64</MenuItem>
                        <MenuItem value="64+">64+</MenuItem>
                      </Select>
                    </div>
                    <div>
                      <div>
                        <label htmlFor="">Pincode</label>
                      </div>
                      <div className={styles.down}>
                        <TextField
                          style={{ width: "100%" }}
                          id="pincode"
                          required
                          {...register("pincode")}
                          className={styles.inputBox2}
                          type="number"
                          placeholder="Pincode"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {(errors.ageGroup || errors.gender || errors.pincode) && (
                  <div className={styles.allFieldsReqContainer}>
                    <div className={styles.allFieldsReq}>
                      <h6>All fields are required</h6>
                    </div>
                  </div>
                )}
                <div className={styles.buttonContainer}>
                  <button
                    type="submit"
                    disabled={isPending}
                    className={styles.saveButton}
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default UserProfileCompleteModal;
