import { ProductsCarousel } from "components/Product/Products/ProductsCarousel";
import { SectionTitle } from "components/shared/SectionTitle/SectionTitle";
import productData from "data/product/product";
import { useEffect, useState } from "react";

export const MostViewed = ({ additionalClass }) => {
  // const mostViewed = [...productData].slice(0, 6);

  const [mostViewed, setMostViewed] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://ecomm-backend-aopz.onrender.com/api/v1/fetchAllProducts",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );

      const formattedResponse = await response.json();
      setMostViewed(formattedResponse.allProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {/* <!-- BEGIN MOST VIEWED --> */}
      <section className={`arrivals ${additionalClass ? additionalClass : ""}`}>
        <SectionTitle
          subTitle="Cosmetics"
          title="You Have Viewed"
          body="Nourish your skin with toxin-free cosmetic products. With the offers that you can’t refuse."
        />
        <div className="products-items">
          <ProductsCarousel products={mostViewed} />
        </div>
      </section>
      {/* <!-- MOST VIEWED EOF --> */}
    </>
  );
};
