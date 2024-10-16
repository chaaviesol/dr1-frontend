import React, { useState, useRef, useEffect } from "react";
import { Modal } from "@mui/material";
import "./categorymanagement.css";
import { BASE_URL } from "../../../../config";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader } from "../../../../components/Loader/Loader";

export default function Categorymanagement({
  updateState: { setChangeDashboards },
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState({
    isOpen: false,
    state: "",
  });

  const [addcategory, setaddcategory] = useState({
    category: "",
    image: "",
    id: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [categorylist, setcategorylist] = useState([]);
  const [deleteid, setdeleteid] = useState(null);
  console.log({ addcategory });
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];

      if (file.type === "image/png") {
        setaddcategory((prevData) => ({
          ...prevData,
          image: file,
        }));
      } else {
        alert("Please select a PNG file.");
        fileInputRef.current.value = null;
      }
    }
  };

  const handletextchange = (event) => {
    const { name, value } = event.target;
    setaddcategory((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/product/getcategory`);
      if (response?.status === 200) {
        setcategorylist(response?.data?.data);
      }
    } catch (err) {
    } finally {
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleEditClick = (category) => {
    // setSelectedCategory(category);
    setIsModalOpen2(true);
    setaddcategory({
      category: category.category,
      image: category?.image,
      id: category?.id,
    });
  };

  const handleDelClick = async (ele) => {
    try {
      const data = {
        id: deleteid.id,
      };
      setIsLoading(true);
      const response = await axios.post(
        `${BASE_URL}/product/deletecategory`,
        data
      );

      if (response.status === 200) {
        setIsModalOpen4({ isOpen: true, state: "success" });
        getCategories();
        setaddcategory("");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      if (err.response) {
        const { status, data } = err.response;

        if (status === 400) {
          setIsModalOpen3(true);
          // toast.error(data.message);
        } else {
          toast.error("An error occurred.");
        }
      } else {
        toast.error("An error occurred while saving.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onSaveButton = async () => {
    if (!addcategory?.category || addcategory.category.trim() === "") {
      return toast.error("Category is required to proceed.");
    }

    if (!addcategory?.image) {
      return toast.error("Image is required to proceed.");
    }

    const formData = new FormData();

    formData.append("image", addcategory.image);

    const data = {
      category: addcategory.category,
    };

    if (addcategory?.id) {
      data.id = addcategory.id;
    }

    formData.append("data", JSON.stringify(data));

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${BASE_URL}/product/addcategory`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);

      if (response.status === 200) {
        toast.success(response.data.message);
        setIsModalOpen(false);
        setIsModalOpen2(false);
        getCategories();
        setaddcategory("");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err)
      if (err.response) {
        const { status, data } = err.response;

        if (status === 400) {
          toast.error(data.message);
          setIsModalOpen(false);
          setIsModalOpen2(false);
          setaddcategory("");
        } else {
          toast.error("An error occurred.");
        }
      } else {
        toast.error("An error occurred while saving.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (addcategory?.image && addcategory.image instanceof File) {
      const url = URL.createObjectURL(addcategory.image);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setImageUrl(addcategory?.image);
    }
  }, [addcategory?.image]);

  return (
    <div>
      {/* <Loader /> */}
      {isLoading && <Loader />}
      <div className="adpha-topcontainer">
        <div className="adpha-left">
          <button
            onClick={() => setChangeDashboards({ productmanagement: true })}
            className="adpha-back-button"
          >
            <i className="ri-arrow-left-line"></i>
          </button>
          <span className="adpha-title">Category Management</span>
        </div>
        <div className="adpha-right">
          <button
            className="adpha-categ-button flex"
            onClick={() => setIsModalOpen(true)}
          >
            <i className="ri-add-circle-line"></i>
            <h4>Add Category</h4>
          </button>
        </div>
      </div>

      <div className="category-admin-section">
        {categorylist.map((ele, index) => (
          <div key={index} className="admin2-pharmacyshopproduct flex">
            <div className="admin2pharmacyshopproductimg flex">
              <img src={ele?.image} alt={ele?.category || "Category Image"} />
            </div>
            <div className="admin2pharmacyshopproducttitle flex">
              <h4>{ele?.category}</h4>
            </div>
            <div
              className="admineditecategory flex"
              onClick={() => {
                setIsModalOpen4({ isOpen: true, state: "delete" });
                setdeleteid(ele);
              }}
            >
              <i className="ri-delete-bin-6-line"></i>
            </div>

            <div
              className="admineditecategory2 flex"
              onClick={() => handleEditClick(ele)}
            >
              <i className="ri-pencil-fill"></i>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setaddcategory("");
        }}
      >
        <div className="addcategorymodal flex">
          <div className="productcategoryadmintitle flex">
            <h3>Add New Category</h3>
            <button
              onClick={() => {
                setIsModalOpen(false);
                setaddcategory("");
              }}
            >
              {" "}
              <i className="ri-close-line"></i>{" "}
            </button>
          </div>

          <div className="productcategoryadmin flex">
            <h4>
              {addcategory?.image ? (
                <img
                  src={imageUrl}
                  alt="Selected"
                  style={{ width: "100px", height: "100px" }}
                />
              ) : (
                "Image Display here (image must be a PNG with transparent background)"
              )}
            </h4>
            <div className="flex productcategoryadmin2">
              <button onClick={handleButtonClick}>Upload Image</button>
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/png"
                onChange={handleFileChange}
                name="image"
              />
              <input
                type="text"
                onChange={handletextchange}
                value={addcategory?.category || ""}
                name="category"
                placeholder="Category name"
              />
            </div>
          </div>

          <div className="productcategoryadminsave flex">
            <button onClick={onSaveButton}>Save</button>
          </div>
        </div>
      </Modal>

      <Modal
        open={isModalOpen2}
        onClose={() => {
          setIsModalOpen2(false);
          setaddcategory("");
        }}
      >
        <div className="addcategorymodal2 flex">
          <div className="productcategoryadmintitle flex">
            <h3>Edit Category</h3>
            <button
              onClick={() => {
                setIsModalOpen2(false);
                setaddcategory("");
              }}
            >
              {" "}
              <i className="ri-close-line"></i>{" "}
            </button>
          </div>

          <div className="productcategoryadmin flex">
            {addcategory?.image ? (
              typeof addcategory.image === "string" ? (
                <img
                  src={addcategory.image}
                  alt="Category"
                  style={{ width: "100px", height: "100px" }}
                />
              ) : (
                <img
                  src={URL.createObjectURL(addcategory.image)}
                  alt="Selected"
                  style={{ width: "100px", height: "100px" }}
                />
              )
            ) : (
              <img
                src={imageUrl}
                alt="Selected"
                style={{ width: "100px", height: "100px" }}
              />
            )}

            <div className="flex productcategoryadmin2">
              <button onClick={handleButtonClick}>Update Image</button>
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/png"
                onChange={handleFileChange}
                name="image"
              />
              <input
                type="text"
                name="category"
                value={addcategory?.category || ""}
                onChange={handletextchange}
                placeholder="Category name"
              />
            </div>
          </div>

          <div className="productcategoryadminsave flex">
            <button onClick={onSaveButton}>Save</button>
          </div>
        </div>
      </Modal>

      <Modal
        open={isModalOpen3}
        onClose={() => {
          setIsModalOpen3(false);
          setaddcategory("");
        }}
      >
        <div className="addcategorymodaldelete flex">
          <iframe title="1" src="https://lottie.host/embed/24e50e3a-d408-4e5f-baea-661be0b0d0fe/8A5dK3grdQ.json"></iframe>
          <h2>Deletion Unsuccessful</h2>
          <p className="priscriptionpara">
            Deletion failed because this field is used somewhere in your
            product. Please change or delete it and try again{" "}
          </p>
          <button
            onClick={() => setChangeDashboards({ productmanagement: true })}
            className="addcategorymodaldeletebutton"
          >
            Product List
          </button>

          <button
            className="addcategorymodaldeleteclose2"
            onClick={() => {
              setIsModalOpen3(false);
              setaddcategory("");
            }}
          >
            <i className="ri-close-line"></i>
          </button>
        </div>
      </Modal>

      <Modal
        open={isModalOpen4.isOpen}
        onClose={() => {
          setIsModalOpen4({ isOpen: false, state: "" });
          setaddcategory("");
        }}
      >
        <>
          {isModalOpen4.state === "success" && (
            <div className="addcategorymodaldelete2 flex">
              <iframe title="2" src="https://lottie.host/embed/a584aaf4-42a4-4825-85b5-cac794e58be5/qWn2gduyVl.json"></iframe>
              <h2>Successfully Deleted</h2>
              <button
                className="adpha-categ-button flex"
                style={{ marginTop: "20px" }}
                onClick={() => setIsModalOpen(true)}
              >
                <i className="ri-add-circle-line"></i>
                <h4>Add Category</h4>
              </button>

              <button
                className="addcategorymodaldeleteclose2"
                onClick={() => {
                  setIsModalOpen4(false);
                  setaddcategory("");
                }}
              >
                <i className="ri-close-line"></i>
              </button>
            </div>
          )}

          {isModalOpen4.state === "delete" && (
            // <div className="addcategorymodaldelete2 flex">
            //   Are you sure ?<button onClick={handleDelClick}>Yes</button>
            //   <button
            //     onClick={() => setIsModalOpen4({ isOpen: false, state: "" })}
            //   >
            //     No
            //   </button>
            // </div>
            <div className="addcategorymodaldelete2 flex">
              <h2
                style={{
                  textAlign: "center",
                  color: "black",
                }}
              >
                Are you sure you want to delete this category?
              </h2>

              <p
                className="priscriptionpara "
                style={{
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
                If you delete this category, it cannot be recovered. However,
                you will have the option to add a new category
              </p>

              <div>
                <button
                  className="addcategorymodaldelete2buttonnew"
                  style={{
                    backgroundColor: "white",
                    color: "rgb(225, 29, 72)",
                  }}
                  onClick={() => setIsModalOpen4({ isOpen: false, state: "" })}
                >
                  Cancel
                </button>
                <button
                  className="addcategorymodaldelete2buttonnew"
                  style={{
                    backgroundColor: "rgb(225, 29, 72)",
                    color: "white",
                  }}
                  onClick={handleDelClick}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </>
      </Modal>
    </div>
  );
}
