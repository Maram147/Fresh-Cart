import React, { useState, useEffect } from 'react';
import Style from './Categories.module.css';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
export default function Categories() {
  const [categories, setCategories] = useState([]);

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
      setCategories(data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
    <CategoriesSlider/>
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((item) => (
          <div key={item._id} className="product brand bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Link to={`/categoriesdetails/${item._id}`}>
              <LazyLoadImage
                src={item.image}
                className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover rounded-t-lg"
                alt={item.name}
              />
              <h6 className="text-main text-center my-4 fw-bolder text-sm md:text-base">
                {item.name}
              </h6>
            </Link>
          </div>
        ))}
      </div>
    </div>
      </>
  );
}