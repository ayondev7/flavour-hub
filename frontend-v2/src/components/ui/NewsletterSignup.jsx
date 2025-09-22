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
      <input
        type="email"
        className="input text-black text-base border-[#dc2777] font-medium input-bordered w-full bg-white border"
        placeholder="abcd@gmail.com"
      />
      <button className="rounded-lg w-[100%] p-3 my-6 text-base text-white font-bold bg-hotPink">
        Sign Up
      </button>
    </div>
  );
};

export default NewsletterSignup;