import React, { useState, useEffect } from "react";
import "./LoginModal.css";
// import styles from "./LoginModal.module.css";
import { CircularProgress, IconButton, Modal } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL, port } from "../../config";
import ErrorIcon from "@mui/icons-material/Error";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const LoginModal = ({ show, setShow }) => {
  const [isLoginPending, setIsLoginPending] = useState(false);
  const [isSignupPending, setIsSignupPending] = useState(false);
  const [FormData, setFormData] = useState({});
  const [Errors, setErrors] = useState({});
  const [ChangeBoxes, setChangeBoxes] = useState({
    signIn: true,
    signUp: false,
  });
  const [togglePasswordVisibility, setTogglePasswordVisibility] = useState({
    isShowLoginPwd: false,
    signUp: {
      pwd: false,
      confirmPwd: false,
    },
  });
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleShowLoginPassword = () => {
    setTogglePasswordVisibility({
      ...togglePasswordVisibility,
      isShowLoginPwd: !togglePasswordVisibility.isShowLoginPwd,
    });
  };

  const handleClose = () => {
    // setOpenModal(false);
    // setChangeBoxes({ signIn: true });
    // setFormData("");
    // toggleSignInModal();
  };

  const boxChangeFunction = (data) => {
    if (data.signIn) {
      setChangeBoxes({ signIn: true });
      setFormData("");
    } else {
      setChangeBoxes({ signUp: true });
      setFormData("");
    }
  };
  const handlechanges = (e) => {
    const { name, value } = e?.target;
    if (name === "name") {
      const filteredValue = value.replace(/[0-9]/g, "");
      setFormData({ ...FormData, [name]: filteredValue });
    } else if (name === "phone_no") {
      const sanitizedValue = value.replace(/[.-]/g, "");
      const truncatedValue = sanitizedValue.slice(0, 10);
      setFormData({ ...FormData, [name]: truncatedValue });
    } else if (name === "password") {
      const trimmedValue = value.trim();
      setFormData({ ...FormData, [name]: trimmedValue });
    } else {
      setFormData({ ...FormData, [name]: value });
    }
  };
  useEffect(() => {
    checkErrors();
  }, [FormData]);

  const checkErrors = () => {
    if (ChangeBoxes?.signUp) {
      const errors = {};
      const Passwordpattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&]).{6,}$/;
      const EmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const PhonePattern = /^[6-9]\d{9}$/;
      if (FormData?.password && !Passwordpattern.test(FormData?.password)) {
        errors.password =
          "Password must be 6+ characters with an uppercase letter, digit, and special character.";
      }

      if (FormData?.email && !EmailPattern.test(FormData?.email)) {
        errors.email = "Please enter a valid email address.";
      }

      if (FormData?.phone_no && !PhonePattern.test(FormData?.phone_no)) {
        errors.phone = "Please enter a valid phone number.";
      }

      if (
        FormData?.password &&
        FormData?.repassword &&
        FormData?.password !== FormData?.repassword
      ) {
        errors.repassword = "Passwords do not match.";
      }
      setErrors(errors);
    }
  };
  const handleKeyPress = (event) => {
    // Check if the pressed key is '.' or '-'
    if (
      event?.key === "." ||
      event?.key === "-" ||
      event?.key === "e" ||
      event?.key === "+" ||
      event?.key === "E"
    ) {
      // Prevent the default behavior for these keys
      event.preventDefault();
    }
  };

  const customerLogin = async (payload) => {
    setIsLoginPending(true);
    try {
      const response = await axios.post(`${BASE_URL}/user/userlogin`, payload);
      console.log(response);
      const data = response.data;
      const { message, userId, userType, accessToken, refreshToken } = data;
      toast.success(message);
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);
      // alert("jk")
      setShow(false);
      setAuth({
        userId,
        userType,
      });
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    } finally {
      setIsLoginPending(false);
    }
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin(event);
    }
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    const isValueNotEntered = !FormData?.email || !FormData?.password;
    if (isValueNotEntered) {
      toast.info("Email and password required");
      return;
    }
    customerLogin(FormData);
  };
  const onSignUp = () => {
    checkErrors();
    const SubmitValues =
      !FormData?.email ||
      !FormData?.password ||
      !FormData?.phone_no ||
      !FormData?.repassword ||
      !FormData?.name;
    const FindError =
      Errors?.email || Errors?.password || Errors?.phone || Errors?.repassword;
    if (!SubmitValues && !FindError) {
      setIsSignupPending(true);
      axios
        .post(`${port}/user/addusers`, FormData)
        .then((res) => {
          console.log("res>>>", res);
          if (res?.data?.success) {
            toast.success(res?.data?.message);
            setShow(false);
            setChangeBoxes({ signIn: true });
          }
          setIsSignupPending(false);
        })
        .catch((err) => {
          setIsSignupPending(false);
          console.log(err);
          toast.info(err?.response?.data?.message);
        });
    } else {
      if (FindError) {
        toast.info(FindError);
      } else {
        toast.info(`Check Required fields`);
      }
    }
    console.log("SubmitValues>>>>", SubmitValues);
  };

  return (
    <>
      <Modal
        className="loginModalContainer"
        open={show}
        onClose={() => setShow(false)}
      >
        <div className="loginModalContent">
          {/* LOGIN */}
          {ChangeBoxes?.signIn ? (
            <>
              <div className="toploginnav flex">
                <div className="toploginnavlogo">
                  <h3>Dr ONE</h3>
                </div>

                <div
                  onClick={() => {
                    boxChangeFunction({ signUp: true });
                  }}
                  className="toploginnavlogo flex"
                >
                  <h4 className="smallh4">Don't have an account?</h4>
                  <h4
                    style={{ color: "#3a65fd", cursor: "pointer" }}
                    className="loginPopupSignupbtn"
                  >
                    Sign up{" "}
                  </h4>
                </div>
              </div>
              <div className="toplogindata flex">
                <div className="toplogindataimg flex">
                  <img src="/images/logincu.png" alt="" />
                </div>

                <div className="toplogindatainput flex">
                  <h3 className="smallh3" style={{ marginBottom: ".5rem" }}>
                    Login to Continue
                  </h3>
                  {/* <h4 className="smallh4">Login your account</h4> */}
                  <h4
                    className="toplogindatatext"
                    style={{ marginTop: "1rem" }}
                  >
                    Email
                  </h4>
                  <input onChange={handlechanges} name="email" type="text" />

                  <h4
                    className="toplogindatatext"
                    style={{ marginTop: "1rem" }}
                  >
                    Password
                  </h4>
                  <div
                    style={{
                      position: "relative",
                      marginTop: "10px",
                      padding: "0px",
                    }}
                  >
                    <input
                      style={{ paddingRight: "40px", margin: "0px" }}
                      onChange={handlechanges}
                      onKeyDown={handleEnterKeyPress}
                      name="password"
                      type={
                        togglePasswordVisibility.isShowLoginPwd
                          ? "text"
                          : "password"
                      }
                    />

                    <IconButton
                      sx={{
                        position: "absolute",
                        top: "50%",
                        right: "5px",
                        transform: "translateY(-50%)",
                        color: "#3A65FD",
                      }}
                      aria-label="toggle password visibility"
                      onClick={handleShowLoginPassword}
                    >
                      {togglePasswordVisibility.isShowLoginPwd ? (
                        <VisibilityOff
                          sx={{ fontSize: "20px" }}
                          titleAccess="Hide password"
                        />
                      ) : (
                        <Visibility
                          sx={{ fontSize: "20px" }}
                          titleAccess="Show password"
                        />
                      )}
                    </IconButton>
                  </div>
                  <h4
                    style={{ cursor: "pointer", marginTop: "1rem" }}
                    className="forgot-password flex"
                    onClick={() => navigate("/forgotpwd")}
                  >
                    Forgot Password?
                  </h4>
                  <button
                    type="button"
                    disabled={isLoginPending}
                    onClick={handleLogin}
                    className="toplogindatabutton flex"
                  >
                    {isLoginPending ? (
                      <CircularProgress sx={{ color: "white" }} size="1.5rem" />
                    ) : (
                      <h4>Sign in</h4>
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : ChangeBoxes?.signUp ? (
            <>
              {/*END LOGIN */}

              {/* REGISTER */}

              {/*END REGISTER */}

              <div className="toploginnav flex">
                <div className="toploginnavlogo">
                  <h3>Dr ONE</h3>
                </div>

                <div
                  onClick={() => {
                    boxChangeFunction({ signIn: true });
                  }}
                  className="toploginnavlogo flex"
                >
                  <h4 className="smallh4">Have an account?</h4>
                  <h4
                    style={{ color: "#3a65fd", cursor: "pointer" }}
                    className="loginPopupSignupbtn"
                  >
                    Log in
                  </h4>
                </div>
              </div>
              <div className="registerpopup">
                <h2 className="smallh3">Create your account</h2>
                <div>
                  <h4 className="toplogindatatext">Name</h4>
                  <input
                    value={FormData?.name}
                    onChange={handlechanges}
                    name="name"
                    type="text"
                    maxLength={50}
                  />
                </div>

                <div className="registerpopupleft flex">
                  <div className="registerpopuinputs">
                    <h4 className="toplogindatatext">Phone Number</h4>
                    <input
                      value={FormData?.phone_no}
                      onKeyDown={handleKeyPress}
                      style={{ border: Errors?.phone ? "1px solid red" : "" }}
                      onChange={handlechanges}
                      name="phone_no"
                      type="number"
                    />
                  </div>
                  <div className="registerpopuinputs">
                    <h4 className="toplogindatatext">Email</h4>
                    <input
                      value={FormData?.email}
                      style={{ border: Errors?.email ? "1px solid red" : "" }}
                      onChange={handlechanges}
                      name="email"
                      type="email"
                      maxLength={50}
                    />
                  </div>
                </div>
                <div className="registerpopupright flex">
                  <div className="registerpopuinputs">
                    <h4 className="toplogindatatext">Password</h4>
                    <div
                      style={{
                        position: "relative",
                        marginTop: "10px",
                        padding: "0px",
                      }}
                    >
                      <input
                        value={FormData?.password}
                        style={{
                          border: Errors?.password ? "1px solid red" : "",
                          margin: 0,
                          paddingRight: "33px",
                        }}
                        maxLength={12}
                        onChange={handlechanges}
                        name="password"
                        type={
                          togglePasswordVisibility.signUp.pwd
                            ? "text"
                            : "password"
                        }
                      />

                      <IconButton
                        sx={{
                          position: "absolute",
                          top: "50%",
                          right: "0",
                          transform: "translateY(-50%)",
                          color: "#3A65FD",
                        }}
                        aria-label="toggle password visibility"
                        onClick={() =>
                          setTogglePasswordVisibility({
                            ...togglePasswordVisibility,
                            signUp: {
                              ...togglePasswordVisibility.signUp,
                              pwd: !togglePasswordVisibility.signUp.pwd,
                            },
                          })
                        }
                      >
                        {togglePasswordVisibility.signUp.pwd ? (
                          <VisibilityOff
                            sx={{ fontSize: "20px" }}
                            titleAccess="Hide password"
                          />
                        ) : (
                          <Visibility
                            sx={{ fontSize: "20px" }}
                            titleAccess="Show password"
                          />
                        )}
                      </IconButton>
                    </div>
                  </div>
                  <div className="registerpopuinputs">
                    <h4 className="toplogindatatext">Confirm Password</h4>

                    <div
                      style={{
                        position: "relative",
                        marginTop: "10px",
                        padding: "0px",
                      }}
                    >
                      <input
                        type={
                          togglePasswordVisibility.signUp.confirmPwd
                            ? "text"
                            : "password"
                        }
                        value={FormData?.repassword}
                        style={{
                          border: Errors.repassword ? "1px solid red" : "",
                          margin: 0,
                          paddingRight: "33px",
                        }}
                        onChange={handlechanges}
                        name="repassword"
                      />

                      <IconButton
                        sx={{
                          position: "absolute",
                          top: "50%",
                          right: "0px",
                          transform: "translateY(-50%)",
                          color: "#3A65FD",
                        }}
                        aria-label="toggle password visibility"
                        onClick={() =>
                          setTogglePasswordVisibility({
                            ...togglePasswordVisibility,
                            signUp: {
                              ...togglePasswordVisibility.signUp,
                              confirmPwd:
                                !togglePasswordVisibility.signUp.confirmPwd,
                            },
                          })
                        }
                      >
                        {togglePasswordVisibility.signUp.confirmPwd ? (
                          <VisibilityOff
                            sx={{ fontSize: "20px" }}
                            titleAccess="Hide password"
                          />
                        ) : (
                          <Visibility
                            sx={{ fontSize: "20px" }}
                            titleAccess="Show password"
                          />
                        )}
                      </IconButton>
                    </div>
                  </div>
                </div>
                {Errors?.phone ||
                Errors?.email ||
                Errors?.password ||
                Errors?.repassword ? (
                  <div className="registerpopuinputsErrorSec">
                    {Errors?.phone && (
                      <div className="registerpopuinputsErrorSecFlex">
                        <ErrorIcon id="registerpopuinputsErrorSecFlexIcon" />
                        <p>{Errors?.phone}</p>
                      </div>
                    )}
                    {Errors?.email && (
                      <div className="registerpopuinputsErrorSecFlex">
                        <ErrorIcon id="registerpopuinputsErrorSecFlexIcon" />
                        <p>{Errors?.email}</p>
                      </div>
                    )}
                    {Errors?.password && (
                      <div className="registerpopuinputsErrorSecFlex">
                        <ErrorIcon id="registerpopuinputsErrorSecFlexIcon" />
                        <p>{Errors?.password}</p>
                      </div>
                    )}
                    {Errors?.repassword && (
                      <div className="registerpopuinputsErrorSecFlex">
                        <ErrorIcon id="registerpopuinputsErrorSecFlexIcon" />
                        <p>{Errors?.repassword}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  ""
                )}
                <button onClick={onSignUp} className="toplogindatabutton flex">
                  {isSignupPending ? (
                    <CircularProgress sx={{ color: "white" }} size="1.5rem" />
                  ) : (
                    <h4>Sign Up</h4>
                  )}
                </button>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </Modal>
    </>
  );
};
