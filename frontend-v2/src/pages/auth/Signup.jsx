import React from 'react';
import images from '@assets/images';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSignupForm } from '@hooks/useSignupForm';
import PasswordInput from '@components/forms/PasswordInput';
import FileInput from '@components/forms/FileInput';

/**
 * Signup page component.
 * @returns {JSX.Element} - Signup form.
 */
const Signup = () => {
  const {
    register,
    handleSubmit,
    errors,
    image,
    previewUrl,
    isLoading,
    handleFileSelect,
  } = useSignupForm();

  return (
    <div className="px-0 lg:px-16 flex items-center lg:h-screen bg-white overflow-hidden">
      <ToastContainer />
      <div className="flex justify-center lg:pt-[100px] lg:pb-[150px] w-full relative">
        <img
          src={images.login}
          alt="Signup"
          className="h-[600px] absolute left-[10%] top-[16%] lg:block hidden"
        />
        <div className="w-[80%] lg:w-[40%] lg:ml-[40%] mt-16">
          <form className="space-y-3" onSubmit={handleSubmit}>
            <h1 className="text-black text-4xl font-bold text-center">
              Flavor<span className="text-hotPink">Hub</span>
            </h1>
            <div className="flex flex-col">
              <label className="text-customGrayMedium text-base font-semibold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register('name')}
                placeholder="Enter Your Name"
                className="input text-black text-sm font-medium input-bordered w-full bg-white border border-gray-400 focus:outline-[#dc2777] focus:border-none"
                aria-invalid={errors.name ? 'true' : 'false'}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            <FileInput onFileSelect={handleFileSelect} previewUrl={previewUrl} error={errors.image} />
            <div className="flex flex-col">
              <label className="text-customGrayMedium text-base font-semibold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register('email')}
                placeholder="Enter Your Email"
                className="input text-black text-sm font-medium border-gray-400 input-bordered w-full focus:border-none bg-white border focus:outline-[#dc2777]"
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <PasswordInput register={register} name="password" placeholder="Enter Your Password" error={errors.password} />
            <PasswordInput register={register} name="confirmPassword" placeholder="Confirm Your Password" error={errors.confirmPassword} />
            <div>
              <button
                type="submit"
                className={`my-2 px-3 py-3 font-bold text-white rounded-lg text-sm w-full bg-hotPink border-none transition-all duration-500 ease-in-out ${
                  isLoading ? 'cursor-not-allowed opacity-75' : 'hover:text-white'
                }`}
                disabled={isLoading}
                aria-label="Signup button"
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-xs text-white"></span>
                ) : (
                  'Signup'
                )}
              </button>
            </div>
            <p className="text-hotPink font-medium text-sm text-center">
              <Link to="/login">Already have an account? Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
