import React, { useState } from "react";
import axios from "axios";
import images from "../assets/images";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Track password visibility
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        const response = await axios.post("http://localhost:5000/api/user/loginUser", { email, password });

        if (response.data.success) {
            sessionStorage.setItem("token", response.data.token);
            await checkAuth(); // Update authentication state
            navigate("/userHome");
        } else {
            toast.error(response.data.message, {
                position: "top-center",
                autoClose: 3000,
            });
        }
    } catch (error) {
        console.error("Error details:", error.response || error.message);

        if (error.response?.data?.message) {
            toast.error(error.response.data.message, {
                position: "top-center",
                autoClose: 3000,
            });
        } else {
            toast.error("Something went wrong. Please try again later.", {
                position: "top-center",
                autoClose: 3000,
            });
        }
    } finally {
        setIsLoading(false);
    }
};



  return (
    <div className="px-0 lg:px-16 flex items-center h-screen bg-white overflow-hidden">
      <ToastContainer />
      <div className="flex justify-center lg:pt-[100px] lg:pb-[150px] w-full max-h-[100%]">
        <img
          src={images.login}
          alt="Login"
          className="h-[600px] absolute left-[10%] top-[5%] lg:block hidden"
        />
        <div className="w-[80%] lg:w-[40%] lg:ml-[40%]">
          <form className="space-y-4" onSubmit={handleLogin}>
            <h1 className=" text-black text-4xl font-bold text-center">
              Recipe<span className="text-hotPink">Finder</span>
            </h1>
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
                className="input text-black text-sm focus:border-none font-medium input-bordered w-full bg-white border border-gray-400 focus:outline-[#dc2777]"
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
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter Your Password"
                className="input text-black text-sm focus:border-none font-medium input-bordered w-full bg-white border border-gray-400 focus:outline-[#dc2777]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute top-12 right-4 text-gray-500"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </button>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className={`my-2 px-3 py-3 font-bold text-white rounded-lg text-sm w-full bg-hotPink border-none transition-all duration-500 ease-in-out ${
                  isLoading ? "cursor-not-allowed opacity-75" : "hover:text-white"
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm text-white"></span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
            <p className=" text-hotPink font-medium text-sm text-center">
              <Link to="/signup">Don't have an account? Signup</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
