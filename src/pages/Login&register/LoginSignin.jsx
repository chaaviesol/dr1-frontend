import React, { useEffect, useState } from "react";
import "../Login&register/login.css";
import { IconButton, Modal } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { error } from "jquery";
import { InnerLoader } from "../../components/Loader/InnerLoader";
import { port } from "../../config";
import { Loader } from "../../components/Loader/Loader";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
export const LoginSignin = () => {
  const [Open, setOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const [inputedValues, setinputedValues] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [ResetConfshowPassword, setResetConfShowPassword] = useState(false);
  const [FrgtState, setFrgtState] = useState({});
  const [Errors, setErrors] = useState();
  const navigate = useNavigate();
  const [otp, setOtp] = React.useState("");
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const openModal = (cls) => {
    if (cls?.cls) {
      setOpen(false);
    } else {
      setOpen(true);
      if (inputedValues?.email) {
        setFrgtState({ ...FrgtState, email: inputedValues?.email });
      }
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfoResponse = await axios.get(
          "https://www.googleapis.com/oauth2/v2/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        const userinfo = userInfoResponse;
        if (userinfo) {
          const values = {
            email: userInfoResponse?.data?.email,
            googleVerified: userInfoResponse.data.verified_email,
          };
          setinputedValues(values);
          loginNow(values);
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    },
  });
  console.log("inputedValues>>>>", FrgtState);

  const handleChange = (newValue) => {
    setOtp({ ...otp, userOtp: newValue });
  };
  const handleChanges = (e) => {
    const { value, name } = e?.target;
    let FinalData = {};
    FinalData = { ...inputedValues, [name]: value };
    setinputedValues(FinalData);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownResetPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownResetConfPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowResetPassword = () =>
    setShowResetPassword((show) => !show);
  const handleClickShowResetConfPassword = () =>
    setResetConfShowPassword((show) => !show);
  const loginNow = (values) => {
    setloading(true);
    const data = values?.googleVerified ? values : inputedValues;
    console.log("values>>>>", values);
    let CheckingFields = true;
    if (data?.googleVerified) {
      CheckingFields = true;
    } else {
      if (data?.email && data?.password) {
        CheckingFields = true;
      } else {
        CheckingFields = false;
      }
    }
    if (CheckingFields) {
      axios
        .post(`${port}/user/login`, data)
        .then((res) => {
          console.log("res>>>", res);
          const { accessToken, refreshToken, userType, userId } = res.data;
          sessionStorage.setItem("accessToken", accessToken);
          sessionStorage.setItem("userType", userType);
          sessionStorage.setItem("refreshToken", refreshToken);
          setAuth({
            userId,
            userType,
          });
          if (res?.data?.success) {
            toast.success(res?.data?.message);
            setTimeout(() => {
              setloading(false);
              if (userType === "doctor") {
                navigate("/doctoradminprofile");
              } else if (userType === "hospital") {
                navigate("/hospitaladmin");
              } else if (userType === "lab") {
                navigate("/labprofile");
              }
            }, 1000);
          } else {
            toast.info(res?.data?.message);
            setloading(false);
          }
        })
        .catch((error) => {
          toast.info(error?.response?.data?.message);
          setloading(false);
        });
    } else {
      toast.info("All fields are mandatory");
      setloading(false);
    }
  };

  const VerifyOtp = () => {
    if (parseInt(otp?.userOtp) === parseInt(otp.sentedOtp)) {
      setFrgtState({ ...FrgtState, otpVerification: true });
    } else {
      toast.info("The provided OTP does not match the expected value");
    }
  };

  useEffect(() => {
    checkErrors();
  }, [FrgtState, inputedValues]);

  const checkErrors = () => {
    const errors = {};
    const EmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PhonePattern = /^[6-9]\d{9}$/;
    const Passwordpattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&]).{6,}$/;
    if (
      FrgtState?.password &&
      FrgtState?.confirmPwd &&
      FrgtState.password !== FrgtState.confirmPwd
    ) {
      errors.confirmPwd = "Passwords do not match.";
    }
    if (FrgtState?.password && !Passwordpattern.test(FrgtState?.password)) {
      errors.password =
        "Password must be 6+ characters with an uppercase letter, digit, and special character.";
    }
    if (inputedValues?.email && !EmailPattern.test(inputedValues?.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (
      inputedValues?.contact_no &&
      !PhonePattern.test(inputedValues?.contact_no)
    ) {
      errors.phone = "Please enter a valid phone number.";
    }
    setErrors(errors);
  };
  const frgtInputData = (e) => {
    const { value, name } = e?.target;
    setFrgtState({ ...FrgtState, [name]: value });
  };

  console.log("frgtInputData>>>", FrgtState);
  const nextVerification = (data) => {
    if (data?.back) {
      setFrgtState({
        ...FrgtState,
        emailConfirm: false,
        otpVerification: false,
      });
    } else {
      if (FrgtState?.email) {
        setloading(true);
        const data = {
          email: FrgtState?.email,
        };
        axios
          .post(`${port}/user/forgotpwd`, data)
          .then((res) => {
            if (res?.data?.success) {
              console.log("res>>>", res);
              setOtp({ ...otp, sentedOtp: res?.data?.otp });
              setFrgtState({ ...FrgtState, emailConfirm: true });
              toast.success(res?.data?.message);
              setloading(false);
            }
          })
          .catch((error) => {
            toast.info(error?.response?.data?.message);
            setloading(false);
          });
      } else {
        toast.info("Email field is mandatory");
        setloading(false);
      }
    }
  };

//enter key login

const handleEnterKeyPress = (event) => {
  if (event.key === "Enter") {
    loginNow(event);
  }
};

  const updatePassword = (e) => {
    const { name, value } = e?.target;
    setFrgtState({ ...FrgtState, [name]: value });
  };

  const ResetDone = () => {
    setloading(true);
    if (FrgtState?.confirmPwd && FrgtState?.password) {
      if (!Errors?.confirmPwd && !Errors?.password) {
        axios
          .post(`${port}/user/resetpassword`, FrgtState)
          .then((res) => {
            if (res.data.success) {
              toast.success(res?.data?.message);
              setOpen(false);
              setFrgtState("");
              setloading(false);
            }
          })
          .catch((err) => {
            console.log(err);
            toast.info(err?.response?.data?.message);
            setloading(false);
          });
      } else {
        toast.info("Please check the errors");
        setloading(false);
      }
    } else {
      toast.info("Please review the fields");
      setloading(false);
    }
  };
  const resetAuth = () => {
    setinputedValues({ ...inputedValues, googleVerified: false, email: "" });
  };
  if (!inputedValues?.googleVerified && !loading) {
    return (
      <div>
        <div className="main-login flex">
          <div className="pngdiv pngdiv1">
            <img src="images/Group 69.png" alt="" />
          </div>
          <div className="login-image-section flex">
            <div className="login-first-image">
              <img src="images/doc.jpg" alt="" />
            </div>
            <div className="login-second-image flex">
              <img src="images/lab.jpg" alt="" />
              <img src="images/med.jpg" alt="" />
            </div>
          </div>
          <div className="pngdiv pngdiv2">
            <img src="images/Group 70.png" alt="" />
          </div>
          <div
            className="flex"
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <div className="login-form flex">
              <div className="flex input-box-section">
                <div>
                  <h1 style={{ color: "white" }}>Login</h1>
                </div>
                <div>
                  <div className="LoginPageGoogleAuthBtnAlignDiv">
                    <button onClick={login} class="LoginPageGoogleAuthBtn">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="xMidYMid"
                        viewBox="0 0 256 262"
                      >
                        <path
                          fill="#4285F4"
                          d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                        ></path>
                        <path
                          fill="#34A853"
                          d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                        ></path>
                        <path
                          fill="#FBBC05"
                          d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                        ></path>
                        <path
                          fill="#EB4335"
                          d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                        ></path>
                      </svg>
                      Continue with Google
                    </button>
                    <h4
                      onClick={() => {
                        resetAuth();
                      }}
                    >
                      OR
                    </h4>
                  </div>
                </div>
                <div>
                  <h4>Email</h4>
                  <input
                    disabled={
                      inputedValues?.googleVerified && inputedValues?.email
                        ? true
                        : false
                    }
                    name="email"
                    value={inputedValues?.email}
                    onChange={handleChanges}
                    type="email"
                    placeholder="example@gmail.com"
                  />
                </div>
                {/* <div>
                  <h4>Phone Number</h4>
                  <input onKeyDown={handleKeyPress} name='contact_number' value={inputedValues?.contact_number} onChange={handleChanges} type="number" />
                </div> */}
                <div>
                  <h4>Password</h4>
                  <div
                    style={{
                      position: "relative",
                    }}
                    className="login-pass-con-Inp"
                  >
                    <input
                      maxLength={50}
                      name="password"
                      value={inputedValues?.password}
                      onChange={handleChanges}
                      onKeyDown={handleEnterKeyPress}
                      style={{
                        margin: 0,
                        position: "absolute",
                        top: "0",
                        left: "0",
                        height: "100%",
                        width: "calc(100% - 2px)",
                        padding: "0 10px",
                      }}
                      type={showPassword ? "text" : "password"}
                    />
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: "50%",
                        right: "10px",
                        transform: "translateY(-50%)",
                        color: "#fafaf9",
                      }}
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </div>
                </div>

                <div className="forgot-password flex">
                  <a onClick={openModal}>
                    <h4>Forgot Password ?</h4>{" "}
                  </a>
                </div>
              </div>
              <div className="login-button-section flex">
                <button
                  onClick={() => {
                    navigate("/registration");
                  }}
                  className="flex"
                >
                  <h4>Create account</h4>
                </button>
                <button onClick={loginNow} href="/" className="flex">
                  <h4>Login Now</h4>
                </button>
              </div>
            </div>
          </div>
          <div className="pngdiv pngdiv3 flex">
            <div>
              <img src="images/Group 71.png" alt="" />
            </div>
          </div>
        </div>

        {/* modal starts */}
        <Modal
          open={Open}
          onClose={() => {
            openModal({ cls: true });
          }}
          className="login-modal-Align"
        >
          <>
            <div className="login-InnerModal">
              {loading ? (
                <InnerLoader />
              ) : (FrgtState?.email && FrgtState?.emailConfirm) ||
                FrgtState?.otpVerification ? (
                FrgtState?.otpVerification ? (
                  <div className="login-InnerModal-Change-pwd">
                    <div className="login-InnerModal-close">
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          nextVerification({ back: true });
                        }}
                      >
                        <ArrowBackIcon id="login-InnerModal-closeIcon" />
                      </div>
                    </div>
                    <div>
                      <h4> New password</h4>
                      <div
                        style={{
                          position: "relative",
                          color: "black",
                        }}
                        className="login-pass-con-Change-pwd"
                      >
                        <input
                          maxLength={50}
                          name="password"
                          value={FrgtState?.password}
                          onChange={updatePassword}
                          style={{
                            margin: 0,
                            position: "absolute",
                            top: "0",
                            left: "0",
                            height: "100%",
                            width: "calc(100% - 2px)",
                            padding: "0 10px",
                            border: "1px solid blue",
                            borderRadius: "10px",
                          }}
                          type={showResetPassword ? "text" : "password"}
                        />

                        <IconButton
                          sx={{
                            position: "absolute",
                            top: "50%",
                            right: "10px",
                            transform: "translateY(-50%)",
                            color: "black",
                          }}
                          aria-label="toggle password visibility"
                          onClick={handleClickShowResetPassword}
                          onMouseDown={handleMouseDownResetPassword}
                        >
                          {showResetPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </div>
                      <div className="loginpwdErrorSetting">
                        <p>{Errors?.password}</p>
                      </div>
                    </div>
                    <div>
                      <h4>Confirm password</h4>
                      <div
                        style={{
                          position: "relative",
                          color: "black",
                        }}
                        className="login-pass-con-Change-pwd"
                      >
                        <input
                          maxLength={50}
                          name="confirmPwd"
                          value={FrgtState?.confirmPwd}
                          onChange={updatePassword}
                          style={{
                            margin: 0,
                            position: "absolute",
                            top: "0",
                            left: "0",
                            height: "100%",
                            width: "calc(100% - 2px)",
                            padding: "0 10px",
                            border: "1px solid blue",
                            borderRadius: "10px",
                          }}
                          type={showPassword ? "text" : "password"}
                        />
                        <IconButton
                          sx={{
                            position: "absolute",
                            top: "50%",
                            right: "10px",
                            transform: "translateY(-50%)",
                            color: "black",
                          }}
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </div>
                      <div className="loginpwdErrorSetting">
                        <p>{Errors?.confirmPwd}</p>
                      </div>
                    </div>
                    <div className="ogin-InnerModal-resetPass-NextDiv">
                      <button className="loginBUttonStyle" onClick={ResetDone}>
                        Done
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="login-InnerModal-close">
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          nextVerification({ back: true });
                        }}
                      >
                        <ArrowBackIcon id="login-InnerModal-closeIcon" />
                      </div>
                    </div>
                    <label className="login-InnerModal-H3">
                      Check your email for OTP
                    </label>
                    <p>
                      Kindly input the 6-digit code that has been dispatched to
                      your email.
                    </p>
                    <div className="login-InnerModal-Inputs">
                      <div className="login-InnerModal-Inputs-Align">
                        <MuiOtpInput
                          value={otp?.userOtp}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <p className="login-InnerModal-Inputs-Ptag">
                      Didin't receive a code?{" "}
                      <a onClick={nextVerification}>Resent</a>
                    </p>
                    <div className="login-InnerModal-Button">
                      <button className="loginBUttonStyle" onClick={VerifyOtp}>
                        Verify Code{" "}
                      </button>
                    </div>
                  </>
                )
              ) : (
                <div className="ogin-InnerModal-resetPass">
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      openModal({ cls: true });
                    }}
                  >
                    <ArrowBackIcon id="login-InnerModal-closeIcon" />
                  </div>
                  <h3>Input your email</h3>
                  <input
                    placeholder="example@gmail.com"
                    value={FrgtState?.email}
                    onChange={frgtInputData}
                    name="email"
                    type="email"
                  />
                  <div className="ogin-InnerModal-resetPass-NextDiv">
                    <button
                      className="loginBUttonStyle"
                      onClick={nextVerification}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        </Modal>
        {/* modal end */}
      </div>
    );
  } else {
    return (
      <>
        <Loader />
      </>
    );
  }
};
