import React, { useState, useEffect, useContext } from 'react';
import Style from './ProductDetails.module.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Heart } from 'lucide-react';

export default function ProductDetails() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const { id, category } = useParams();
  const {
    addToCart,
    setCart,
    addToWishList,
    removeWishListItem,
    getWishListItem,
    setWishList,
  } = useContext(CartContext);

  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishListProductIds, setWishListProductIds] = useState([]);

  // Fetch product details
  function getProductDetails(id) {
    setLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductDetails(data.data);
      })
      .catch((err) => {
        setError('Failed to fetch product details');
        console.error(err);
      })
      .finally(() => setLoading(false));
  }

  // Fetch related products
  function getRelatedProducts(category) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let related = data.data.filter(
          (product) => product.category.name === category
        );
        setRelatedProducts(related);
      })
      .catch((err) => {
        setError('Failed to fetch related products');
        console.error(err);
      });
  }

  // Wishlist fetch
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

  // Toggle wishlist
  async function toggleWishList(productId) {
    if (wishListProductIds.includes(productId)) {
      await removeWishListItem(productId);
      setWishListProductIds((prev) => prev.filter((id) => id !== productId));
      const updated = await getWishListItem();
      setWishList(updated.data);
      toast.success('Removed from wishlist');
    } else {
      const res = await addToWishList(productId);
      if (res.data.status === 'success') {
        setWishListProductIds((prev) => [...prev, productId]);
        const updated = await getWishListItem();
        setWishList(updated.data);
        toast.success('Added to wishlist');
      } else {
        toast.error('Error adding to wishlist');
      }
    }
  }

  // Add to cart
  async function addProduct(productId) {
    const response = await addToCart(productId);
    if (response.data.status === 'success') {
      setCart(response.data);
      toast.success('Product added successfully to your cart');
    } else {
      toast.error('Error adding product to your cart');
    }
  }

  // On mount/update
  useEffect(() => {
    getProductDetails(id);
    getRelatedProducts(category);
  }, [id, category]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!productDetails) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <p>No product details available</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      {/* Product Details */}
      <div className="flex flex-col md:flex-row gap-6">
       <div className="relative w-full md:w-1/3">
  <Slider {...settings}>
    {productDetails.images?.map((src, index) => (
      <img
        key={index}
        className="w-full h-[300px] md:h-[400px] object-cover rounded-lg"
        src={src}
        alt={productDetails.title}
      />
    ))}
  </Slider>
  <button
    onClick={() => toggleWishList(productDetails.id)}
    className="absolute top-2 right-2 z-10"
  >
    <Heart
      className={`w-6 h-6 ${wishListProductIds.includes(productDetails.id)
        ? 'fill-red-600 text-red-600'
        : 'text-gray-400'
        }`}
    />
  </button>
</div>

        <div className="w-full md:w-2/3 p-4 text-start">
          <h1 className="text-lg md:text-2xl font-normal text-gray-950">
            {productDetails.title}
          </h1>
          <p className="text-gray-600 font-light mt-4 text-sm md:text-base">
            {productDetails.description}
          </p>
          <div className="flex my-4 justify-between items-center">
            <span className="text-base md:text-lg">{productDetails.price} EGP</span>
            <span className="text-base md:text-lg">
              {productDetails.ratingsAverage} <i className="fas fa-star text-yellow-500"></i>
            </span>
          </div>
          <button
            onClick={() => addProduct(productDetails.id)}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-b-lg hover:bg-green-700 transition-colors text-center h-10 flex items-center justify-center"
          >
            Add to cart
          </button>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-8">
        <h2 className="text-xl md:text-2xl font-medium text-gray-800 mb-4">
          Related Products
        </h2>
        <div className="flex flex-wrap -mx-2">
          {relatedProducts.map((product) => (
            <div
              key={product.id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-2 mb-4"
            >
              <div className="relative product bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <button
                  onClick={() => toggleWishList(product.id)}
                  className="absolute top-2 right-2 z-10"
                >
                  <Heart
                    className={`w-5 h-5 ${wishListProductIds.includes(product.id)
                      ? 'fill-red-600 text-red-600'
                      : 'text-gray-400'
                      }`}
                  />
                </button>
                <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                  <img
                    className="w-full h-[150px] md:h-[180px] object-cover rounded-t-lg"
                    src={product.imageCover}
                    alt={product.title}
                  />
                  <div className="p-2">
                    <span className="block font-light text-green-600 text-sm md:text-base">
                      {product.category.name}
                    </span>
                    <h3 className="text-sm md:text-base font-normal text-gray-800 mb-2 line-clamp-2">
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
          ))}
        </div>
      </div>
    </div>
  );
}
