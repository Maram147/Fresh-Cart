import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const CartContext = createContext(null);

export default function CartContextProvider({ children }) {
  const { userLogin } = useContext(UserContext);
  const [cart, setCart] = useState(0);

  const headers = { token: userLogin };

  function getCartItem() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers });
  }

  function addToCart(productId) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId }, { headers });
  }

  function removeCartItem(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers });
  }

  function updateCartItem(productId, count) {
    return axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { count },
      { headers }
    );
  }

  function checkOut(cartId, url, formValue) {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
      { shippingAddress: formValue },
      { headers }
    );
  }

  async function getCart() {
    try {
      const response = await getCartItem();
      if (response?.data?.status === "success") {
        setCart(response.data);
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  }

  useEffect(() => {
    if (userLogin) {
      getCart();
    }
  }, [userLogin]);

  return (
    <CartContext.Provider
      value={{ checkOut, cart, setCart, addToCart, getCartItem, removeCartItem, updateCartItem }}
    >
      {children}
    </CartContext.Provider>
  );
}
