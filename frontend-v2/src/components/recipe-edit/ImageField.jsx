import React, { useRef, useState } from 'react';
import { HiOutlineCheck } from 'react-icons/hi';

const ImageField = ({ image, onSave }) => {
  const imageInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSaveButton, setShowSaveButton] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setShowSaveButton(true);
    }
  };

  const handleImageSave = async () => {
    if (!imageInputRef.current.files[0]) return;
    const formData = new FormData();
    formData.append('image', imageInputRef.current.files[0]);
    await onSave(formData);
    setShowSaveButton(false);
  };

  return (
    <div className="flex flex-col items-start gap-y-2 w-full lg:w-[70%]">
      <label className="text-base text-black font-medium" htmlFor="image">
        Recipe Image :
      </label>
      <div className="mb-3 rounded-lg">
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Selected"
            className="h-[200px] w-[300px] object-cover rounded-lg"
          />
        ) : image ? (
          <img
            src={`data:image/jpeg;base64,${image}`}
            alt="Recipe"
            className="h-[200px] w-[300px] object-cover rounded-lg"
          />
        ) : null}
      </div>
      <div className="w-full flex">
        <input
          type="file"
          name="image"
          ref={imageInputRef}
          className="file-input file-input-bordered file-input-primary border-hotPink w-[90%] lg:w-[80%] bg-white focus:border-hotPink focus:ring-0"
          onChange={handleImageChange}
        />
        {showSaveButton && (
          <button className="ml-4" onClick={handleImageSave}>
            <HiOutlineCheck className="text-xl text-green-400" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageField;