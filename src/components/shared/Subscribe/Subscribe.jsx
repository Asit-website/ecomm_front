import {  useState } from "react";

export const Subscribe = () => {

  const [email , setEmail] = useState("");

  const emailSend = async(e)=>{
    e.preventDefault();

    try {
      const response = await fetch(
        `https://ecomm-backend-aopz.onrender.com/api/v1/sendMail`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",

          },
          body: JSON.stringify({email})
        }
      );

      const formattedResponse = await response.json();

      console.log(formattedResponse);

      if(formattedResponse.success){
 
        alert("Successfuly send the mail");
      }

    } catch (error) {
      console.log(error);
    }

  
  }

  return (
    <>
      {/* <!-- BEGIN SUBSCRIBE --> */}
      <div className='subscribe'>
        <div className='wrapper'>
          <div className='subscribe-form'>
            <div className='subscribe-form__img'>
              <img
                src='/assets/img/subscribe-img.png'
                className='js-img'
                alt=''
              />
            </div>
            <form onSubmit={emailSend}>
              <h3>Stay in touch</h3>
              <p>Nourish your skin with toxin-free cosmetic roducts.</p>
              <div className='box-field__row'>
                <div className='box-field'>
                  <input
                  required
                  name="email"
                  onChange={(e)=>setEmail(e.target.value)}
                  value={email}
                    type='email'
                    className='form-control'
                    placeholder='Enter your email'
                  />
                </div>
                <button type='submit' className='btn'>
                  subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <!-- SUBSCRIBE EOF   --> */}
    </>
  );
};
