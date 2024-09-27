import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { port } from "../../../config";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { Loader } from "../../../components/Loader/Loader";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useLocation ,useNavigate } from "react-router-dom";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Addadmins() {
  const [isLoading, setIsLoading] = useState(false);
  const [user_access, setuser_access] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { admin } = location.state || {};
  
  const schema = yup.object({
    name: yup.string().trim().max(25, "Name cannot exceed 25 characters"),
    emailid: yup.string().email("Invalid email format"),
    phone_no: yup
      .string()
      .required("Mobile number is required")
      .matches(/^\d{10}$/, "Mobile number must be 10 digits"),
    type: yup.string().required("type is required"),
    ...(admin ? {} : {
      password: yup.string().required("Password is required"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required")
    })
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (admin) {
      setValue("name", admin.name);
      setValue("emailid", admin.emailid);
      setValue("phone_no", admin.phone_no);
      setValue("type", admin.adm_type);
      setuser_access(admin.user_access === 'Y');
    }
  }, [admin, setValue]);

  const onSubmit = async (dataForm) => {
    dataForm.user_access = user_access ? 'Y' : 'N';
    if (admin) {
      dataForm.id = admin.id; // Add the ID for the edit API call
    }
    
    console.log({ dataForm });
    setIsLoading(true);
    try {
      let response;
      if (admin) {
        // Edit existing admin
        response = await axios.post(`${port}/admin/editadmin`, dataForm);
        if (response.status === 200) {
          reset();
          setuser_access(false);
          toast.success("Successfully updated", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            onClose: () => navigate('/mainadmin')
          });
        }
      } else {
        // Add new admin
        response = await axios.post(`${port}/admin/addadmin`, dataForm);
        if (response.status === 200) {
          reset();
          setuser_access(false);
          toast.success("Successfully added new admin", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            onClose: () => navigate('/mainadmin')
          });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
    <div>
      {isLoading && (
        <>
          <Loader />
        </>
      )}
      
      <div style={{ marginTop: "1.3vw" }} className="flex admin_view_more">
        <h3>{admin ? "Edit Admin" : "Add New Admin"}</h3>
      </div>

      <div className="addadminimage">
        <img src="../images/man.jpg" alt="" />
      </div>

      <div
        style={{ marginTop: "1.3vw" }}
        className="flex admin2 admin_view_more"
      >
        <h3>Add Details</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="admindetailsinput flex">
          <div className="addadmin-inputdiv">
            <h4>Admin Name</h4>
            <input type="text" {...register("name")} required />
            {errors.name && <p>{errors.name.message}</p>}
          </div>

          <div>
            <h4>Type</h4>
            <select {...register("type")} defaultValue="">
              <option value="" disabled>
                Select admin type
              </option>
              <option value="SU">Super Admin</option>
              <option value="ADM">Admin</option>
            </select>
            {errors.type && <p>{errors.type.message}</p>}
          </div>

          <div>
            <h4>Phone Number</h4>
            <input type="number" {...register("phone_no")} required />
            {errors.phone_no && <p>{errors.phone_no.message}</p>}
          </div>

          <div>
            <h4>Email</h4>
            <input type="text" {...register("emailid")} required />
            {errors.emailid && <p>{errors.emailid.message}</p>}
          </div>
        </div>

        {!admin && (
          <>
            <div
              style={{ marginTop: "1.3vw" }}
              className="flex admin2 admin_view_more"
            >
              <h3>Create Password</h3>
            </div>

            <div className="admindetailspassword flex">
              <div>
                <h4>Password</h4>
                <input type="password" {...register("password")} required />
                {errors.password && <p>{errors.password.message}</p>}
              </div>

              <div>
                <h4>Confirm Password</h4>
                <input type="password" {...register("confirmPassword")} required />
                {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
              </div>
            </div>
          </>
        )}

        <div className="checkboxsection flex">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  {...label}
                  checked={user_access}
                  onChange={(e) => setuser_access(e.target.checked)}
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}
                />
              }
              label="user access"
            />
          </FormGroup>
        </div>

        <button
          className="addadminsavebutton flex"
          type="submit"
          disabled={isLoading}
        >
          Save
        </button>
      </form>
    </div>
  );
}


