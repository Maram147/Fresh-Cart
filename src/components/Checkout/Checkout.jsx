import React, { useContext } from 'react'
import Style from './Checkout.module.css'
import { useState } from 'react'
import { useEffect } from 'react';
import { useFormik } from 'formik';
import axios, { Axios } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import {UserContext} from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext';


export default function Checkout() {
    let{checkOut}=useContext(CartContext)

 let formik=useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:''
    },
    
    onSubmit:()=>handleCheckout('67ac37788f5dbc08e67ea7a7','http://localhost:5178')
    });
  let navigate=useNavigate();
const[apiError,setapiError]=useState('');
const[isLoading,setIsLoading]=useState(false);
async function handleCheckout(cartId,url){
 let {data}=await checkOut(cartId,url,formik.values);
if(data.status==='success')
{
  window.location.href=data.session.url;
}
 }

 

  return( <> <div className="py-9 max-w-xl mx-auto text-start ">
    <h2 className='text-3xl font-bold mb-6 text-green-500'>Checkout Now</h2>
  <form onSubmit={formik.handleSubmit}>

<div className="relative z-0 w-full mb-5 group">
  <input id="details" onBlur={formik.handleBlur} onChange={formik.handleChange} defaultValue={formik.values.details} type="text" name="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
  <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 z-0 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your details</label>
</div>




<div className="relative z-0 w-full mb-5 group">
  <input id="phone" onBlur={formik.handleBlur} onChange={formik.handleChange} defaultValue={formik.values.phone} type="tel" name="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
  <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 z-0 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your phone</label>
</div>


<div className="relative z-0 w-full mb-5 group">
  <input id="city" onBlur={formik.handleBlur} onChange={formik.handleChange} defaultValue={formik.values.city} type="text" name="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
  <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 z-0 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your city</label>
</div>



  <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">   
Pay Now
    </button>
  </form>
  </div>
  </>
   
  )  
}  