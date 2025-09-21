import React from "react";

const MarqueeComponent = ({ name, image }) => {
  return (
    <div>
      <div className="relative w-[150px] h-[80px] hover:cursor-pointer mt-4 mb-8">
        <img
          className="w-full h-[80px] object-cover rounded-md"
          src={image}
          alt={name}
        />
        <div className="absolute bg-black h-[80px] w-full top-0 rounded-md opacity-30"></div>
        <p className="absolute top-0 h-[80px] w-full text-white font-bold text-xl flex items-center justify-center">
          {name}
        </p>
      </div>
    </div>
  );
};

export default MarqueeComponent;
