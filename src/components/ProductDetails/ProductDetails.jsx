import React from 'react'
import Style from './ProductDetails.module.css'
import { useState } from 'react'
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
export default function ProductDetails() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
  };
  let { id, category } = useParams()
  const [productDetails, setProductDetails] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])

  function getProductDetails(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {

        setProductDetails(data.data)
      })
      .catch(() => {

      })


  }
  function getRelatedProducts(category) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let allProducts = data.data;
        let related = allProducts.filter((product) => product.category.name == category)
        setRelatedProducts(related)

      })
      .catch(() => {

      })


  }
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    getProductDetails(id);
    getRelatedProducts(category)
  }, [id, category]);


  return <>
    <div className="row">
      <div className="w-1/4">
        <Slider {...settings}>
          {productDetails?.images.map((src)=>
           < img className = 'w-full' src = { src } alt = { productDetails?.title} />
)}
        </Slider>
      </div>
      <div className="w-3/4 p-6 text-start">
        <h1 className='text-lg font-normal text-gray-950'>{productDetails?.title}</h1>
        <p className='text-gray-600 font-light mt-4'>{productDetails?.description}</p>
        <div className="flex my-4 justify-between items-center">
          <span>{productDetails?.price} EGP</span>
          <span>{productDetails?.ratingsAverage} <i className='fas fa-star text-yellow-500 '></i></span>

        </div>
        <button className='btn' >Add to cart</button>
      </div>

    </div>

    <div className="row">
      {relatedProducts.map((product) =>
        <div key={product.id} className=" w-1/6 px-3">
          <div className="product py-4">
            <Link to={`/productdetails/${product.id}/${product.category.name}`}>
              <img className='w-full' src={product.imageCover} alt={product.title} />
              <span className="block font-light mt-2 text-green-600">{product.category.name}</span>
              <h3 className='text-lg font-normal text-gray-800 mb-4'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
              <div className="flex justify-between items-center">
                <span>{product.price} EGP</span>
                <span>{product.ratingsAverage} <i className='fas fa-star text-yellow-500 '></i></span>

              </div>
              <button className='btn' >Add to cart</button>
            </Link>
          </div>
        </div>
      )}


    </div>
  </>


}
