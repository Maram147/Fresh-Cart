import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ClimbingBoxLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Heart } from 'lucide-react';

export default function RecentProducts() {
  const {
    addToCart,
    setCart,
    addToWishList,
    setWishList,
    getWishListItem,
    removeWishListItem,
  } = useContext(CartContext);

  const [wishListProductIds, setWishListProductIds] = useState([]);

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

  async function addProduct(productId) {
    try {
      const response = await addToCart(productId);
      if (response.data.status === 'success') {
        setCart(response.data);
        toast.success('Product added successfully to your cart');
      } else {
        toast.error('Error adding product to your cart');
      }
    } catch {
      toast.error('Something went wrong');
    }
  }

  function getRecent() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
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
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-wrap -mx-2">
        {data?.data.data.map((product) => {
          const productId = product._id;
          const isInWishList = wishListProductIds.includes(productId);

          return (
            <div key={productId} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-2 mb-4">
              <div className="product bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="relative">
                  <button
                    onClick={() => toggleWishList(productId)}
                    className="absolute top-2 right-2 z-10"
                  >
                    <Heart className={`w-5 h-5 ${isInWishList ? 'fill-red-600 text-red-600' : 'text-gray-400'}`} />
                  </button>

                  <Link to={`/productdetails/${productId}/${product.category.name}`}>
                    <LazyLoadImage
                      className="w-full h-[200px] sm:h-[250px] md:h-[280px] object-cover rounded-t-lg"
                      src={product.imageCover}
                      alt={product.title}
                    />
                    <div className="p-4">
                      <span className="block font-light text-green-600 text-sm md:text-base">
                        {product.category.name}
                      </span>
                      <h3 className="text-base md:text-lg font-normal text-gray-800 mb-4 line-clamp-2">
                        {product.title.split(' ').slice(0, 2).join(' ')}
                      </h3>
                     
                      <div className="flex justify-between items-center">
                        <span className="text-sm md:text-base">{product.price} EGP</span>
                         <span className="text-sm md:text-base">
                        {product.ratingsAverage}{' '}
                        <i className="fas fa-star text-yellow-500"></i>
                      </span>
                      </div>
                    </div>
                  </Link>
                </div>

                <button
                  onClick={() => addProduct(productId)}
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
