import React, { createContext, useContext } from 'react'
import Style from './RecentProducts.module.css'
import { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ClimbingBoxLoader } from 'react-spinners';
// import {CartContext} from '../../Context/CartContext'
import toast from 'react-hot-toast';
import CartContaxtProvider, { CartContext } from '../../Context/CartContext';

export default function RecentProducts() {

  let {addToCart,setCart}=useContext(CartContext)
  async function addProduct(productId){
    let response= await addToCart(productId)
    if(response.data.status==='success'){
      setCart(response.data)
// toast('Product added successfully to your cart',{
//   style: {
//     background: '#00a63e',
//     color: '#fff',
//   },
// })
toast.success('Product added successfully to your cart');
    }
    else{
      toast.error(' Error adding Product to your cart');
    }
  }
  function getRecent()
  {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }
 let {data,isError,error,isLoading,isFetched}= useQuery({
    queryKey:['recentProducts'],
    queryFn:getRecent,
    // refetchInterval:3000,
    // refetchIntervalInBackground:true,

    // staleTime:20000
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
         </Link>
         <button onClick={()=>addProduct(product.id)} className='btn' >Add to cart</button>

          </div>
        </div>)}

  
      </div>
  </>
   
  
}
