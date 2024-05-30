import { Products } from 'components/Product/Products/Products';
import { PagingList } from 'components/shared/PagingList/PagingList';
import { usePagination } from 'components/utils/Pagination/Pagination';
import Slider from 'rc-slider';
import { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import { AsideItem } from '../shared/AsideItem/AsideItem';

// React Range
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const options = [
  { value: 'highToMin', label: 'From expensive to cheap' },
  { value: 'minToHigh', label: 'From cheap to expensive' },
];

export const Shop = () => {
  

  const [products, setProducts] = useState([]);

  const [topThree , setTopThree] = useState([]);

  const paginate = usePagination(products, 9);

  const [filterList , setFilterList] = useState([]);

  const [filterItem, setFilterItem] = useState(null);



  const fetchCategory = async()=>{
    try {
      const response = await fetch(
        "https://ecomm-backend-aopz.onrender.com/api/v1/showAllCategory",
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

  const fetchProducts = async () => {

    try {
      const response = await fetch(
        `https://ecomm-backend-aopz.onrender.com/api/v1/getProductsByCategoryId/${filterItem}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );

      const formattedResponse = await response.json();

      if(formattedResponse.success){
        const newOrder = formattedResponse?.products?.sort((a, b) => (a.price < b.price ? 1 : -1));
        setProducts(newOrder);

      }



    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllProducts = async () => {
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

      const reversedProducts = formattedResponse.allProducts.reverse();

      const topThreePro =  reversedProducts.slice(0,3);

      setTopThree(topThreePro);
    } catch (error) {
      console.log(error);
    }
  };
  
 useEffect(()=>{
  fetchProducts();
  },[filterItem])
 
   useEffect(()=>{
   fetchCategory();
   fetchAllProducts();
   },[])
 
  const handleSort = (value) => {
    if (value === 'highToMin') {
      console.log("run")
      const newOrder = [...products].sort((a, b) => (a.price < b.price ? 1 : -1));
      setProducts(newOrder);
    }
    if (value === 'minToHigh') {
      console.log("ru00n" , products);
      const newOrder = [...products].sort((a, b) => (a.price > b.price ? 1 : -1));
    setProducts(newOrder);
    }
  };

  


  return (
    <div>
      {/* <!-- BEGIN SHOP --> */}
      <div className='shop'>
        <div className='wrapper'>
          <div className='shop-content'>
            {/* <!-- Shop Aside --> */}
            <div className='shop-aside'>
              <div className='box-field box-field__search'>
                <input
                  type='search'
                  className='form-control'
                  placeholder='Search'
                />
                <i style={{
                  cursor:"pointer"
                }} className='icon-search'></i>
              </div>
              <div className='shop-aside__item'>
                <span className='shop-aside__item-title'>Categories</span>
                <ul>
                  {
                    filterList?.map((item ,index)=>(
                      <li onClick={()=>setFilterItem(item._id)} key={index}>
                      <a href='#'>
                      {item.title}
                      </a>
                    </li>
                    ))
                  }
               
                </ul>
              </div>

              {/* <div className='shop-aside__item'>
                <span className='shop-aside__item-title'>Price</span>
                <div className='range-slider'>
                  <Range
                    min={0}
                    max={20}
                    defaultValue={[0, 20]}
                    tipFormatter={(value) => `${value}$`}
                    allowCross={false}
                    tipProps={{
                      placement: 'bottom',
                      prefixCls: 'rc-slider-tooltip',
                    }}
                  />
                </div>
              </div> */}

              <div className='shop-aside__item'>
                <span className='shop-aside__item-title'>You have viewed</span>
                {topThree.map((data) => (
                  <AsideItem key={data.id} aside={data} />
                ))}
              </div>

              <div className='shop-aside__item'>
                <span className='shop-aside__item-title'>Top 3 for today</span>
                {topThree.map((data) => (
                  <AsideItem key={data.id} aside={data} />
                ))}
              </div>
            </div>

            {/* <!-- Shop Main --> */}
            <div className='shop-main'>
              <div className='shop-main__filter'>
                <div className='shop-main__checkboxes'>
                  {/* <label className='checkbox-box'>
                    <input
                      checked={filter.isSale}
                      onChange={() =>
                        setFilter({ ...filter, isSale: !filter.isSale })
                      }
                      type='checkbox'
                    />
                    <span className='checkmark'></span>
                    SALE
                  </label> */}
                  {/* <label className='checkbox-box'>
                    <input
                      checked={filter.isNew}
                      onChange={() =>
                        setFilter({ ...filter, isNew: !filter.isNew })
                      }
                      type='checkbox'
                    />
                    <span className='checkmark'></span>
                    NEW
                  </label> */}
                </div>
                <div className='shop-main__select'>
                  <Dropdown
                    options={options}
                    className='react-dropdown'
                    onChange={(option) => handleSort(option.value)}
                    value={options[0]}

                  />
                </div>
              </div>
              <div className='shop-main__items'>
                <Products products={products} />
              </div>

              {/* <!-- PAGINATE LIST --> */}
              <PagingList paginate={paginate} />
            </div>
          </div>
        </div>
        <img
          className='promo-video__decor js-img'
          src='/assets/img/promo-video__decor.jpg'
          alt=''
        />
        <img
          className='shop-decor js-img'
          src='/assets/img/shop-decor.jpg'
          alt=''
        />
      </div>
      {/* <!-- SHOP EOF   --> */}
    </div>
  );
};
