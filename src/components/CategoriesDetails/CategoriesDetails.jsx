import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
export default function CategoriesDetails() {
  const [categoryDetails, setCategoryDetails] = useState({});
  const [subCategories, setSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    localStorage.removeItem('code');
    localStorage.removeItem('verifycode');
    getSpecificCategory(id);
    getSubCategories(id);
  }, [id]);

  async function getSpecificCategory(id) {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
      setCategoryDetails(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function getSubCategories(id) {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
      setSubCategories(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  if (isLoading) return <div className="text-center text-xl mt-10">Loading...</div>;

  return (
    <>

    <div className="container mx-auto my-10 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center gap-6">
        <LazyLoadImage
          src={categoryDetails.image}
          alt={categoryDetails.name}
          className="w-full md:w-1/3 rounded-lg"
        />
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-semibold mb-4">{categoryDetails.name}</h2>
          <p className="text-xl font-medium text-gray-700 mb-2">SubCategories</p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {subCategories.length > 0 ? (
              subCategories.map((subCat) => (
                <span key={subCat._id} className="bg-green-600 text-white px-4 py-1 rounded-lg">
                  {subCat.name}
                </span>
              ))
            ) : (
              <span className="text-gray-500 bg-red-400 px-2 rounded-full">No Subcategories Available</span>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
