import productData from 'data/product/product';
import { Card } from './Card/Card';
import Link from 'next/link';
import { useContext } from 'react';
import { CartContext } from 'pages/_app';

export const Wishlist = () => {
  const wishItems = [...productData].slice(0, 2);
  wishItems[1].isStocked = false;

 const {wishlist , fetchAllWishlistItem} = useContext(CartContext);

 const clearWishlistHandler = async()=>{
  let token = localStorage.getItem("ecomm_userToken");
  try {
    const response = await fetch(
      "http://localhost:4000/api/v1/removeAllWislist",
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,

        },
      }
    );

    const formattedResponse = await response.json();     
    

    if(formattedResponse.success){
      alert("successfuly delete all wishlist");
 fetchAllWishlistItem();
    }
    else{
      alert(formattedResponse.message);
    }
  
  } catch (error) {
    console.log(error);
  }
 }


  return (
    <>
      {/* <!-- BEGIN WISHLIST --> */}
      <div className='wishlist'>
        <div className='wrapper'>
          <div className='cart-table'>
            <div className='cart-table__box'>
              <div className='cart-table__row cart-table__row-head'>
                <div className='cart-table__col'>Product</div>
                <div className='cart-table__col'>Price</div>
                {/* <div className='cart-table__col'>status</div> */}
                <div className='cart-table__col'>Add to cart</div>
              </div>

              {wishlist.map((wish) => (
                <Card key={wish.id} wish={wish} />
              ))}
            </div>
          </div>
          <div  className='wishlist-buttons'>
            <a onClick={clearWishlistHandler} href='#' className='btn btn-grey'>
              clear Wishlist
            </a>
            <Link href='/shop'>
              <a className='btn'>go shopping</a>
            </Link>
          </div>
        </div>
        <img
          className='promo-video__decor js-img'
          data-src='/assets/img/promo-video__decor.jpg'
          alt=''
        />
      </div>
      {/* <!-- WISHLIST EOF   --> */}
    </>
  );
};
