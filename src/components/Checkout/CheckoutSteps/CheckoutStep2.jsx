import { CartContext } from 'pages/_app';
import { useContext, useEffect, useState } from 'react';


export const CheckoutStep2 = ({  onPrev, onNext }) => {

  const [payment, setPayment] = useState('credit-card');

  const { cart } = useContext(CartContext)


  useEffect(() => {
    const loadRazorpayScript = async () => {
      // Check if Razorpay script is not already loaded
      if (!window.Razorpay) {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
      }
    };

    loadRazorpayScript();
  }, []); // Empty dependency array ensures it runs only once after mount

  
   const paymentHandler = async()=>{

     const products = cart.map(product => product._id);

      console.log("rpduct" , products);

     const token = localStorage.getItem("ecomm_userToken");

   try {
     const response = await fetch("https://ecomm-backend-aopz.onrender.com/api/v1/payment/capturePayment",
       {
         method: "POST",
         headers: {
           "content-type": "application/json",
           Authorization: `Bearer ${token}`,
 
         },
         body: JSON.stringify({products}),
       }
     );
    

     const formattedResponse = await response.json();

     let amount = formattedResponse.message.amount/100;
     
  
     const options = {
      key:"rzp_test_eAwoqbEXBt3CVM", 
    amount:amount, 
    currency: "INR",
    name: "Asit Mandal",
    description: "product transaction",
    order_id: formattedResponse?.message?.id,
    // callback_url: `https://ecomm-backend-aopz.onrender.com/api/v1/payment/verifySignature/${token}`,
    prefill: {
        name: "login user name",
        email: "loginEmail.com",
        contact: "contactNumber" , 
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#121212"
    }, handler: function (response) {
      console.log("Payment successful:", response);
      console.log("Hi line no 75")
      onNext();
    },modal: {
      ondismiss: function () {
        console.log("Razorpay popup dismissed.");
      }
    }
     }
 
     const paymentObject = new window.Razorpay(options  ,token);

  paymentObject.open();
  paymentObject.on('payment.failed', function (response){
    console.log("Payment failed:", response.error.description) 
    alert("Payment Failed: " + response.error.description);
         
  })

   } catch (error) {
     console.log(error);
   }
 
   }

  return (
    <>
      {/* <!-- BEING CHECKOUT STEP TWO -->  */}
      <div className='checkout-payment checkout-form'>
        <h4>Payment Methods</h4>
        <div
          className={`checkout-payment__item ${
            payment === 'credit-card' && 'active'
          }`}
        >
          <div className='checkout-payment__item-head'>
            <label
              onChange={() => setPayment('credit-card')}
              className='radio-box'
            >
              Credit card
              <input
                type='radio'
                checked={payment === 'credit-card'}
                name='radio'
              />
              <span className='checkmark'></span>
              <span className='radio-box__info'>
                <i className='icon-info'></i>
                <span className='radio-box__info-content'>
                  Aliqua nulla id aliqua minim ullamco adipisicing enim. Do sint
                  nisi velit qui. Ullamco Lorem aliquip dolor nostrud cupidatat
                  amet.
                </span>
              </span>
            </label>
          </div>
          <div className='checkout-payment__item-content'>
            <div className='box-field'>
              <span>Card number</span>
              <input
                type='text'
                className='form-control'
                placeholder='xxxx xxxx xxxx xxxx'
                maxlength='16'
              />
            </div>
            <div className='box-field__row'>
              <div className='box-field'>
                <span>Expiration date</span>
                <input
                  type='text'
                  className='form-control'
                  placeholder='mm'
                  maxlength='2'
                />
              </div>
              <div className='box-field'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='yy'
                  maxlength='2'
                />
              </div>
              <div className='box-field'>
                <span>Security code</span>
                <input
                  type='text'
                  className='form-control'
                  placeholder='CVV'
                  maxlength='3'
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className={`checkout-payment__item ${
            payment === 'paypal' && 'active'
          }`}
        >
          <div className='checkout-payment__item-head'>
            <label onClick={() => setPayment('paypal')} className='radio-box'>
              PayPal
              <input type='radio' checked={payment === 'paypal'} name='radio' />
              <span className='checkmark'></span>
              <span className='radio-box__info'>
                <i className='icon-info'></i>
                <span className='radio-box__info-content'>
                  Aliqua nulla id aliqua minim ullamco adipisicing enim. Do sint
                  nisi velit qui. Ullamco Lorem aliquip dolor nostrud cupidatat
                  amet.
                </span>
              </span>
            </label>
          </div>

          <div className='checkout-payment__item-content'>
            <div className='box-field'>
              <span>Card number</span>
              <input
                type='text'
                className='form-control'
                placeholder='xxxx xxxx xxxx xxxx'
                maxlength='16'
              />
            </div>
            <div className='box-field__row'>
              <div className='box-field'>
                <span>Expiration date</span>
                <input
                  type='text'
                  className='form-control'
                  placeholder='mm'
                  maxlength='2'
                />
              </div>
              <div className='box-field'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='yy'
                  maxlength='2'
                />
              </div>
              <div className='box-field'>
                <span>Security code</span>
                <input
                  type='text'
                  className='form-control'
                  placeholder='CVV'
                  maxlength='3'
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className={`checkout-payment__item ${payment === 'cash' && 'active'}`}
        >
          <div className='checkout-payment__item-head'>
            <label onClick={() => setPayment('cash')} className='radio-box'>
              Cash payment
              <input type='radio' checked={payment === 'cash'} name='radio' />
              <span className='checkmark'></span>
              <span className='radio-box__info'>
                <i className='icon-info'></i>
                <span className='radio-box__info-content'>
                  Aliqua nulla id aliqua minim ullamco adipisicing enim. Do sint
                  nisi velit qui. Ullamco Lorem aliquip dolor nostrud cupidatat
                  amet.
                </span>
              </span>
            </label>
          </div>
          <div className='checkout-payment__item-content'>
            <div className='box-field'>
              <span>Card number</span>
              <input
                type='text'
                className='form-control'
                placeholder='xxxx xxxx xxxx xxxx'
                maxlength='16'
              />
            </div>
            <div className='box-field__row'>
              <div className='box-field'>
                <span>Expiration date</span>
                <input
                  type='text'
                  className='form-control'
                  placeholder='mm'
                  maxlength='2'
                />
              </div>
              <div className='box-field'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='yy'
                  maxlength='2'
                />
              </div>
              <div className='box-field'>
                <span>Security code</span>
                <input
                  type='text'
                  className='form-control'
                  placeholder='CVV'
                  maxlength='3'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='checkout-buttons'>
          <button onClick={onPrev} className='btn btn-grey btn-icon'>
            <i className='icon-arrow'></i> back
          </button>
          <button onClick={paymentHandler} className='btn btn-icon btn-next'>
            next <i className='icon-arrow'></i>
          </button>
        </div>
      </div>
      {/* <!-- CHECKOUT STEP TWO EOF -->  */}
    </>
  );
};
