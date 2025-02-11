import productData from 'data/product/product';
import { CartContext } from 'pages/_app';
import { useContext } from 'react';
import { Card } from './Card/Card';

export const CheckoutOrders = () => {
  const { cart, amount,total } = useContext(CartContext);


  return (
    <>
      <div className='checkout-order'>
        <h5>Your Order</h5>
        {cart.map((order) => (
          <Card key={order._id} order={order} />
        ))}
      </div>
      <div className='cart-bottom__total'>
        <div 
        className='cart-bottom__total-goods'>
          Goods on
          <span>₹{(amount||total).toFixed(2)}</span>
        </div>
        {/* <div className='cart-bottom__total-promo'>
          Discount on promo code
          <span>No</span>
        </div> */}
        <div className='cart-bottom__total-delivery'>
          Delivery{' '}
          <span className='cart-bottom__total-delivery-date'>
            (Aug 28,2020 at 11:30)
          </span>
          <span>₹30</span>
        </div>
        <div className='cart-bottom__total-num'>
          total:
          <span>₹{((amount||total) + 30).toFixed(2)}</span>
        </div>
      </div>
    </>
  );
};
