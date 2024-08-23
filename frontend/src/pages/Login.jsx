import React, { useState } from "react";
import axios from "axios";
import images from "../assets/images";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission
    setIsLoading(true); // Start loading
    setErrorMessage(""); // Clear previous error messages

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/loginUser",
        { email, password }
      );
      sessionStorage.setItem("token", response.data.token);
      navigate("/userHome"); // Redirect to /User Home after successful login
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
      setIsLoading(false); // Stop loading on error
    }
  };

  return (
    <div className="px-0 lg:px-16 flex items-center h-screen bg-white overflow-hidden">
      <div className="flex justify-center lg:pt-[100px] lg:pb-[150px] w-full max-h-[100%]">
         <img src={images.login} alt="Login" className="h-[600px] absolute left-[10%] top-[5%] lg:block hidden" />
        <div className="w-[80%] lg:w-[40%] lg:ml-[40%]">
          <form onSubmit={handleLogin}>
            {errorMessage && (
              <div className="mb-4 text-red-500 text-center font-semibold text-2xl">
                {errorMessage}
              </div>
            )}
            <h1 className="mb-10 text-black text-4xl font-bold lg:mb-6 text-center">
              Recipe<span className="text-hotPink">Finder</span>
            </h1>
            <div className="mb-6 flex flex-col">
              <label
                className="text-customGrayMedium text-2xl font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                className="input text-black text-lg font-semibold input-bordered w-full bg-white border-[3px] focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label
                className="text-customGrayMedium text-2xl font-semibold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Your Password"
                className="input text-black text-lg font-semibold input-bordered w-full bg-white border-[3px] focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="my-6 h-12 font-bold text-white rounded-lg text-xl w-full bg-hotPink border-none hover:text-white transition-all duration-500 ease-in-out"
            >
              Login
            </button>
            <p className="mb-6 text-hotPink font-semibold text-center">
              <Link to="/signup">Don't have an account? Signup</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
