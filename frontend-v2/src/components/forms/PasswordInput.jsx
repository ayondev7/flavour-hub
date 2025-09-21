import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

/**
 * Reusable Password Input component with visibility toggle.
 * @param {Object} props - Component props.
 * @param {Object} props.register - React Hook Form register.
 * @param {string} props.name - Input name.
 * @param {string} props.placeholder - Placeholder text.
 * @param {string} props.error - Error message.
 * @returns {JSX.Element} - Password input element.
 */
const PasswordInput = ({ register, name, placeholder, error }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="flex flex-col relative">
      <label className="text-customGrayMedium text-base font-semibold mb-2" htmlFor={name}>
        {name === 'password' ? 'Password' : 'Confirm Password'}
      </label>
      <input
        type={isVisible ? 'text' : 'password'}
        id={name}
        {...register(name)}
        placeholder={placeholder}
        className="input text-black text-sm font-medium border-gray-400 focus:border-none input-bordered w-full bg-white border focus:outline-[#dc2777]"
        aria-invalid={error ? 'true' : 'false'}
      />
      <button
        type="button"
        className="absolute top-12 right-4 text-gray-500"
        onClick={() => setIsVisible(!isVisible)}
        aria-label={isVisible ? 'Hide password' : 'Show password'}
      >
        {isVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
      </button>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default PasswordInput;