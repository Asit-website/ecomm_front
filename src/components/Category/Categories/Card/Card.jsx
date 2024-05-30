import Link from 'next/link';

export const Card = ({ category }) => {
  const { title, images } = category;
  return (
    <Link href={`/categories`}>
      <a className='top-categories__item'>
        <img src={images} className='js-img' alt='' />
        <div className='top-categories__item-hover'>
          <h5>{title}</h5>
          <span>browse products -</span>
          <i className='icon-arrow-lg'></i>
        </div>
      </a>
    </Link>
  );
};
