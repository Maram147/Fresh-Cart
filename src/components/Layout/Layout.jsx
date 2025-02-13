import React from 'react'
import Style from './Layout.module.css'
import { useState } from 'react'
import { useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';


export default function Layout() {
    const [counter,setCounter]=useState(0);
    useEffect(()=>{


    },[]);
  return <>
  <Navbar/>
  <div className='container py-6 mx-auto my-6'> 
    <Outlet></Outlet>
  </div>
  
  </>
   
  
}
