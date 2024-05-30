import useWindowSize from 'components/utils/windowSize/windowSize';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CartContext } from 'pages/_app';
import { useContext, useEffect, useState } from 'react';

export const Nav = ({ navItem }) => {
  const router = useRouter();
  const [sub, setSub] = useState(false);
  const [height, width] = useWindowSize();

  const [allCat , setAllCat] = useState([]);

  const {setUserDetails ,fetchAllCartItem,fetchAllWishlistItem, setToken  , token} = useContext(CartContext);

  useEffect(() => {
    if (height > 768) {
      setSub(false);
    }
  }, [height]);


  const fetchAllCategory = async()=>{
    try{
      const response = await fetch( "http://localhost:4000/api/v1/showAllCategory",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
  
          },
        }
      );
  
      const formattedResponse = await response.json();

      if(formattedResponse?.success){
         setAllCat(formattedResponse?.data);
      }
      else{
        alert(formattedResponse?.message);
      }

    } catch(error){
      console.log(error);
    }
  }
  
 useEffect(()=>{
 fetchAllCategory();
 },[])

  return (
    <ul className='header-nav'>
      {navItem.map((nav) => (
        <li
          key={nav.path}
          onClick={() => {
            nav.subNav ? setSub(!sub) : '';
          }}
        >
           {
            nav.name === 'Categories' ? 
            (
            <Link href={nav.path}>


            <a className={`${nav.path === router.pathname ? 'active' : ''} categoryHeader `  }>
              {nav.name}

              <div className='categorySub'>
                      {
                        allCat?.map((cat)=>(
                          <Link href={`/categoryProduct/${cat._id}`}>
                          <p className='singleCat' onClick={()=>{
                        
                            sessionStorage.setItem("ecomm_catPro" , cat?._id)}
                            
                            } key={cat._id}>{cat?.title}</p>
                          </Link>
                        ))
                      }
              </div>

            </a>

          </Link>
          
          ):(
  <Link href={nav.path}>

  <a className={nav.path === router.pathname ? 'active' : ''}>
    {nav.name}
  </a>

</Link>
          )
      
           }
          
        

          {nav.subNav && (
            <ul className={sub ? 'active' : ''}>
              {nav.subNav.map((sub) => (
          
                      sub.name === 'Logout'?(
                        token && 
                        <li onClick={()=>{
                          if(sub.name === 'Logout'){
                            localStorage.removeItem("ecomm_userToken");
                            localStorage.removeItem("ecomm_user");
                            alert("Successfuly logout");
                            setUserDetails(null);
                            setToken(null);
                            fetchAllCartItem();
                            fetchAllWishlistItem();
                          }
        
                        }} key={sub.path}>
                          
                          <Link href={sub.path}>
                            <a >{sub.name}</a>
                          </Link>
                        </li>
                      ):(
                        sub.name === 'Login'?(
                          !token && 
                          <li key={sub.path}>
                          
                          <Link href={sub.path}>
                            <a >{sub.name}</a>
                          </Link>
                        </li>
                        ):(
                          <li key={sub.path}>     
                          <Link href={sub.path}>
                            <a >{sub.name}</a>
                          </Link>
                        </li>
                        )
                       
                      )
           
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};
