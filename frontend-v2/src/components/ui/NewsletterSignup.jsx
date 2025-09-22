import React from "react";

const NewsletterSignup = () => {
  return (
    <div className="w-[400px] px-6 py-4 bg-lightPink rounded-lg hidden lg:block">
      <p className="text-black text-xl font-semibold text-center my-2">
        Stay connected with our recipe updates
      </p>
      <p className="text-gray-600 text-center text-base mb-4">
        Subscribe for the latest recipes and health tips
      </p>
      <label className="input input-bordered bg-white flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
        </svg>
        <input
          type="email"
          className="grow text-black"
          placeholder="Enter Your Email"
        />
      </label>
      <button className="rounded-lg w-[100%] p-3 my-6 text-base text-white font-bold bg-hotPink">
        Sign Up
      </button>
    </div>
  );
};

export default NewsletterSignup;