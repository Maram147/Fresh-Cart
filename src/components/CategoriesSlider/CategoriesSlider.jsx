import React, { useState, useEffect } from 'react';
import Style from './CategoriesSlider.module.css';
import Slider from 'react-slick';
import axios from 'axios';
import placeholder from '../../assets/images/placeholder.svg'
import { LazyLoadImage } from 'react-lazy-load-image-component';
export default function CategoriesSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1550,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 640, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          speed: 1000,
        },
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1280, 
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [categories, setCategories] = useState([]);

  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        setCategories(data.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="container mx-auto py-5 px-4">
      <h2 className="py-4 text-gray-800 font-medium text-xl md:text-2xl">
        Shop Popular Categories
      </h2>
      <Slider {...settings}>
        {categories?.map((category) => (
          <div key={category._id} className="px-2">
            <LazyLoadImage
              className="w-full h-[150px] sm:h-[180px] md:h-[200px] object-cover rounded-lg"
              src={category.image || placeholder}
              alt={category.name}
            />
            <h3 className="font-light mt-2 text-center text-sm md:text-base">
              {category.name}
            </h3>
          </div>
        ))}
      </Slider>
    </div>
  );
}