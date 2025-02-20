import { Card } from './Card/Card';
import socialData from 'data/social';
import { CartContext } from 'pages/_app';
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const Cart = () => {
  const router = useRouter();
  const { cart, cupons, total, amount, setAmount, applyCoupon , token } = useContext(CartContext);

  const [count, setCount] = useState(0);
  
  const socialLinks = [...socialData];
  const [inputValue, setInputValue] = useState('');
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const handleCouponSelection = (event) => {
    const coupon = cupons.find(cupon => cupon._id === event.target.value);
    if (coupon) {
      applyCoupon(coupon._id);
    }
    setInputValue(coupon ? coupon.title : '');
    setAmount(total);
    setSelectedCoupon(coupon || null);
  };

  const handleProductQuantity =async (change, quantity, id) => {

    const token = localStorage.getItem("ecomm_userToken");


    try{

      const response = await fetch(`https://ecomm-backend-aopz.onrender.com/api/v1/productQuantity/${id}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,

        },
        body: JSON.stringify({change})
      }

    );


     const data = await response.json();

     console.log("data" ,data);

    } catch(error){
      console.log(error);
      
    }

    if (change === 'increment') {
      cart.find((item) => item._id === id).quantity = quantity + 1;
      setCount(count + 1);
    }
    if (change === 'decrement' && quantity > 1) {
      cart.find((item) => item._id === id).quantity = quantity - 1;
      setCount(count + 1);
    }
  };

  useEffect(() => {
    const savedCoupon = JSON.parse(localStorage.getItem("Coupon"));

    if (savedCoupon) {
      setAmount(savedCoupon.cartTotal);
      setInputValue('');
      setSelectedCoupon(savedCoupon.coupon);
      console.log("Using saved coupon amount:", savedCoupon.cartTotal);
    }

    if (cart.length <= 0) localStorage.removeItem("Coupon");
  }, [cart]);

  return (
    <>
      {/* <!-- BEGIN CART --> */}
      <div className='cart'>
        <div className='wrapper'>
          <div className='cart-table'>
            <div className='cart-table__box'>
              <div className='cart-table__row cart-table__row-head'>
                <div className='cart-table__col'>Product</div>
                <div className='cart-table__col'>Price</div>
                <div className='cart-table__col'>Quantity</div>
                <div className='cart-table__col'>Total</div>
                <div className='cart-table__col'>Remove</div>
              </div>

              {cart.map((cart) => (
                <Card
                  onChangeQuantity={(change, quantity) =>
                    handleProductQuantity(change, quantity, cart._id)
                  }
                  key={cart._id}
                  cart={cart}
                />
              ))}
            </div>
          </div>
          <div className='cart-bottom'>
            <div className='cart-bottom__promo'>
              <form className='cart-bottom__promo-form'>
                <div className='box-field__row'>
                  <div className='box-field'>
                    <select
                      style={{ width: '100%', height: '60px', padding: '20px', fontSize: '14px' }}
                      onChange={handleCouponSelection}
                    >
                      <option value="">Select a coupon</option>
                      {cupons?.map((cupon) => (
                        <option key={cupon._id} className='form-control' value={cupon._id}>
                          {cupon.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type='button'
                    className='btn btn-grey'
                  >
                    {'View code'}
                  </button>
                </div>
              </form>
              <h6>How to get a promo code?</h6>
              <p>
                Follow our news on the website, as well as subscribe to our social networks. So you will not only be able to receive up-to-date codes but also learn about new products and promotional items.
              </p>
              <div className='contacts-info__social'>
                <span>Find us here:</span>
                <ul>
                  {socialLinks.map((social, index) => (
                    <li key={index}>
                      <a href={social.path} target='_blank'>
                        <i className={social.icon}></i>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='cart-bottom__total'>
              <div className='cart-bottom__total-goods'>
                Goods on
                <span>{total?.toFixed(2)}</span>
              </div>
              <div className='cart-bottom__total-promo'>
                Discount on promo code
                <span>{selectedCoupon ? `- ${selectedCoupon.discount}%` : "no"}</span>
              </div>
              <div className='cart-bottom__total-num'>
                total:
                <span>{amount?.toFixed(2) || total?.toFixed(2)}</span>
              </div>
              {cart.length > 0 ? (
               
                  <a onClick={()=>{
                    if(token){
                      router.push("/checkout");
                    }
                    else{
                       router.push("/login");
                    }
                  }} className="btn cursor-pointer">Checkout</a>
              
              ) : (
                <button
                  onClick={() => {
                    alert('No items in the cart to proceed with checkout.');
                    console.log("Clicked Checkout with an empty cart");
                  }}
                  className="btn"
                  
                >
                  Checkout
                </button>
              )}
            </div>
          </div>
        </div>
        <img
          className='promo-video__decor js-img'
          src='assets/img/promo-video__decor.jpg'
          alt=''
        />
      </div>
      {/* <!-- CART EOF   --> */}
    </>
  );
};
