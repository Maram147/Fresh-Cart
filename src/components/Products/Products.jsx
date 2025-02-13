import React from 'react'
import Style from './Products.module.css'
import { useState } from 'react'
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';

export default function Products() {
  function getRecent()
  {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }
 let {data,isError,error,isLoading,isFetched}= useQuery({
    queryKey:['recentProducts'],
    queryFn:getRecent,
    // refetchInterval:5000,
    // refetchIntervalInBackground:true,

    // staleTime:20000,
    // retry:6,
    // retryDelay:1000
   
   })
   if(isLoading){
    return<><div className="py-8 w-full flex justify-center">
<ClimbingBoxLoader color='green'/>
    </div>
    </>
   }
   if(isError){
    return <div className="py-8 w-full flex justify-center">
<h3>{error}</h3>
    </div>
   }


//   const [RecentProducts,setRecentProducts]=useState([]);
// function getRecentProducts()
// {
//   axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
//   .then(({data})=>{
//     setRecentProducts(data.data);

//   })
//   .catch((error)=>{

//   })
  
// }


//     const [counter,setCounter]=useState(0);
//     useEffect(()=>{

// getRecentProducts();
//     },[]);
  return <>
  <div className="flex flex-wrap py-8 items-center">
        {data?.data.data.map((product)=>
        <div className="w-1/6 px-5 ">
          <div className="product py-4">
            <Link to={`/productdetails/${product.id}/${product.category.name}`}>
  <img className='w-full' src={product.imageCover} alt={product.title} />
  <span className="block font-light mt-2 text-green-600">{product.category.name}</span>
         <h3 className='text-lg font-normal text-gray-800 mb-4'>{product.title.split(' ').slice(0,2).join(' ')}</h3> 
         <div className="flex justify-between items-center">
          <span>{product.price} EGP</span>
          <span>{product.ratingsAverage} <i className='fas fa-star text-yellow-500 '></i></span>

         </div>
         <button className='btn' >Add to cart</button>
         </Link>
          </div>
        </div>)}

  
      </div>
  </>
   
  
}
