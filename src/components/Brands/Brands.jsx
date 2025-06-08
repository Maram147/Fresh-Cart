import React, { useState, useEffect } from 'react';
import Style from './Brands.module.css';
import axios from 'axios';

export default function Brands() {
  const [brands, setBrands] = useState([]);

  const getAllBrands = async () => {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
      setBrands(data.data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">ALL Brands</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {brands.map((item) => (
          <div key={item._id} className="product brand bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <img
              src={item.image}
              className="w-full h-[100px] sm:h-[150px] md:h-[200px] object-contain rounded-t-lg"
              alt={item.name}
            />
            <h6 className="text-main text-center my-4 fw-bolder text-sm md:text-base">
              {item.name}
            </h6>
          </div>
        ))}
      </div>
    </div>
  );
}