import React, { useContext } from 'react'
import Style from './Layout.module.css'
import { useState } from 'react'
import { useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import ProtectRoute from '../ProtectRoute/ProtectRoute';
import { UserContext } from '../../Context/UserContext';


export default function Layout() {
  // let {setToken} = useContext(UserContext);
  
  // useEffect(()=> {
  //   if(localStorage.getItem("userToken") !== null){
  //     setToken(localStorage.getItem("userToken"))
  //   }

  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
   
  return <>
<div className="min-h-screen flex flex-col">
  <Navbar/>
      <main className="flex-grow pt-20 px-4">
        <Outlet />
      </main>
      <ProtectRoute><Footer/></ProtectRoute> 
 </div>

  </>
   
  
}
