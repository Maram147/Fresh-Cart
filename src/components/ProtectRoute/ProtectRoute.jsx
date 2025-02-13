import React from 'react'
import Style from './ProtectRoute.module.css'
import { useState } from 'react'
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectRoute(props) {

if(localStorage.getItem('userToken')!==null){
return props.children
}else{
 return <Navigate to={'/login'}/>
}

    const [counter,setCounter]=useState(0);
    useEffect(()=>{


    },[]);
  return <>
  <h1>ProtectRoute</h1>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, dignissimos!</p>
  </>
   
  
}
