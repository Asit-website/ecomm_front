import Link from 'next/link';

export const Card = ({ order }) => {
  const { thumbnail, title, price, _id, quantity } = order;

  return (
    <>
      {/* <!-- BEING ORDER ITEM CARD --> */}
      <div className='checkout-order__item'>
        <Link href={`/product/${_id}`}>
          <a className='checkout-order__item-img'>
            <img src={thumbnail} className='js-img' alt='' />
          </a>
        </Link>
        <div className='checkout-order__item-info'>
          <Link href={`/product/${_id}`}>
            <a className='title6'>
              {title} <span>x{quantity}</span>
            </a>
          </Link>
          <span className='checkout-order__item-price'>
            ${(price * quantity).toFixed(2)}
          </span>
          <span className='checkout-order__item-num'>SKU: {_id}</span>
        </div>
      </div>
      {/* <!-- ORDER ITEM CARD EOF --> */}
    </>
  );
};
