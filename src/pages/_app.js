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


const fetchAllCartItem = async()=>{

   let token = localStorage.getItem("ecomm_userToken");

    if(token){
  try {
    const response = await fetch(
      "http://localhost:4000/api/v1/fetchAllCartItems",
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
      "http://localhost:4000/api/v1/fetchAllWishlistItem",
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
   
    <CartContext.Provider value={{ cart, setCart, token , userDetails , setToken , setUserDetails , wishlist , fetchAllCartItem , fetchAllWishlistItem }}>
      <Component {...pageProps} />
    </CartContext.Provider>
   
    </>
  );
};

export default MyApp;
