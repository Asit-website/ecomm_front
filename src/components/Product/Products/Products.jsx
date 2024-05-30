import { CartContext } from 'pages/_app';
import { useContext } from 'react';
import { SingleProduct } from './SingleProduct/SingleProduct';

export const Products = ({ products }) => {
  const { cart ,wishlist , token , fetchAllCartItem , fetchAllWishlistItem } = useContext(CartContext); 

  const handleAddToCart = async(id) => {

    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/addToCart/${id}`,
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

  };

  const handleAddToWishlist = async(id)=>{
    try {
      const response = await fetch(`http://localhost:4000/api/v1/addToWishlist/${id}`,
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

  console.log("rere");

  return (
    <>
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
    </>
  );
};
