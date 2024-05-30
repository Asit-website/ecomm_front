"use client"
import Link from 'next/link';
import { CartContext } from 'pages/_app';
import { useContext, useEffect, useState } from 'react';

export const Banner = () => {

   const {userDetails} = useContext(CartContext);

  return (
    <>
      {/* <!-- BEGIN MAIN BLOCK --> */}
      <div className='main-block load-bg'>
        <div className='wrapper'>
          <div className='main-block__content'>
            <span className='saint-text'>Professional</span>
            <p>Welcome <span>{userDetails?.firstName} {userDetails?.lastName}</span></p>        
                <h1 className='main-text'>Beauty &amp; Care</h1>
            <p>
              Nourish your skin with toxin-free cosmetic products. With the
              offers that you can’t refuse.
            </p>

            <Link href='/shop'>
              <a className='btn'>Shop now</a>
            </Link>
          </div>
        </div>
        <img
          className='main-block__decor'
          src='/assets/img/main-block-decor.png'
          alt=''
        />
      </div>
      {/* <!-- MAIN BLOCK EOF --> */}
    </>
  );
};
