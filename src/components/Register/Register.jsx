import React, { useContext } from 'react'
import Style from './Register.module.css'
import { useState } from 'react'
import { useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import {UserContext} from '../../Context/UserContext'

export default function Register() {

  let validationSchema=yup.object().shape({
    name:yup.string().min(3,'name minlength is 3').max(10,'name maxlength is 10').required('Name is Required'),
    email:yup.string().email('Email is Invalid').required('Email is Required'),
   phone:yup.string().matches(/^01[0125][0-9]{8}$/,'phone must be valid').required('Phone is Required'),
    password:yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,'Password must start with uppercase').required('Password is Required'),
   rePassword:yup.string().oneOf([yup.ref('password')],'password and repassword must be same').required('Repassword is Required')

  
  
  })

  let navigate=useNavigate();
const[apiError,setapiError]=useState('');
const[isLoading,setIsLoading]=useState(false);
let {setUserLogin}=useContext(UserContext)
 async function handleRegister(formValues)
{
   console.log('Submitting:', formValues);
  try {
  setIsLoading(true);
  const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,formValues);
   console.log('Response:', data);
  if (data.message === 'success') {
    localStorage.setItem('userToken', data.token);
    setUserLogin(data.token);
    navigate('/Login');
  }else{
    console.warn('Unexpected response:', data);
  }
} catch (error) {
   console.error('API Error:', error?.response?.data || error.message);
  setapiError(error?.response?.data?.message);
} finally {
  setIsLoading(false);
}


}



let formik=useFormik({
initialValues:{
  name:'',
  phone:'',
  email:'',
  password:'',
  rePassword:''
},
validationSchema,
onSubmit:handleRegister
});

  return <>
  <div className="py-9 max-w-xl mx-auto text-start ">
  {apiError?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
  {apiError}
</div>:null}



    <h2 className='text-3xl font-bold mb-6 text-green-500'>Register Now</h2>
  <form onSubmit={formik.handleSubmit}>
  <div className="relative z-0 w-full mb-5 group">
  <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 z-0 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name</label>
    <input id="name" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name="name" className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />

</div>
{formik.errors.name && formik.touched.name?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
  {formik.errors.name}
</div>:null}

<div className="relative z-0 w-full mb-5 group">
  <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 z-0 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
  <input id="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />


</div>


{formik.errors.email && formik.touched.email?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
  {formik.errors.email}
</div>:null}


<div className="relative z-0 w-full mb-5 group">
  <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 z-0 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone</label>
  <input id="phone" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />

</div>

{formik.errors.phone && formik.touched.phone?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
  {formik.errors.phone}
</div>:null}



<div className="relative z-0 w-full mb-5 group">
  <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 z-0 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password</label>
  <input id="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />

</div>
{formik.errors.password && formik.touched.password?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
  {formik.errors.password}
</div>:null}




<div className="relative z-0 w-full mb-5 group">
  <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 z-0 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Repassword</label>
  <input id="rePassword" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" name="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />

</div>
{formik.errors.rePassword && formik.touched.rePassword?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
  {formik.errors.rePassword}
</div>:null}


  <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
    {isLoading?<i className='fas fa-spinner fa-spin'></i>
:'Submit'}
    </button>
  </form>
  </div>
  </>
   
  
}
