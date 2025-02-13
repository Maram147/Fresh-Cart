import React from 'react'
import Style from './MainSlider.module.css'
import { useState } from 'react'
import { useEffect } from 'react';
import mainSlider from '../../assets/images/slider-image-3.jpeg'
import mainSlider1 from '../../assets/images/grocery-banner-2.jpeg'
import mainSlider2 from '../../assets/images/blog-img-2.jpeg'

import slide1 from '../../assets/images/slider-image-1.jpeg'
import slide2 from '../../assets/images/slider-image-2.jpeg'
import Slider from "react-slick";

export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    arrows:false
  };
    const [counter,setCounter]=useState(0);
    useEffect(()=>{


    },[]);
  return <>
  <div className="row">
    <div className="w-3/4">
    <Slider {...settings}>
    <img className='w-full h-[400px] ' src={mainSlider} alt="mainslider" />
    <img className='w-full h-[400px] ' src={mainSlider1} alt="mainslider" />
    <img className='w-full h-[400px] ' src={mainSlider2} alt="mainslider" />

        </Slider>
    </div>
    <div className="w-1/4">
    <img className='w-full h-[200px]'  src={slide1} alt="slide1" />
    <img className='w-full h-[200px]'  src={slide2} alt="slide2" />

    </div>
  </div>
  </>
   
  
}
