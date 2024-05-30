"use client"
import { useEffect, useState } from 'react';
import { ProductsCarousel } from 'components/Product/Products/ProductsCarousel';
import { SectionTitle } from 'components/shared/SectionTitle/SectionTitle';
import productData from 'data/product/product';

export const NewArrivals = () => {
  // const newArrival = [...productData].filter(
  //   (arrival) => arrival.isNew === true
  // );

  const [products , setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/fetchAllProducts",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );

      const formattedResponse = await response.json();

      const reversedProducts = formattedResponse.allProducts.reverse();

      
      setProducts(reversedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  return (
    <>
      {/* <!-- BEGIN NEW ARRIVALS --> */}
      <section className='arrivals'>
        <SectionTitle
          subTitle='Cosmetics'
          title='New arrivals'
          body='Nourish your skin with toxin-free cosmetic products. With the offers that you can’t refuse.'
        />

        <div className='products-items'>
          <ProductsCarousel products={products} />
        </div>
      </section>
      {/* <!-- NEW ARRIVALS EOF --> */}
    </>
  );
};
