"use client"
import { createContext, useEffect, useState } from 'react';
import '../styles/styles.scss';
import { Head } from 'next/document';


export const CartContext = createContext();

const MyApp = ({ Component, pageProps }) => {

  const [cart, setCart] = useState([]);
  const [cupons, setCupons] = useState([]);
  const [token, setToken] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [amount, setAmount] = useState();

  // Fetch all cart items
  const fetchAllCartItem = async () => {

    let token = localStorage.getItem("ecomm_userToken");

    if (token) {
      try {
        const response = await fetch(
          "https://ecomm-backend-aopz.onrender.com/api/v1/fetchAllCartItems",
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,

            },
          }
        );

        const formattedResponse = await response.json();

        if (formattedResponse?.success) {
          setCart(formattedResponse?.cartItems);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setCart([]);
    }
  };

  // Fetch all wishlist items
  const fetchAllWishlistItem = async () => {
    const token = localStorage.getItem("ecomm_userToken");

    if (token) {
      try {
        const response = await fetch(
          "https://ecomm-backend-aopz.onrender.com/api/v1/fetchAllWishlistItem",
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const formattedResponse = await response.json();
        setWishlist(formattedResponse?.wishlistItem);
      } catch (error) {
        console.log(error);
      }
    } else {
      setWishlist([]);
    }
  };

  // Fetch all cupons
  const fetchAllCupons = async () => {
    try {
      const response = await fetch(
        "https://ecomm-backend-aopz.onrender.com/api/v1/getCupons",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      setCupons([...data.data]);
    } catch (error) {
      console.log(error);
    }
  };

  // Apply coupon
  const applyCoupon = async (couponId) => {
    try {
      const user = JSON.parse(localStorage.getItem("ecomm_user"));
      if (!user || !user._id) {
        throw new Error("User not found.");
      }

      const userId = user._id;

      const response = await fetch("https://ecomm-backend-aopz.onrender.com/api/v1/apply-coupon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          couponId: couponId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.cartTotal) {
        setAmount(data.cartTotal);
        localStorage.setItem("Coupon", JSON.stringify({
          cartTotal: data.cartTotal,
          coupon: data.coupon,
        }));
        console.log("Updated Amount:", data.cartTotal);
      } else {
        throw new Error("Invalid response data. No cartTotal found.");
      }

    } catch (error) {
      console.error("Error applying coupon:", error.message);
    }
  };

  // Calculate total from the cart
  const total = cart.reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity),
    0
  );

  const clearCart = async () => {
    try {
      const token = localStorage.getItem("ecomm_userToken");
      const response = await fetch('https://ecomm-backend-aopz.onrender.com/api/v1/removeAllFromCart', {
        method: "POST",
        headers: {
          "content-type": "application/json", Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json();
      setCart([])
      console.log(data)

    } catch (error) {
      console.error("Error applying coupon:", error.message);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("ecomm_userToken")) {
      setToken(localStorage.getItem("ecomm_userToken"));
    }

    if (localStorage.getItem("ecomm_user")) {
      const checkUser = localStorage.getItem("ecomm_user");
      const storedUserObject = JSON.parse(checkUser);
      setUserDetails(storedUserObject);
    }

    fetchAllCartItem();
    fetchAllWishlistItem();
    fetchAllCupons();
  }, []);

  return (
    <>
      <CartContext.Provider
        value={{
          cart, setCart, cupons, token, setAmount, clearCart, userDetails, total, amount, setToken, setUserDetails, wishlist, fetchAllCartItem, fetchAllWishlistItem, applyCoupon,
        }}
      >
        <Component {...pageProps} />
      </CartContext.Provider>
    </>
  );
};

export default MyApp;
