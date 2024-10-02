import { useState, createContext, useContext, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { BASE_URL } from "../config";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const PharmacyContext = createContext();

const PharmacyProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const { userId, userType } = auth;
  const fetchUserCart = async (id) => {
    const response = await axiosPrivate.get(`${BASE_URL}/pharmacy/getcart`);
    return response.data.data;
  };

  const {
    data: cartData,
    isLoading: isCartLoading,
    refetch: refetchCart,
  } = useQuery({
    queryKey: ["fetchCart", userId],
    queryFn: () => fetchUserCart(userId),
    enabled: !!userId && userType === "customer",
  });

  useEffect(() => {
    if (!isCartLoading) {
      if (cartData && cartData.length < 1) {
        setCartItems([]);
      } else {
        setCartItems(cartData);
      }
    }
  }, [cartData]);

  return (
    <PharmacyContext.Provider
      value={{
        cartItems,
        setCartItems,
        refetchCart,
        isCartLoading,
      }}
    >
      {children}
    </PharmacyContext.Provider>
  );
};

export default PharmacyProvider;

export const usePharmacyContext = () => useContext(PharmacyContext);
