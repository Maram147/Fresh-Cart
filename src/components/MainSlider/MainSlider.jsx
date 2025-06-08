import React, { useState, useEffect } from 'react';
import Style from './MainSlider.module.css';
import Slider from 'react-slick';
import mainSlider from '../../assets/images/slider-image-3.jpeg';
import mainSlider1 from '../../assets/images/grocery-banner-2.jpeg';
import mainSlider2 from '../../assets/images/blog-img-2.jpeg';
import slide1 from '../../assets/images/slider-image-1.jpeg';
import slide2 from '../../assets/images/slider-image-2.jpeg';

export default function MainSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          speed: 1000,
        },
      },
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-3/4">
          <Slider {...settings}>
            <img
              className="w-full h-[50vh] max-h-[400px] min-h-[200px] object-cover"
              src={mainSlider}
              alt="mainslider"
            />
            <img
              className="w-full h-[50vh] max-h-[400px] min-h-[200px] object-cover"
              src={mainSlider1}
              alt="mainslider"
            />
            <img
              className="w-full h-[50vh] max-h-[400px] min-h-[200px] object-cover"
              src={mainSlider2}
              alt="mainslider"
            />
          </Slider>
        </div>
        <div className="w-full md:w-1/4 flex flex-col gap-4">
          <img
            className="w-full h-[25vh] max-h-[200px] min-h-[100px] object-cover"
            src={slide1}
            alt="slide1"
          />
          <img
            className="w-full h-[25vh] max-h-[200px] min-h-[100px] object-cover"
            src={slide2}
            alt="slide2"
          />
        </div>
      </div>
    </div>
  );
}