import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import images from '@assets/images';

const RecipeCategoryCarousel = () => {

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1, // Show only 1 slide at a time
    slidesToScroll: 1,
    autoplay: true,
    speed:500,
    autoplaySpeed:2000,
    cssEase: 'linear',
    adaptiveHeight: true, // Ensure each slide takes the full height
    arrows:false
  };

  return (
    <div>
      {(
        <div className="flex flex-col lg:w-1/2 w-full">
          <Slider {...settings}>

          <div className='flex justify-center items-center'>
                <div className="card relative">
                  <figure className='relative'>
                    <img className='object-cover rounded-lg h-[500px] w-full max-w-[100%] ma-h-[100%]' src={images.veganFriendly} alt="Shoes" />
                    <div className="absolute h-[500px] inset-0 bg-black opacity-40 rounded-lg"></div>
                    <p className='absolute text-4xl lg:text-6xl text-white font-semibold inset-0 flex justify-center items-center'>Vegan-Friendly</p>
                  </figure>
                </div>
          </div>

          <div className='flex justify-center items-center'>
                <div className="card relative">
                  <figure className='relative'>
                    <img className='object-cover rounded-lg h-[500px] w-full max-w-[100%] ma-h-[100%]' src={images.quinoaStuffedBellPeppers} alt="Shoes" />
                    <div className="absolute h-[500px] inset-0 bg-black opacity-40 rounded-lg"></div>
                    <p className='absolute text-4xl lg:text-6xl text-white font-semibold inset-0 flex justify-center items-center'>Gluten-Free</p>
                  </figure>
                </div>
          </div>

          <div className='flex justify-center items-center'>
                <div className="card relative">
                  <figure className='relative'>
                    <img className='object-cover rounded-lg h-[500px] w-full max-w-[100%] ma-h-[100%]' src={images.dairyFree} alt="Shoes" />
                    <div className="absolute h-[500px] inset-0 bg-black opacity-40 rounded-lg"></div>
                    <p className='absolute text-4xl lg:text-6xl text-white font-semibold inset-0 flex justify-center items-center'>Dairy-Free</p>
                  </figure>
                </div>
          </div>

          <div className='flex justify-center items-center'>
                <div className="card relative">
                  <figure className='relative'>
                    <img className='object-cover rounded-lg h-[500px] w-full max-w-[100%] ma-h-[100%]' src={images.vegetarian} alt="Shoes" />
                    <div className="absolute h-[500px] inset-0 bg-black opacity-40 rounded-lg"></div>
                    <p className='absolute text-4xl lg:text-6xl text-white font-semibold inset-0 flex justify-center items-center'>Vegetarian</p>
                  </figure>
                </div>
          </div>
            
          <div className='flex justify-center items-center'>
                <div className="card relative">
                  <figure className='relative'>
                    <img className='object-cover rounded-lg h-[500px] w-full max-w-[100%] ma-h-[100%]' src={images.nonVegetarian} alt="Shoes" />
                    <div className="absolute h-[500px] inset-0 bg-black opacity-40 rounded-lg"></div>
                    <p className='absolute text-4xl lg:text-6xl text-white font-semibold inset-0 flex justify-center items-center'>Non-Vegetarian</p>
                  </figure>
                </div>
          </div>

          </Slider>
        </div>
      )}
    </div>
  );
};

export default RecipeCategoryCarousel;
