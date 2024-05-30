export const Card = ({ order, index, onCollapse, active }) => {
  const { orderStatus,products,shippingAddress,totalAmount ,createdAt
  } = order;

  console.log("products" ,products);

  return (
    <>
      <div className={`profile-orders__item ${active === index && 'active'}`}>
        <div className='profile-orders__row'>
          <div className='profile-orders__col'>
            <span className='profile-orders__col-mob'>date</span>
            <span className='profile-orders__item-date'>{createdAt}</span>
          </div>
          <div className='profile-orders__col'>
            <span className='profile-orders__col-mob'>Delivery address</span>
            <span className='profile-orders__item-addr'>{shippingAddress}</span>
          </div>
          <div className='profile-orders__col'>
            <span className='profile-orders__col-mob'>amount</span>
            <span className='profile-orders__item-price'>₹{totalAmount}</span>
          </div>
          {/* <div className='profile-orders__col'>
            <span className='profile-orders__col-mob'>Status</span>
            <span
              className={`profile-orders__col-${
                orderStatus ? 'delivered' : 'onway'
              }`}
            >
             {orderStatus}
            </span>
            <span
              onClick={() => onCollapse(index)}
              className='profile-orders__col-btn'
            ></span>
          </div> */}
        </div>
        <div className='profile-orders__content'>
          {/* <ul>
            {products.map((item, index) => (
              <li key={item?._id}>
                {item.title}
                <span>${item.price}</span>
              </li>
            ))}
            <li>
              Payment Methods:
              <span>Сredit card: **** **** **** 1633</span>
            </li>
          </ul> */}
        </div>
      </div>
    </>
  );
};
