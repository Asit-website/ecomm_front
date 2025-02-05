"use client"
import { createContext, useEffect, useState } from 'react';
import '../styles/styles.scss';
import { Head } from 'next/document';


export const CartContext = createContext();

const MyApp = ({ Component, pageProps }) => {

  const [cart, setCart] = useState([]);

  const [token , setToken] = useState(null);

  const [userDetails , setUserDetails] = useState(null);

  const [wishlist , setWishlist] = useState([]);

  const clearCart = async () => {
    if (token) {
      try {
        // Call the API to empty the cart
        const response = await fetch(
          "http://localhost:4000/api/v1/empty", // Replace with the correct endpoint
          {
            method: "DELETE", // Use DELETE to empty the cart
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        const formattedResponse = await response.json();
  
        if (formattedResponse?.success) {
          // If the cart is successfully emptied, update the state
          setCart([]);
          console.log("Cart successfully emptied!");
        } else {
          console.error("Failed to empty cart:", formattedResponse.message);
        }
      } catch (error) {
        console.error("Error while emptying the cart:", error);
      }
    } else {
      console.error("No token found. User is not logged in.");
    }
  };
  
const fetchAllCartItem = async()=>{

   let token = localStorage.getItem("ecomm_userToken");

    if(token){
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


   if(formattedResponse?.success){
              
setCart(formattedResponse?.cartItems);
    }
  } catch (error) {
    console.log(error);
  }
} else{
  setCart([]);
}
}

const fetchAllWishlistItem = async()=>{
 let token = localStorage.getItem("ecomm_userToken");

 if(token){
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
}
else{
  setWishlist([]);
}

}


useEffect(()=>{
  if(localStorage.getItem("ecomm_userToken")){
  setToken(localStorage.getItem("ecomm_userToken"));
 }

 if(localStorage.getItem("ecomm_user")){
  const checkUser = localStorage.getItem("ecomm_user");
  var storedUserObject = JSON.parse(checkUser);
  setUserDetails(storedUserObject);
 }
 fetchAllCartItem();
 fetchAllWishlistItem();
},[])


  return (
    <>
   
    <CartContext.Provider value={{ cart, clearCart, setCart, token , userDetails , setToken , setUserDetails , wishlist , fetchAllCartItem , fetchAllWishlistItem }}>
      <Component {...pageProps} />
    </CartContext.Provider>
   
    </>
  );
};

export default MyApp;
