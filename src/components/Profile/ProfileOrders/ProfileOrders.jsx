import orderData from 'data/orders/orders';
import {  useEffect, useState } from 'react';
import { Card } from './Card/Card';

export const ProfileOrders = () => {
  const [active, setActive] = useState(-1);
  const orders = [...orderData];
  const handleCollapse = (indx) => {
    if (active === indx) {
      setActive(-1);
    } else {
      setActive(indx);
    }
  };

const [orderHistory , setOrderHistory] = useState([]);

  const fetchOrderHistory = async()=>{
    const token = localStorage.getItem("ecomm_userToken");

    try{

      const response = await fetch(`http://localhost:4000/api/v1/getOrderHistory`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,

        },
      }

    );

     const data = await response.json();

     console.log("data" ,data?.orderHistory);
     
     if(data?.success){
        setOrderHistory(data?.orderHistory)
     }

      
    } catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
 fetchOrderHistory();
  },[])

  return (
    <>
      <div className='profile-orders'>
        <div className='profile-orders__row profile-orders__row-head'>
          <div className='profile-orders__col'>date</div>
          <div className='profile-orders__col'>Delivery address</div>
          <div className='profile-orders__col'>amount</div>
          {/* <div className='profile-orders__col'>Status</div> */}
        </div>
        {orderHistory.map((order, index) => (
          <Card
            key={index}
            index={index}
            onCollapse={handleCollapse}
            order={order}
            active={active}
          />
        ))}
      </div>
    </>
  );
};
