import React from 'react'
import Style from './Home.module.css'
import { useState } from 'react'
import { useEffect } from 'react';
import RecentProducts from '../RecentProducts/RecentProducts';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import MainSlider from '../MainSlider/MainSlider';

export default function Home() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {


  }, []);
  return <>
  <MainSlider/>
  <CategoriesSlider/>
    <RecentProducts/>
  </>


}
