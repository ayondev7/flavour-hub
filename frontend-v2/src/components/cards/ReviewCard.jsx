import React from "react";
import images from "@assets/images.js";

const ReviewCard = () => {
  return (
    <div>
      <div className="card w-[350px] bg-white text-primary-content absolute z-10 top-[65%] right-[52%] shadow-lg">
        <div className="card-body p-6">
          <div className="avatar flex h-[50px] w-[100%]">
            <div className="size-12 rounded-full ring ring-green-400 ring-offset-1">
              <img
                className="object-cover w-full h-full"
                src={images.personImage}
                alt="avatar"
              />
            </div>
            <div className="flex-col ml-4 flex-grow">
              <h2 className="card-title text-black text-base">Sara Johnson</h2>
              <div className="rating">
                {Array.from({ length: 5 }, (_, index) => (
                  <input
                    key={index}
                    type="radio"
                    name="rating-4"
                    className="mask mask-star-2 bg-green-500 size-3"
                    checked={index === 3}
                  />
                ))}
              </div>
            </div>
          </div>

          <p className="font-medium text-sm text-black mt-1">
            This recipe is a flavour explosion in my mouth! Very delicious.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
