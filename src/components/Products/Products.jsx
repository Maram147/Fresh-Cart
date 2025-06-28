import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ClimbingBoxLoader } from 'react-spinners';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Heart } from 'lucide-react';
import toast from 'react-hot-toast';

import { CartContext } from '../../Context/CartContext';

export default function Products() {
  const {
    addToCart,
    setCart,
    addToWishList,
    removeWishListItem,
    getWishListItem,
    setWishList,
  } = useContext(CartContext);

  const [wishListProductIds, setWishListProductIds] = useState([]);

  // Fetch wishlist products on mount
  useEffect(() => {
    async function fetchWishlist() {
      try {
        const res = await getWishListItem();
        setWishList(res.data);
        const ids = res.data?.data?.map((p) => p._id) || [];
        setWishListProductIds(ids);
      } catch (err) {
        console.error('Error fetching wishlist:', err);
      }
    }

    fetchWishlist();
  }, []);

  // Toggle wishlist item
 async function toggleWishList(productId) {
  if (wishListProductIds.includes(productId)) {
    try {
      await removeWishListItem(productId);

      setWishListProductIds((prev) => prev.filter((id) => id !== productId));

      const updated = await getWishListItem();
      setWishList(updated.data);

      toast.success('Removed from wishlist');
    } catch (err) {
      toast.error('Failed to remove from wishlist');
    }
  } else {
    try {
      const res = await addToWishList(productId);
      if (res.data.status === 'success') {
        setWishListProductIds((prev) => [...prev, productId]);

        const updated = await getWishListItem();
        setWishList(updated.data);

        toast.success('Added to wishlist');
      } else {
        toast.error('Error adding to wishlist');
      }
    } catch (err) {
      toast.error('Error adding to wishlist');
    }
  }
}


  // Add to cart
  async function addProduct(productId) {
    const res = await addToCart(productId);
    if (res.data.status === 'success') {
      setCart(res.data);
      toast.success('Product added to cart');
    } else {
      toast.error('Error adding to cart');
    }
  }

  // Fetch all products
  function getRecent() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  const { data, isLoading, isError, error } = useQuery({
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
        {data?.data.data.map((product) => {
          const isInWishList = wishListProductIds.includes(product.id);

          return (
            <div
              key={product.id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-2 mb-4"
            >
              <div className="product bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow relative">
                <button
                  onClick={() => toggleWishList(product.id)}
                  className="absolute top-2 right-2 z-10"
                >
                  <Heart className={`w-5 h-5 ${isInWishList ? 'fill-red-600 text-red-600' : 'text-gray-400'}`} />
                </button>

                <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                  <LazyLoadImage
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

                <button
                  onClick={() => addProduct(product.id)}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-b-lg hover:bg-green-700 transition-colors text-center h-10 flex items-center justify-center"
                >
                  Add to cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
