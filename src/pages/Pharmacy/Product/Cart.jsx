import React, { useEffect, useState } from "react";
import { useIsMobileScreen } from "../../../hooks/useIsMobileScreen";
import CartList from "../../../pages/Customer/Mobile/Pharmacy/cart/CartList";
import { Loader } from "../../../components/Loader/Loader";
import CartDesktop from "./CartDesktop";
import { BASE_URL } from "../../../config";
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
  });
  const isMobile = useIsMobileScreen();
  const { cartItems, refetchCart } = usePharmacyContext();
  const { auth } = useAuth();
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

  const totalPrice = () => {
    if (cartItems && cartItems.length > 0) {
      const totalMRP = cartItems.reduce((accumulator, product) => {
        return (accumulator + product.mrp) * product.quantity;
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
    };

    const response = await axiosPrivate.post(
      `${BASE_URL}/pharmacy//salesorder`,
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
    if (!details.contact_no) {
      toast.error("Contact Number is missing");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(details.contact_no)) {
      toast.error(
        "Invalid Contact Number. It should be a valid 10-digit number."
      );
      return;
    }
    if (!details.delivery_details || details.delivery_details === "") {
      toast.error("Delivery details is missing");
      return;
    }
    if (!details.pincode) {
      toast.error("Pincode is missing");
      return false;
    }

    const pincodeLength = details.pincode.toString().length;
    if (!details.pincode) {
      toast.error("Pincode is missing");
      return false;
    }
    if (pincodeLength !== 6) {
      toast.error("Pincode must be 6 digits long");
      return false;
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
      `${BASE_URL}/googlemap/getcurrentlocation`,
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
      console.log({data})
      setDetails({ ...details, delivery_details: data.formattedAddress,pincode:data.postalCode });
      setGettingLocationLoading(false);
    },
    onError: () => setGettingLocationLoading(false), 
  });
  // Get user's current position using the Geolocation API
  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      alert("Geolocation is not supported by this browser.");
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
    fetchLocationMutationPending :fetchLocationMutation.isPending,
    gettingLocationLoading
  };

  return (
    <>
      {isMobile ? <CartList {...cartProps} /> : <CartDesktop {...cartProps} />}
    </>
  );
}

export default Cart;
