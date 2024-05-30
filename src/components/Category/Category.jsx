import categoryData from 'data/category/category';
import { Categories } from './Categories/Categories';
import { useEffect, useState } from 'react';

export const Category = () => {

  const [categories , setCategories] = useState([]);

   const fetchCategory = async()=>{
    try{
      const response = await fetch("https://ecomm-backend-aopz.onrender.com/api/v1/showAllCategory", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        // the body will send like this to backend
        
      });
  
      const formattedResponse = await response.json();

      if(formattedResponse.success){
        setCategories(formattedResponse.data);
      }

    } catch(error){
      console.log(error);

    }
  
   }

   useEffect(()=>{
    fetchCategory();
   },[])

  return (
    <>
      {/* <!-- BEGIN TOP CATEGORIES --> */}
      <section className='all-categories'>
        <div className='top-categories__items'>
          <Categories categories={categories} />
        </div>
      </section>
      {/* <!-- TOP CATEGORIES EOF --> */}
    </>
  );
};
