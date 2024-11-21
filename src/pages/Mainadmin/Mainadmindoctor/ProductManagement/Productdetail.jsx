import React, { useState } from "react";
import "./addproduct.css";
import axios from "axios";
import { BASE_URL } from "../../../../config";
import { toast } from "react-toastify";
import { Loader } from "../../../../components/Loader/Loader";
export default function Productdetail({
  updateState: { setChangeDashboards, setDetailData },
  Details,
}) {
  const [datastate, Setdatastate] = useState(() => {
    if (Details?.data) {
      return Details.data;
    } else if (Details) {
      return Details;
    } else {
      return {};
    }
  });

  console.log({ datastate });

  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const publishbutton = async () => {
    setIsLoading(true);

    try {
      const formData = new FormData();

      datastate.images.forEach((image) => {
        console.log("Appending image:", image.file);
        if (image.file instanceof File) {
          formData.append("images", image.file);
        }
      });

      // Append other form data as JSON
      formData.append(
        "data",
        JSON.stringify({
          id: datastate?.id,
          brand: datastate.brand,
          category: datastate.category,
          description: datastate.description,
          mrp: datastate.mrp,
          name: datastate.name,
          images: datastate?.images,
          hsn:datastate?.hsn
        })
      );

      // Log FormData entries for debugging
      console.log("FormData entries:");
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      const response = await axios.post(
        `${BASE_URL}/pharmacy/productadd`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response);
      if (response.status === 200) {
        setIsLoading(false);
        toast.success(response?.data?.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => setChangeDashboards({ productmanagement: true }),
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload product");
    } finally {
      setIsLoading(false);
    }
  };
  const navigateEdit = () => {
    setDetailData(datastate);
    setChangeDashboards({ addproduct: true });
  };

  const navigateDelete = async () => {
    setIsLoading(true);
    try {
      const data = {
        id: datastate?.id,
      };
      const response = await axios.post(
        `${BASE_URL}/pharmacy/disableproduct`,
        data
      );
      if (response.status === 200) {
        setIsLoading(false);
        toast.success(response?.data?.message);
        setChangeDashboards({ productmanagement: true });
      }
      console.log("Product disabled successfully:", response.data);
    } catch (error) {
      console.error("Error disabling product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      <div className="adpha-topcontainer">
        <div class="adpha-left">
          <button
            onClick={() => setChangeDashboards({ productmanagement: true })}
            class="adpha-back-button"
          >
            <i class="ri-arrow-left-line"></i>
          </button>
          <span class="adpha-title">Product Details</span>
        </div>
        <div className="manageprotop-right flex">
          {datastate?.mode === "view" ? (
            <button
              className="flex"
              onClick={publishbutton}
              style={{ backgroundColor: "#059669" }}
            >
              <i class="ri-send-plane-fill"></i>
              <span>Publish</span>
            </button>
          ) : (
            <>
              <button
                className="flex"
                style={{ backgroundColor: "#ea580c" }}
                onClick={navigateEdit}
              >
                {/* <i className="ri-close-circle-line"> */}
                <i className="ri-edit-line"> </i>
                <span>Edit</span>
              </button>
              <button
                className="flex"
                style={{ backgroundColor: "#e11d48" }}
                onClick={navigateDelete}
              >
                <i className="ri-delete-bin-2-line"></i>
                <span>Delete</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="detailssectionpro">
        {datastate.images && Object.keys(datastate.images).length > 0 ? (
          <div className="detailssectionproleft">
            <div className="detailssectionproleftbottom">
              <div className="allimagespro ">
                {" "}
                <img
                  src={
                    datastate?.images?.image1 ||
                    datastate?.images[0]?.url ||
                    datastate?.images[0]
                  }
                  onClick={() => setSelectedImageIndex(0)}
                  alt=""
                />{" "}
              </div>
              <div className="allimagespro ">
                {" "}
                <img
                  src={
                    datastate?.images?.image2 ||
                    datastate?.images[1].url ||
                    datastate?.images[1]
                  }
                  onClick={() => setSelectedImageIndex(1)}
                  alt=""
                />{" "}
              </div>
              <div className="allimagespro">
                {" "}
                <img
                  src={
                    datastate?.images?.image3 ||
                    datastate?.images[2].url ||
                    datastate?.images[2]
                  }
                  onClick={() => setSelectedImageIndex(2)}
                  alt=""
                />{" "}
              </div>
              <div className="allimagespro">
                {" "}
                <img
                  src={
                    datastate?.images?.image4 ||
                    datastate?.images[3]?.url ||
                    datastate?.images[3]
                  }
                  onClick={() => setSelectedImageIndex(3)}
                  alt=""
                />
              </div>
            </div>
            <div className="detailssectionprolefttop flex">
              <img
                style={{
                  objectFit: "contain",
                  backgroundRepeat: "no-repeat",
                  height: "100%",
                }}
                alt=""
                src={
                  datastate?.images?.[`image${selectedImageIndex + 1}`] ||
                  datastate?.images[selectedImageIndex]?.url ||
                  datastate?.images[selectedImageIndex]
                }
              />
            </div>
          </div>
        ) : (
          <div className="detailssectionproleft">
            <div className="detailssectionproleftbottom">
              <div className="allimagespro ">
                {" "}
                <img
                  src={datastate?.images?.image1}
                  onClick={() => {
                    setSelectedImageIndex(0);
                  }}
                  alt=""
                />{" "}
              </div>
              <div className="allimagespro ">
                {" "}
                <img
                  src={datastate?.images?.image2}
                  onClick={() => {
                    setSelectedImageIndex(1);
                  }}
                  alt=""
                />{" "}
              </div>
              <div className="allimagespro">
                {" "}
                <img
                  src={datastate?.images?.image3}
                  onClick={() => {
                    setSelectedImageIndex(2);
                  }}
                  alt=""
                />{" "}
              </div>
              <div className="allimagespro">
                {" "}
                <img
                  src={datastate?.images?.image4}
                  onClick={() => {
                    setSelectedImageIndex(3);
                  }}
                  alt=""
                />
              </div>
            </div>
            <div className="detailssectionprolefttop flex">
              <img
                style={{
                  objectFit: "contain",
                  backgroundRepeat: "no-repeat",
                  height: "100%",
                }}
                alt=""
                src={datastate?.images?.[`image${selectedImageIndex + 1}`]}
              />
            </div>
          </div>
        )}
        <div className="detailssectionproright">
          <h4>{datastate?.brand}</h4>
          <h3>{datastate?.name}</h3>
          <h3>{datastate?.hsn}</h3>
          <h3 style={{ color: "#4f4f4f", fontSize: "24px", marginTop: "10px" }}>
            ₹ {datastate?.mrp}
          </h3>
          <div className="categoryadmin_show">{datastate?.category}</div>
          <h6 style={{  fontSize: "14px", marginTop: "10px" }}>HSN:{datastate?.hsn}</h6>
          <div className="detailssectionprorightdis">
            <h4>Description</h4>
            <span className="priscriptionpara">{datastate?.description}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
