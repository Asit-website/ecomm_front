"use client"
import {
  SlickArrowPrev,
  SlickArrowNext,
} from 'components/utils/SlickArrows/SlickArrows';
import { CartContext } from 'pages/_app';
import { useContext } from 'react';
import Slider from 'react-slick';
import { SingleProduct } from './SingleProduct/SingleProduct';

export const ProductsCarousel = ({ products }) => {

  const { cart ,wishlist , token , fetchAllCartItem , fetchAllWishlistItem , setCart } = useContext(CartContext); 

  const handleAddToCart = async(id , product) => {

    if(token){
      try {
        const response = await fetch(
          `https://ecomm-backend-aopz.onrender.com/api/v1/addToCart/${id}`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
  
            },
          }
        );
  
        const formattedResponse = await response.json();
  
  
         if(formattedResponse.success){
          alert("successfuly added to cart");
  
          fetchAllCartItem();
         }
        
  
      } catch (error) {
        console.log(error);
      }
    }
    else{

    let cartItems = JSON.parse(sessionStorage.getItem("cart_items")) || [];

    const isAlreadyInCart = cartItems.some(
      (item) => item?._id === product?._id
    );

    if (isAlreadyInCart) {
      return alert("Already added to cart");
    }

    cartItems.push(product);
    sessionStorage.setItem("cart_items", JSON.stringify(cartItems));
    
    
    setCart([...cart , product])

    alert("Successfully added to cart");

    }

  };

  const handleAddToWishlist = async(id)=>{
    try {
      const response = await fetch(`https://ecomm-backend-aopz.onrender.com/api/v1/addToWishlist/${id}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,

          },
        }
      );

      const formattedResponse = await response.json();

       if(formattedResponse.success){
         alert("successfuly added to wishlist");
         fetchAllWishlistItem();
       }
       else {
        alert(formattedResponse.message)
       }


    } catch (error) {
      console.log(error);
    }
  }

  const settings = {
    dots: false,
    infinite: false,
    arrows: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <SlickArrowPrev />,
    nextArrow: <SlickArrowNext />,
    lazyLoad: 'progressive',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };


  return (
    <>
      <Slider {...settings}>
        {products?.map((product) => (
          <SingleProduct
          
            addedInCart={Boolean(cart?.find((pd) => pd._id === product._id))}
            addedInWishlist = {Boolean(wishlist?.find((wish)=>wish._id === product._id))}
            key={product._id}
            product={product}
            onAddToWish={handleAddToWishlist}
            onAddToCart={handleAddToCart}
          />
        ))}
      </Slider>
    </>
  );
};
