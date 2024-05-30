import { ProductsCarousel } from 'components/Product/Products/ProductsCarousel';
import { SectionTitle } from 'components/shared/SectionTitle/SectionTitle';
import { useEffect, useState } from 'react';

export const Trending = () => {
  
  const [products, setProducts] = useState([]);
  const [filterItem, setFilterItem] = useState('');
  const [filterList , setFilterList] = useState([]);
  console.log("finterItem" ,filterItem);

  const fetchProducts = async () => {

    try {
      const response = await fetch( `http://localhost:4000/api/v1/getProductsByCategoryId/${filterItem}`,
        {
          method: "GET",
          headers: {
            // "content-type": "application/json",
          },
        }
      );

      const formattedResponse = await response.json();

      if(formattedResponse.success){
        setProducts(formattedResponse?.products);

      }


    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategory = async()=>{
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/showAllCategory",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );

      const formattedResponse = await response.json();

      if(formattedResponse.success){
        setFilterList(formattedResponse.data);
        setFilterItem(formattedResponse.data[0]._id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategory();
    fetchProducts();

   
  }, []);


  useEffect(() => {

    fetchProducts();
  }, [filterItem]);


  return (
    <>
      {/* <!-- BEGIN TRENDING --> */}
      <section className='trending'>
        <div className='trending-content'>
          <SectionTitle
            subTitle='Cosmetics'
            title='Trending products'
            body='Nourish your skin with toxin-free cosmetic products. With the offers that you can’t refuse.'
          />
          <div className='tab-wrap trending-tabs'>
            <ul className='nav-tab-list tabs'>
              {filterList?.map((item ,index) => (
                <li
                  // key={item.value}
                  key={index}
                   onClick={() => setFilterItem(item._id)}
                  className={item?._id === filterItem ? 'active' : ''}
                >
                  {item?.title}
                </li>
              ))}
            </ul>
            <div className='products-items'>
              <ProductsCarousel products={products} />
            </div>
          </div>
        </div>
      </section>
      {/* <!-- TRENDING EOF   --> */}
    </>
  );
};
