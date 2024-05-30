"use client"
import { SocialLogin } from 'components/shared/SocialLogin/SocialLogin';
import router from 'next/router';
import { useState } from 'react';

export const Registration = () => {

  const [formDetails , setFormDetails] = useState({
    firstName:"",
    lastName:"",
    phoneNumber:"",
    email:"",
    password:"",
    confirmPassword:""
  })

  // handle on change
  const handleOnChange = (e) => {
    setFormDetails((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }


  // Handle Form Submission
  const handleOnSubmit =async (e) => {

    e.preventDefault();

    if (formDetails.password !== formDetails.confirmPassword) {
     alert('password do not match');
      return;
    }

    const response = await fetch("https://ecomm-backend-aopz.onrender.com/api/v1/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      // the body will send like this to backend
      body: JSON.stringify(formDetails),
    });

    const formattedResponse = await response.json();
   
    if(!formattedResponse.success){
    alert(formattedResponse.message);
    } else{
      alert(formattedResponse.message);
      router.push('/login');
    }


  }

  return (
    <>
      {/* <!-- BEGIN REGISTRATION --> */}
      <div className='login registration'>
        <div className='wrapper'>
          <div
            className='login-form js-img'
            style={{
              backgroundImage: `url('/assets/img/registration-form__bg.png')`,
            }}
          >
            <form onSubmit={handleOnSubmit}>
              <h3>register now</h3>
              <SocialLogin />

              <div className='box-field__row'>
                <div className='box-field'>
                  <input
                  name='firstName'
                  value={formDetails.firstName}
                  onChange={handleOnChange}
                    type='text'
                    required
                    className='form-control'
                    placeholder='Enter your name'
                  />
                </div>
                <div className='box-field'>
                  <input
                  name='lastName'
                  required
                  value={formDetails.lastName}
                  onChange={handleOnChange}
                    type='text'
                    className='form-control'
                    placeholder='Enter your last name'
                  />
                </div>
              </div>
              <div className='box-field__row'>
                <div className='box-field'>
                  <input
                  required
                   name='phoneNumber'
                   value={formDetails.phoneNumber}
                   onChange={handleOnChange}
                    type='tel'
                    className='form-control'
                    placeholder='Enter your phone'
                  />
                </div>
                <div className='box-field'>
                  <input
                  required
                   name='email'
                   value={formDetails.email}
                   onChange={handleOnChange}
                    type='email'
                    className='form-control'
                    placeholder='Enter your email'
                  />
                </div>
              </div>
              <div className='box-field__row'>
                <span>password</span>
                <div className='box-field'>
                  <input
                  required
                   name='password'
                   value={formDetails.password}
                   onChange={handleOnChange}
                    type='password'
                    className='form-control'
                    placeholder='Enter your password'
                  />
                </div>
                <div className='box-field'>
                  <input
                  required
                   name='confirmPassword'
                   value={formDetails.confirmPassword}
                   onChange={handleOnChange}
                    type='password'
                    className='form-control'
                    placeholder='Confirm password'
                  />
                </div>
              </div>
              <label className='checkbox-box checkbox-box__sm'>
                <input type='checkbox' />
                <span className='checkmark'></span>
                Remember me
              </label>
              <button className='btn' type='submit'>
                registration
              </button>
              <div className='login-form__bottom'>
                <span>
                  Already have an account?{' '}
                  <a onClick={() => router.push('/login')}>Log in</a>
                </span>
              </div>
            </form>
          </div>
        </div>
        <img
          className='promo-video__decor js-img'
          src='/assets/img/promo-video__decor.jpg'
          alt=''
        />
      </div>
      {/* <!-- REGISTRATION EOF   -->  */}
    </>
  );
};
