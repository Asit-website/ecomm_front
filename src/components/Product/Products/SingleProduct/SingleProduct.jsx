import Link from 'next/link';

export const SingleProduct = ({
  product,
  onAddToWish,
  onAddToCart,
  addedInCart,
  addedInWishlist
}) => {
  const { title, price, thumbnail, isSale, isNew, _id } = product;
  if(thumbnail?.length > 0){
    var image = thumbnail[0];
  }
  return (
    <>
      {/* <!-- BEING SINGLE PRODUCT ITEM --> */}
      <div className='products-item'>
        <div className='products-item__type'>
          {isSale && <span className='products-item__sale'>sale</span>}
          {isNew && <span className='products-item__new'>new</span>}
        </div>
        <div className='products-item__img'>
          <img src={image !== null && image} className='js-img' alt='' />
          <div className='products-item__hover'>
            <Link href={`/product/${_id}`}>
              <a>
                <i className='icon-search'></i>
              </a>
            </Link>
            <div className='products-item__hover-options'>
              <button disabled={addedInWishlist} className={`addList ${addedInWishlist?'added':''}`} onClick={() => onAddToWish(_id)}>
                <i className='icon-heart'></i>
              </button>
              <button
                disabled={addedInCart}
                className={`addList ${addedInCart ? 'added' : ''}`}
                onClick={() => onAddToCart(_id , product)}
              >
                <i className='icon-cart'></i>
              </button>
            </div>
          </div>
        </div>
        <div className='products-item__info'>
          <Link href={`/product/${_id}`}>
            <a>
              <span className='products-item__name'>{title}</span>
            </a>
          </Link>
          <span className='products-item__cost'>
          ₹{price}
          </span>
        </div>
      </div>
      {/* <!-- SINGLE PRODUCT ITEM EOF --> */}
    </>
  );
};
