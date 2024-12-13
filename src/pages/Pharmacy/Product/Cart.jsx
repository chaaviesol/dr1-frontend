import React, { useEffect, useState } from "react";
import { useIsMobileScreen } from "../../../hooks/useIsMobileScreen";
import CartList from "../../../pages/Customer/Mobile/Pharmacy/cart/CartList";
import { Loader } from "../../../components/Loader/Loader";
import CartDesktop from "./CartDesktop";
import { BASE_URL, PHARMACY_URL } from "../../../config";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { usePharmacyContext } from "../../../contexts/PharmacyContext";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import axios from "axios";

function Cart() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [gettingLocationLoading, setGettingLocationLoading] = useState(false);
  const [details, setDetails] = useState({
    delivery_details: "",
    contact_no: "",
    pincode: "",
    city: "",
    district: "",
  });
  const isMobile = useIsMobileScreen();
  const { cartItems, refetchCart } = usePharmacyContext();
  const { auth } = useAuth();
  const [errors, setErrors] = useState({});
  const { userId, userType } = auth;
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    if (isMobile !== undefined) {
      setIsLoading(false);
    }
  }, [isMobile]);

  const handleSelect = (id) => {
    setSelectedItemId(id);
  };

  useEffect(() => {
    const fetchContactNumber = async () => {
      try {
        const response = await axiosPrivate.post(
          `${PHARMACY_URL}/user/getprofile`
        );
        const contact_no = parseInt(response?.data?.userDetails?.phone_no);
        const pincode = parseInt(response?.data?.userDetails?.pincode);

        setDetails({
          ...details,
          contact_no: contact_no,
          pincode: pincode,
        });
      } catch (err) {
        console.error("Error fetching contact number:", err);
      }
    };

    fetchContactNumber();
  }, []);

  const totalPrice = () => {
    if (cartItems && cartItems.length > 0) {
      const totalMRP = cartItems.reduce((accumulator, product) => {
        return accumulator + product.mrp * product.quantity;
      }, 0);
      return totalMRP;
    } else {
      return 0;
    }
  };

  const placeOrder = async (address) => {
    const payload = {
      order_type: "salesorder",
      products: cartItems,
      total_amount: totalPrice(),
      delivery_address: address.delivery_details,
      contact_no: address?.contact_no,
      pincode: address?.pincode,
      city: address?.city,
      district: address?.district,
      delivery_location: address?.delivery_location,
    };

    const response = await axiosPrivate.post(
      `${PHARMACY_URL}/pharmacy/salesorder`,
      payload
    );
    return response;
  };

  const placeOrderMutation = useMutation({
    mutationKey: ["placeOrder", userId],
    mutationFn: (address) => placeOrder(address),
    onSuccess: (res) => {
      toast.success(res.data.message);
      refetchCart();
      navigate(-1);
    },
  });
  const handleCheckout = async (address) => {
    console.log(address);
    if (!userId && userType !== "customer") {
      toast.info("Please login as a customer!");
      return;
    }

    try {
      await placeOrderMutation.mutateAsync(address);
    } catch (err) {
      toast.error("Error in order placing");
    }
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    if (name === "contact_no") {
      const sanitizedValue = value.replace(/[.-]/g, "");
      const truncatedValue = sanitizedValue.slice(0, 10);
      setDetails({ ...details, [name]: truncatedValue });
    } else if (name === "pincode") {
      const sanitizedValue = value.replace(/[.-]/g, "");
      const truncatedValue = sanitizedValue.slice(0, 6);
      setDetails({ ...details, [name]: truncatedValue });
    } else {
      setDetails((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const HandleOnclick = async (e) => {
    const newErrors = {};
    if (!details.contact_no) {
      newErrors.contact_norequired = "Contact number is required";
    }
    if (!/^[6-9]\d{9}$/.test(details.contact_no)) {
      newErrors.contact_no = "Invalid contact number.";
    }
    if (!details.delivery_details || details.delivery_details === "") {
      newErrors.delivery_details = "Delivery address is required";
    }
    if (!details.city || details.city === "") {
      newErrors.city = "City name is required";
    }
    if (!details.district || details.district === "") {
      newErrors.district = "District name is required";
    }
    if (!details.pincode) {
      newErrors.pincoderequired = "Pincode is required";
    }

    const pincodeLength = details.pincode.toString().length;
    if (pincodeLength !== 6) {
      newErrors.pincode = "Invalid pincode";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    handleCheckout(details);
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

  const fetchLocation = async (lat, lng) => {
    const response = await axios.post(
      `${PHARMACY_URL}/googlemap/getcurrentlocation`,
      {
        lat,
        lng,
      }
    );
    return response.data;
  };

  const fetchLocationMutation = useMutation({
    mutationKey: ["fetchLocationMutation"],
    mutationFn: ({ lat, lng }) => fetchLocation(lat, lng),
    onMutate: () => setGettingLocationLoading(true),
    onSuccess: (data) => {
      console.log({ data });
      setDetails({
        ...details,
        delivery_details: data.formattedAddress,
        city: data.streetAddress,
        district: data.district,
        pincode: data.postalCode,
        delivery_location: data.location,
      });
      setGettingLocationLoading(false);
    },
    onError: () => setGettingLocationLoading(false),
  });
  // Get user's current position using the Geolocation API
  function getCurrentLocation() {
    setGettingLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      alert("Geolocation is not supported by this browser.");
      setGettingLocationLoading(false);
    }
  }

  function success(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    fetchLocationMutation.mutateAsync({ lat, lng });
  }

  function error() {
    alert("Unable to retrieve your location.");
    setGettingLocationLoading(false);
  }

  if (isLoading) {
    return <Loader />;
  }

  const cartProps = {
    selectedItemId,
    handleCheckout,
    totalPrice,
    handleSelect,
    orderPending: placeOrderMutation.isPending,
    isModalOpen2,
    setIsModalOpen2,
    details,
    setDetails,
    handleOnchange,
    HandleOnclick,
    handleKeyPress,
    getCurrentLocation,
    fetchLocationMutationPending: fetchLocationMutation.isPending,
    gettingLocationLoading,
    errors,
    setErrors,
  };

  return (
    <>
      {isMobile ? <CartList {...cartProps} /> : <CartDesktop {...cartProps} />}
    </>
  );
}

export default Cart;
