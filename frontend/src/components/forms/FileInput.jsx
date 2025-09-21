import React from 'react';

/**
 * Reusable File Input component for image upload.
 * @param {Object} props - Component props.
 * @param {Function} props.onFileSelect - Handler for file selection.
 * @param {string} props.previewUrl - Preview URL.
 * @param {string} props.error - Error message.
 * @returns {JSX.Element} - File input element.
 */
const FileInput = ({ onFileSelect, previewUrl, error }) => {
  return (
    <div className="flex flex-col">
      <label className="text-customGrayMedium text-base font-semibold mb-2" htmlFor="image">
        Profile Image
      </label>
      <input
        id="image"
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        className="hidden"
        onChange={onFileSelect}
      />
      <div
        role="button"
        tabIndex={0}
        onClick={() => document.getElementById('image').click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') document.getElementById('image').click();
        }}
        className="w-full border-2 border-dashed border-gray-300 rounded-lg h-12 flex items-center justify-center cursor-pointer bg-white hover:border-hotPink transition-colors"
        aria-label="Upload profile image"
      >
        {previewUrl ? (
          <img src={previewUrl} alt="preview" className="max-h-10 w-full object-contain rounded" />
        ) : (
          <p className="text-customGrayMedium text-sm text-center">
            Upload a profile image (JPEG, PNG, WEBP) — max 3MB
          </p>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default FileInput;