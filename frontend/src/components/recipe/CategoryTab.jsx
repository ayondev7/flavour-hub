import React from "react";
import images from "../assets/images.js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const cuisines = [
  { name: "Italian", image: images.italianRecipe },
  { name: "Korean", image: images.koreanRecipe },
  { name: "Mexican", image: images.mexicanRecipe },
  { name: "Indian", image: images.indianRecipe },
  { name: "American", image: images.americanRecipe },
];

const settings = {
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  vertical: true,
  verticalSwiping: true,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnHover: true,
};


const CategoryTab = ({ onCuisineSelect }) => {
  const handleClick = (cuisine) => {
    if (onCuisineSelect) {
      onCuisineSelect(cuisine);
    }
  };

  return (
    <div>
      <div>
        <p className="text-black text-2xl font-semibold mb-4">
          Explore Our <span className="text-hotPink">Cuisines</span>
        </p>
        <Slider {...settings}>
        {cuisines.map((cuisine, index) => (
          <div
            key={index}
            className="relative h-[200px] hover:cursor-pointer mt-4 mb-8"
            onClick={() => handleClick(cuisine.name)}
          >
            <img
              className="w-full h-[200px] object-cover rounded-md"
              src={cuisine.image}
              alt={cuisine.name}
            />
            <div className="absolute bg-black h-[200px] w-full top-0 rounded-md opacity-30"></div>
            <p className="absolute top-0 h-[200px] w-full text-white font-bold text-4xl flex items-center justify-center">
              {cuisine.name}
            </p>
          </div>
        ))}
        </Slider>
      </div>
    </div>
  );
};

export default CategoryTab;
