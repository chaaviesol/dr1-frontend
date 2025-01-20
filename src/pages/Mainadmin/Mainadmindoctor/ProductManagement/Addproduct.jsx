import React, { useEffect, useState, useRef } from "react";
import "./addproduct.css";
import axios from "axios";
import { BASE_URL, PHARMACY_URL } from "../../../../config";
import { toast } from "react-toastify";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 30;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function Addproduct({
  updateState: { setChangeDashboards, setDetailData },
  Details,
}) {
  const [product, setproduct] = useState(() => Details || {});
  const [errors, setErrors] = useState({});

  const [images, setImages] = useState(() => {
    return Details?.images
      ? [
          Details.images.image1,
          Details.images.image2,
          Details.images.image3,
          Details.images.image4,
        ]
      : [null, null, null, null];
  });

  const [selectedCategory, setSelectedCategory] = useState(() => {
    return Details?.category ? [Details.category] : [];
  });

  const fileInputRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setproduct((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };

  const handleUploadClick = (index) => {
    setSelectedIndex(index);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const navigateFn = () => {
    const newErrors = {};
    // Check if any field or image is missing
    const isAnyFieldMissing =
      !product.name ||
      !product.category ||
      !product.brand ||
      !product.mrp ||
      !product.hsn ||
      !product.description;
    const isAnyImageMissing = images.some((image) => image === null);

    if (isAnyFieldMissing || isAnyImageMissing) {
      newErrors.all = `All fields are mandatory, fill them all.`;
      // toast.error("All fields are mandatory, fill them all");
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
    } else {
      setDetailData({ ...product, images, mode: "view" });
      setChangeDashboards({ productmanagementOrderDetail: true });
    }
  };

  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    const newErrors = {};
    if (!file) return;
    if (file.type !== "image/png") {
      newErrors.image = `Only PNG files are allowed.`;
      // toast.error("Only PNG files are allowed.");
      // return;
    }
    const fileAlreadyExists = images.some((image, i) => {
      if (image?.file?.name) {
        console.log(file?.name);
        return image.file.name === file.name;
      }
      return false;
    });

    if (fileAlreadyExists) {
      newErrors.image = `Each image must be unique. This image has already been uploaded.`;
      // toast.error(
      //   "Each image must be unique. This image has already been uploaded."
      // );
      // return;
    }

    if (file.size > 10 * 1024 * 1024) {
      newErrors.image = `Image size must not exceed 10MB.`;
      // toast.error("Image size must not exceed 10MB.");
      // return;
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newImageUrl = URL.createObjectURL(file);

    const newImages = [...images];
    newImages[selectedIndex] = { file, url: newImageUrl };
    setImages(newImages);
  };

  useEffect(() => {
    // setIsLoading(true);
    axios.get(`${PHARMACY_URL}/product/getcategory`).then((res) => {
      console.log(res?.data);
      if (res?.status === 200) {
        // setIsLoading(false);
        setSelectedCategory(res?.data?.data);
      }
    });
  }, []);
  const handleDelete = (index) => {
    console.log(index);
    const updatedImages = [...images];
    updatedImages[index] = null;
    setImages(updatedImages);
  };
  const handleBackClick = () => {
    setChangeDashboards({
      productmanagement: !Details.id ? true : false,
      productmanagementOrderDetail: Details.id ? true : false,
    });
  };

  const handleChangeCategory = (event) => {
    const {
      target: { value },
    } = event;

    setproduct((prevdata) => ({
      ...prevdata,
      category: value,
    }));
  };
  const handleChangeMedicineType = (event) => {
    const {
      target: { value },
    } = event;

    setproduct((prevdata) => ({
      ...prevdata,
      product_type: value,
    }));
  };
  const handleChangeUnitMeasure = (event) => {
    const {
      target: { value },
    } = event;

    setproduct((prevdata) => ({
      ...prevdata,
      unit_of_measurement: value,
    }));
  };

  console.log("product", product);
  return (
    <div
      className="productlistInput"
      style={{ padding: ".5rem", paddingTop: "1rem" }}
    >
      <div className="adpha-left">
        <button onClick={handleBackClick} className="adpha-back-button">
          <i className="ri-arrow-left-line"></i>
        </button>
        <span className="adpha-title">
          {product?.id ? "Edit Product " : "Add New Product"}
        </span>
      </div>

      <div className="addproductadmin">
        <div className="addproductadmin-input">
          <div className="addproductadmin-input-box">
            <h4>
              Name <span className="required">*</span>
            </h4>
            <input
              type="text"
              name="name"
              maxLength={40}
              value={product?.name}
              onChange={handlechange}
            />
          </div>

          <div className="addproductadmin-input-box">
            <h4>
              Category <span className="required">*</span>
            </h4>
            <div className="multiselector">
              <FormControl sx={{ m: 1, width: 300, border: "none" }}>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={product?.category ?? []}
                  onChange={handleChangeCategory}
                  input={
                    <OutlinedInput
                      sx={{
                        height: "40px",
                        marginTop: "2px",
                        border: "none",
                        borderRadius: "6px",
                        backgroundColor: "#DADCFF",
                      }}
                    />
                  }
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {selectedCategory &&
                    selectedCategory.length > 0 &&
                    selectedCategory.map((category) => (
                      <MenuItem
                        key={category.category}
                        value={category.category}
                      >
                        <Checkbox
                          checked={
                            Array.isArray(product?.category) &&
                            product.category.includes(category.category)
                          }
                        />
                        <ListItemText primary={category.category} />
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="addproductadmin-input-box">
            <h4>
              Brand <span className="required">*</span>
            </h4>
            <input
              type="text"
              maxLength={40}
              name="brand"
              value={product?.brand}
              onChange={handlechange}
            />
          </div>

          <div className="addproductadmin-input-box">
            <h4>
              Price <span className="required">*</span>{" "}
            </h4>
            <input
              type="number"
              name="mrp"
              maxLength={5}
              value={product?.mrp}
              onChange={handlechange}
            />
          </div>
          <div className="addproductadmin-input-box">
            <h4>
              Hsn<span className="required">*</span>
            </h4>
            <input
              type="string"
              name="hsn"
              maxLength={30}
              value={product?.hsn}
              onChange={handlechange}
            />
          </div>
          {Array.isArray(product?.category) &&
            product.category.includes("MEDICINES") && (
              <div className="addproductadmin-input-box">
                <h4>
                  Medicine type <span className="required">*</span>
                </h4>
                <div className="multiselector">
                  <FormControl sx={{ m: 1, width: 300, border: "none" }}>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      value={product?.product_type || ""}
                      onChange={handleChangeMedicineType}
                      input={
                        <OutlinedInput
                          sx={{
                            height: "40px",
                            marginTop: "2px",
                            border: "none",
                            borderRadius: "6px",
                            backgroundColor: "#DADCFF",
                          }}
                        />
                      }
                      MenuProps={MenuProps}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="tablet">Tablet</MenuItem>
                      <MenuItem value="capsule">Capsule</MenuItem>
                      <MenuItem value="syrup">Syrup</MenuItem>
                      <MenuItem value="injection">Injection</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            )}

          {Array.isArray(product?.category) &&
            product.category.includes("MEDICINES") && (
              <div className="addproductadmin-input-box">
                <h4>
                  Unit Of Measurement <span className="required">*</span>
                </h4>
                <div className="multiselector">
                  <FormControl sx={{ m: 1, width: 300, border: "none" }}>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      value={product?.unit_of_measurement || ""}
                      onChange={handleChangeUnitMeasure}
                      input={
                        <OutlinedInput
                          sx={{
                            height: "40px",
                            marginTop: "2px",
                            border: "none",
                            borderRadius: "6px",
                            backgroundColor: "#DADCFF",
                          }}
                        />
                      }
                      MenuProps={MenuProps}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="strip">Strip</MenuItem>
                      <MenuItem value="piece">Piece</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            )}
          {Array.isArray(product?.category) &&
            product.category.includes("MEDICINES") && (
              <div className="addproductadmin-input-box">
                <h4>
                  Unit <span className="required">*</span>{" "}
                </h4>
                <input
                  type="number"
                  name="medicine_unit"
                  maxLength={5}
                  value={product?.medicine_unit}
                  onChange={handlechange}
                />
              </div>
            )}
        </div>

        <div className="addimagediscription flex">
          <div className="newdtwt">
            <h4>
              Add Images <span className="required">*</span>
            </h4>

            {Details ? (
              <div className="addimage-images-new">
                {images &&
                  images.map((image, index) => (
                    <div style={{ position: "relative" }}>
                      {image && (
                        <button
                          onClick={() => handleDelete(index)}
                          className="delete-product-img"
                        >
                          <i className="ri-delete-bin-6-fill"></i>
                        </button>
                      )}
                      <div
                        key={index}
                        className="addimage-ima flex"
                        onClick={() => handleUploadClick(index)}
                        style={{
                          backgroundImage: image?.file
                            ? `url(${image.url})`
                            : `url(${image})`,
                          backgroundSize: "contain",
                          backgroundPosition: "center",
                        }}
                      >
                        {!image && <i className="ri-add-circle-line"></i>}

                        {!image && <h4>Click To Upload</h4>}
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={(e) => handleFileChange(e, index)}
                        accept=".png"
                      />
                    </div>
                  ))}
              </div>
            ) : (
              <div className="addimage-images-new">
                {images &&
                  images.map((image, index) => (
                    <div
                      key={index}
                      className="addimage-ima flex"
                      onClick={() => handleUploadClick(index)}
                      style={{
                        backgroundImage: image ? `url(${image.url})` : "none",
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      {!image && <i className="ri-add-circle-line"></i>}
                      {!image && <h4>Click To Upload</h4>}
                      {image && (
                        <button
                          onClick={() => handleDelete(index)}
                          className="delete-product-img"
                        >
                          <i className="ri-delete-bin-6-fill"></i>
                        </button>
                      )}
                    </div>
                  ))}

                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
            )}

            <h4 style={{ marginTop: "10px" }}>
              Image must be a PNG with a transparent background
            </h4>
            {errors.image && (
              <p
                style={{ color: "red", fontSize: "0.9rem" }}
                className="error-message"
              >
                {errors.image}
              </p>
            )}
          </div>

          <div className="addimage-discription-new">
            <h4>
              Description <span className="required">*</span>
            </h4>
            <textarea
              name="description"
              maxLength={400}
              value={product?.description}
              id=""
              onChange={handlechange}
            ></textarea>
          </div>
        </div>

        <div className="addproductbutton flex">
          {errors.all && (
            <p
              style={{ color: "red", fontSize: "0.9rem" }}
              className="error-message"
            >
              {errors.all}
            </p>
          )}

          <button onClick={navigateFn}>Continue</button>
        </div>
      </div>
    </div>
  );
}
