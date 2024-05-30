import { Card } from './Card/Card';
import socialData from 'data/social';
import { CartContext } from 'pages/_app';
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';

export const Cart = () => {

  const { cart } = useContext(CartContext);


  const [count, setCount] = useState(0);

  const socialLinks = [...socialData];

  const total = cart.reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity),
    0
  );

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
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Enter promo code'
                    />
                  </div>
                  <button type='submit' className='btn btn-grey'>
                    apply code
                  </button>
                </div>
              </form>
              <h6>How to get a promo code?</h6>
              <p>
                Follow our news on the website, as well as subscribe to our
                social networks. So you will not only be able to receive
                up-to-date codes, but also learn about new products and
                promotional items.
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
                <span>{total.toFixed(2)}</span>
              </div>
              <div className='cart-bottom__total-promo'>
                Discount on promo code
                <span>No</span>
              </div>
              <div className='cart-bottom__total-num'>
                total:
                <span>{total.toFixed(2)}</span>
              </div>
              <Link href='/checkout'>
                <a className='btn'>Checkout</a>
              </Link>
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
