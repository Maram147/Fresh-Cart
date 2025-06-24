import React from 'react';
import Slider from 'react-slick';
import imgSlider1 from '../../assets/images/slide-1.jpg';
import imgSlider2 from '../../assets/images/slider-2.jpeg';
import imgSlider3 from '../../assets/images/grocery-banner.png';
import imgSlider4 from '../../assets/images/fruits -slider.png';
import imgSlider5 from '../../assets/images/banner-4.jpeg';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
export default function HomeSlider() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    rtl: true,
  };

  const slideTextStyle =
    'absolute top-0 left-0 p-6 sm:p-10 lg:ps-16 lg:py-20 text-black font-sans';

  const renderSlide = (img, offer, title, price) => (
    <div className="relative rounded-lg">
      <LazyLoadImage src={img} className="w-full rounded-lg h-[525px] object-cover" alt="slider" />
      <div className={`max-w-2xl ${slideTextStyle}`}>
        <div className="flex items-center mb-4">
          <span>Exclusive Offer</span>
          <span className="bg-red-600 text-white text-xs font-semibold ms-2 px-2 py-1 rounded">{offer}%</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-3 leading-tight">{title}</h2>
        <p className="text-lg">Only on this week... Don’t miss</p>
        <div className="my-4 text-lg">
          Start from <span className="text-red-600 font-semibold ms-1">{price}EGP</span>
        </div>
        <Link to="/products" className="btn btn-success inline-flex items-center gap-2">
          Shop Deals Now <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col xl:flex-row gap-4 mt-5">
      <div className="w-full xl:w-8/12 mb-2">
        <div className="">
          <Slider {...settings}>
            {renderSlide(imgSlider3, 20, 'Cokoladni Kolutici Lasta', 185)}
            {renderSlide(imgSlider1, 15, 'Best Online Deals', 150)}
            {renderSlide(imgSlider2, 35, 'Chocozay wafer\n-rolls Deals', 200)}
          </Slider>
        </div>
      </div>

      <div className="w-full xl:w-4/12 flex flex-col gap-4">
        <div className="relative w-full">
          <LazyLoadImage src={imgSlider4} className="w-full rounded-lg h-[250px] object-cover" alt="banner1" />
          <div className="absolute top-0 left-0 p-6 font-sans text-black">
            <h3 className="text-2xl font-bold mb-3">10% cashback on<br/>personal care</h3>
            <div className="text-lg mb-4">
              <p className="mb-0">Max cashback: $12</p>
              <span>Code: <span className="font-bold">CARE12</span></span>
            </div>
            <Link to="/products" className="btn btn-dark">Shop Now</Link>
          </div>
        </div>
        <div className="relative w-full">
          <LazyLoadImage src={imgSlider5} className="w-full rounded-lg h-[250px] object-cover" alt="banner2" />
          <div className="absolute top-0 left-0 p-6 font-sans text-black">
            <h3 className="text-2xl font-bold mb-3">Say yes to<br/>season’s fresh</h3>
            <div className="text-lg mb-4">
              <p className="mb-0">Refresh your day<br/>the fruity way</p>
            </div>
            <Link to="/products" className="btn btn-dark">Shop Now</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
