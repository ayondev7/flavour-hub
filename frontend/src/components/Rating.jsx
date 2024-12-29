import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import '../stylesheet/slider.css';
import { getUserIdFromToken, isTokenValid } from '../assets/tokenUtils';
import { useNavigate } from 'react-router-dom';

const Rating = ({ recipeId }) => {
  const [rating, setRating] = useState(1); // default to 40
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for loading
  const navigate = useNavigate();

  const postRating = async (e) => {
    e.preventDefault();
    if (isTokenValid()) {
      let userId = getUserIdFromToken();
      setIsSubmitting(true); // Set loading state to true
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
        setRating(1); // Reset the rating slider
        e.target.reset(); // Clear the form
      } catch (error) {
        console.error("Error posting rating", error);
        toast.error("Error submitting rating");
      } finally {
        setIsSubmitting(false); // Reset loading state
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="flex justify-center items-center">
      <ToastContainer />
      <div className="rounded-lg w-[400px] mb-16 p-4 bg-lightPink">
        <p className="text-center text-2xl text-black font-semibold">
          Rate this recipe
        </p>
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
            className="range range-primary mt-6 mb-2 bg-white"
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
          <div className="flex justify-center mb-3 mt-6">
            <button
              type="submit"
              className="bg-hotPink px-4 py-2 rounded-lg text-white font-semibold"
              disabled={isSubmitting} // Disable button while submitting
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Rating;
