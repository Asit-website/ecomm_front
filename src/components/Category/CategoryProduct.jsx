import router from "next/router";
import { useEffect, useState } from "react";
import { ProductsCarousel } from 'components/Product/Products/ProductsCarousel';


export const CategoryProduct = () => {

 const [categoryId , setCategoryId] = useState(null);

 const [allProducts , setAllProducts] = useState(null);

    const fetchProductByCategory = async()=>{
        try{
            const response = await fetch( `http://localhost:4000/api/v1/getProductsByCategoryId/${categoryId}`,
              {
                method: "GET",
                headers: {
                  "content-type": "application/json",
        
                },
              }
            );
        
            const formattedResponse = await response.json();

            console.log("response" , formattedResponse);

      
            if(formattedResponse?.success){
            setAllProducts(formattedResponse?.products);
            }
            else{
              alert(formattedResponse?.message);
            }
      
          } catch(error){
            console.log(error);
          }
    }

    useEffect(()=>{
     if(sessionStorage.getItem("ecomm_catPro")){
        setCategoryId(sessionStorage.getItem("ecomm_catPro"));
     }
     else{
        router.push("/");
     }
    },[])
     
    useEffect(()=>{
       if(categoryId !== null){
 fetchProductByCategory();
       }
    },[categoryId])
  
  return (
    <>
      {/* <!-- BEGIN TRENDING --> */}
      <section className='trending'>
        <div className='trending-content'>
                 <div className='tab-wrap trending-tabs'>
           
            <div className='products-items'>
              <ProductsCarousel products={allProducts} />
            </div>
          </div>
        </div>
      </section>
      {/* <!-- TRENDING EOF   --> */}
    </>
  );
};
