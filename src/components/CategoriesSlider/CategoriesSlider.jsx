import React from 'react'
import Style from './CategoriesSlider.module.css'
import { useState } from 'react'
import { useEffect } from 'react';
import Slider from "react-slick";
import axios from 'axios';
import Categories from '../Categories/Categories';

export default function CategoriesSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 1550,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay:true
  };
  const [categories,setCategories]=useState([]);
function getCategories()
{
  axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  .then(({data})=>{
    setCategories(data.data);

  })
  .catch((error)=>{

  })
  
}
    const [counter,setCounter]=useState(0);
    useEffect(()=>{
      getCategories();

    },[]);
  return <>
   <div className='py-5'>
    <h2 className='py-4 text-gray-800 font-medium text-xl'>Shop Popular Categories</h2>
   <Slider {...settings}>
          {categories?.map((category)=> <div>
            <img className='category-img w-full' src={category.image} alt={category.name} />
            <h3 className='font-light mt-2'>{category.name}</h3>
          </div>
           
)}
        </Slider>
   </div>
  </>
   
  
}
