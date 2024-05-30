"use client"
import { ProductsCarousel } from 'components/Product/Products/ProductsCarousel';
import { useRouter } from 'next/router';
import {  useEffect, useState } from 'react';
import { PublicLayout } from 'layout/PublicLayout';

const breadcrumbsData = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Categories',
    path: '/categories',
  },
];


const CategoryProduct = () => {

    const router = useRouter();
    const { id } = router.query;

    const [products , setProducts] = useState(null);

    const [selectSubCat , setSelectSubCat] = useState(null);

    const [subCategory , setSubCategory] = useState([]);

    const fetchProductById = async()=>{
        try{

            const response = await fetch(
                `https://ecomm-backend-aopz.onrender.com/api/v1/getProductsByCategoryId/${id}`,
                {
                  method: "GET",
                  headers: {
                    "content-type": "application/json",
                  },
                }
              );
        
              const formattedResponse = await response.json();

              if(formattedResponse?.success){
                setProducts(formattedResponse?.products);
              }

        }catch(error){
            console.log(error);
        }
    }

    const fetchSubCategoryOfCategory = async()=>{
      try{

        const response = await fetch(
          `https://ecomm-backend-aopz.onrender.com/api/v1/fetchAllSubCategoryOfCategory/${id}`,
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
          }
        );
  
        const formattedResponse = await response.json();


         if(formattedResponse?.success){
        setSubCategory(formattedResponse?.categoryDetails?.subCategory)
         }
    
      } catch(error){
        console.log(error);
        
      }
    }

    useEffect(()=>{
        fetchProductById();
        fetchSubCategoryOfCategory();
        setSelectSubCat(null);
    },[id])

   
     const getProductOfSub = async(id)=>{
      try{
        
        const response = await fetch(
          `https://ecomm-backend-aopz.onrender.com/api/v1/subCategoryPageDetails/${id}`,
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
          }
        );
        
  
        const formattedResponse = await response.json();

         if(formattedResponse?.success){
          setProducts(formattedResponse?.selectedSubCategory?.products )
         }


      } catch(error){
        console.log(error);
      }
     }


    return (
        <>
        <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle='Category Product'>

             <div className='allSubCatOfCat'>
             <div onClick={()=>{
              fetchProductById();
              setSelectSubCat(null)}} className={`singleSubCat ${selectSubCat === null && "singleActive"}`} >
                      ALL
                    </div>
              {
                subCategory.length > 0 ?(
                  subCategory?.map((sc)=>(
                    <div onClick={()=>{
                      setSelectSubCat(sc?._id);
                       getProductOfSub(sc?._id);
                    }
                      } className={`singleSubCat  ${selectSubCat === sc._id && "singleActive"}`} key={sc._id}>
                      {sc?.title} <span><img className='singleSubIMG' src={sc?.images} alt="" /></span>
                    </div>
                  ))
                ):(
                  <span></span>
                )
              }
             </div>
          

        <section className='trending'>

          
        <div className='trending-content'>
       
          <div className='tab-wrap trending-tabs'>
          
            <div className='products-items'>
              <ProductsCarousel products={products} />
            </div>
          </div>
        </div>
      </section>
        </PublicLayout>
        </>
    )
  };
  
  export default CategoryProduct;