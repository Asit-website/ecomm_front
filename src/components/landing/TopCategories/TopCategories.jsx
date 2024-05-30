import { Categories } from 'components/Category/Categories/Categories';
import { SectionTitle } from 'components/shared/SectionTitle/SectionTitle';
import { useEffect, useState } from 'react';

export const TopCategories = () => {
  // const categories = [...categoriesData].slice(0, 3);
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
      <section className='top-categories'>
        <SectionTitle
          subTitle='Popular collections'
          title='top categories'
          body='Nourish your skin with toxin-free cosmetic products. With the offers that you can’t refuse.'
        />
        <div className='top-categories__items'>
          {<Categories categories={categories} />}
        </div>
      </section>
      {/* <!-- TOP CATEGORIES EOF   --> */}
    </>
  );
};
