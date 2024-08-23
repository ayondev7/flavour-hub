import React, { useState } from "react";
// import ratingImg from "./rating.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import '../stylesheet/slider.css';
import {getUserIdFromToken,isTokenValid} from '../assets/tokenUtils'
import {useNavigate} from 'react-router-dom'

const Rating = ({recipeId}) => {
  const [rating, setRating] = useState(0); 
  const navigate = useNavigate();

  const postRating = async (e) => {
    e.preventDefault();
    if (isTokenValid()) {
     let userId = getUserIdFromToken();
      try {
        const response = await axios.post(
          "http://localhost:5000/api/recipe/postRating",
          {
            userId: userId,
            recipeId: recipeId,
            rating: rating,
          }
        );
        toast.success("Thank You for your feedback.");
        setRating(1);
      } catch (error) {
        console.error("Error posting rating", error);
        toast.error("Error submitting rating");
      }
    }else{
        navigate('/login');
    }
  };

  return (
    <div className="flex justify-center items-center">
    <ToastContainer/>
      <div className="shadow-xl rounded-lg w-[450px] mb-16 p-4 bg-lightPink">
        <p className="text-center text-2xl text-black font-semibold">
          Rate this recipe
        </p>
        {/* <img src={ratingImg} alt="Rating" className="w-full h-auto" /> */}
        <p className="mt-4 text-md text-black text-center">
          We highly value your feedback. Kindly take a moment to share your
          experience with the others.
        </p>
        <form onSubmit={postRating}>
          <input
            type="range"
            min={1}
            max={5}
            value={rating}
            required
            className="range bg-white mt-6 mb-2"
            onChange={(e) => setRating(e.target.value)}
            style={{
              WebkitAppearance: "none",
              appearance: "none",
              outline: "none",
              opacity: "0.7",
              transition: "opacity .2s",
            }}
          />
          <div className="w-full flex justify-between text-md px-2 text-black">
            <span>Worst</span>
            <span>Bad</span>
            <span>Average</span>
            <span>Good</span>
            <span>Best</span>
          </div>
          <div className="flex justify-center mb-3 mt-6"><button className="bg-hotPink p-2 w-[100px] rounded-lg text-white font-semibold">Submit</button></div>
        </form>
      </div>
    </div>
  );
};

export default Rating;
