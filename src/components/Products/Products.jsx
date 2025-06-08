import React from 'react';
import Style from './Products.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';
import axios from 'axios'; // إضافة استيراد axios

export default function Products() {
  function getRecent() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['recentProducts'],
    queryFn: getRecent,
  });

  if (isLoading) {
    return (
      <div className="py-8 w-full flex justify-center">
        <ClimbingBoxLoader color="green" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-8 w-full flex justify-center">
        <h3>{error.message}</h3>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap -mx-2 py-8">
        {data?.data.data.map((product) => (
          <div
            key={product.id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-2 mb-4"
          >
            <div className="product py-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                <img
                  className="w-full h-[200px] md:h-[250px] object-cover rounded-t-lg"
                  src={product.imageCover}
                  alt={product.title}
                />
                <div className="p-2">
                  <span className="block font-light mt-2 text-green-600 text-sm md:text-base">
                    {product.category.name}
                  </span>
                  <h3 className="text-base md:text-lg font-normal text-gray-800 mb-2 line-clamp-2">
                    {product.title.split(' ').slice(0, 2).join(' ')}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm md:text-base">{product.price} EGP</span>
                    <span className="text-sm md:text-base">
                      {product.ratingsAverage} <i className="fas fa-star text-yellow-500"></i>
                    </span>
                  </div>
                </div>
              </Link>
              <button className="w-full py-2 bg-green-600 text-white rounded-b-lg hover:bg-green-700 transition-colors text-center">
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}