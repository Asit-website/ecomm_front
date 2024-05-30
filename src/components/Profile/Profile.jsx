"use client"
import { useEffect, useState } from 'react';
import { ProfileAside } from './ProfileAside/ProfileAside';
import { ProfileOrders } from './ProfileOrders/ProfileOrders';

export const Profile = () => {
  const [activeTab, setActiveTab] = useState('orders');

   const [userData , setUserData] = useState([]);

   useEffect(()=>{
        const checkUser = localStorage.getItem("ecomm_user");
        if(checkUser){
          var storedUserObject = JSON.parse(checkUser);

          setUserData(storedUserObject);

        }
        // else{
        //   alert("user not login ");
        // }
   },[])

  return (
    <>
      {/* <!-- BEGIN PROFILE --> */}
      <div className='profile'>
        <div className='wrapper'>
          <div className='profile-content'>
            <ProfileAside />
            <div className='profile-main'>
              <div className='tab-wrap'>
                <ul className='nav-tab-list tabs'>
                  <li
                    onClick={() => setActiveTab('myInfo')}
                    className={activeTab === 'myInfo' ? 'active' : ''}
                  >
                    My info
                  </li>
                  <li
                    onClick={() => setActiveTab('orders')}
                    className={activeTab === 'orders' ? 'active' : ''}
                  >
                    My orders
                  </li>
                
                </ul>

                <div className='box-tab-cont'>
                  {activeTab === 'myInfo' && (
                    <div className='tab-cont' id='profile-tab_1'>
                    

                      <p>Name : <span>{userData?.firstName} {userData?.lastName}</span></p>
                      <p>email : <span>{userData?.email}</span></p>
                      <p>PhoneNumber : <span>{userData?.phoneNumber}</span></p>

            

                    </div>
                  )}

                  {activeTab === 'orders' && <ProfileOrders />}

                
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          className='promo-video__decor js-img'
          src='/assets/img/promo-video__decor.jpg'
          alt=''
        />
      </div>
      {/* <!-- PROFILE EOF   --> */}
    </>
  );
};
