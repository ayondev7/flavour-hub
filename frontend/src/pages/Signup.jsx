import React, { useState } from "react";
import axios from "axios";
import images from "../assets/images";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent form submission
    setIsLoading(true); // Start loading

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", {
        position: "top-center",
        autoClose: 3000,
      });
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (image) formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/create-user",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Signup successful!", {
        position: "top-center",
        autoClose: 3000,
      });
      sessionStorage.setItem("token", response.data.token);
      setTimeout(() => navigate("/userHome"), 3000);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        toast.error("Signup failed. Please try again.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="px-0 lg:px-16 flex items-center h-screen bg-white overflow-hidden">
      <ToastContainer />
      <div className="flex justify-center lg:pt-[100px] lg:pb-[150px] w-full">
        <img
          src={images.login}
          alt="Signup"
          className="h-[600px] absolute left-[10%] top-[5%] lg:block hidden"
        />
        <div className="w-[80%] lg:w-[40%] lg:ml-[40%] mt-16">
          <form className="space-y-3" onSubmit={handleSignup}>
            <h1 className=" text-black text-4xl font-bold text-center">
              Recipe<span className="text-hotPink">Finder</span>
            </h1>
            <div className="flex flex-col">
              <label
                className="text-customGrayMedium text-base font-semibold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Your Name"
                className="input text-black text-sm font-medium input-bordered w-full bg-white border border-gray-400 focus:outline-[#dc2777] focus:border-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="text-customGrayMedium text-base font-semibold mb-2"
                htmlFor="image"
              >
                Profile Image
              </label>
              <input
                type="file"
                className="file-input file-input-bordered focus:border-none file-input-primary border border-gray-400 bg-white w-full"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="text-customGrayMedium text-base font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                className="input text-black text-sm font-medium border-gray-400 input-bordered w-full focus:border-none bg-white border focus:outline-[#dc2777]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col relative">
              <label
                className="text-customGrayMedium text-base font-semibold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter Your Password"
                className="input text-black text-sm font-medium border-gray-400 focus:border-none input-bordered w-full bg-white border focus:outline-[#dc2777]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute right-4 top-12 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
            <div className="flex flex-col relative">
              <label
                className="text-customGrayMedium text-base font-semibold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Your Password"
                className="input text-black text-sm font-medium border-gray-400 focus:border-none input-bordered w-full bg-white border focus:outline-[#dc2777]"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span
                className="absolute right-4 top-12 cursor-pointer text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </span>
            </div>
            <div>
              <button
                type="submit"
                className={`my-2 px-3 py-3 font-bold text-white rounded-lg text-sm w-full bg-hotPink border-none transition-all duration-500 ease-in-out ${
                  isLoading
                    ? "cursor-not-allowed opacity-75"
                    : "hover:text-white"
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm text-white"></span>
                ) : (
                  "Signup"
                )}
              </button>
            </div>
            <p className=" text-hotPink font-medium text-sm text-center">
              <Link to="/login">Already have an account? Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
