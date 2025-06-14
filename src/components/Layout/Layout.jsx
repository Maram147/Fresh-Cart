import React from 'react'
import Style from './Layout.module.css'
import { useState } from 'react'
import { useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import ProtectRoute from '../ProtectRoute/ProtectRoute';


export default function Layout() {
   
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
