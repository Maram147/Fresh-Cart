import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
export default function BrandsDetails() {
  const [brandDetails, setBrandDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    localStorage.removeItem('code');
    localStorage.removeItem('verifycode');
    getSpecificBrand(id);
  }, [id]);

  async function getSpecificBrand(id) {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
      setBrandDetails(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  if (isLoading) return <div className="text-center text-xl mt-10">Loading...</div>;

  return (
    <div className="container mx-auto my-10 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
        <LazyLoadImage
          src={brandDetails.image}
          alt={brandDetails.name}
          className="w-32 h-20 object-contain"
        />
        <h2 className="text-2xl font-medium text-gray-800">{brandDetails.name}</h2>
      </div>
    </div>
  );
}
