import React from 'react';
import { useController } from 'react-hook-form';

const RecipeBasicInfo = ({ control, errors, imageUpload }) => {
  const { field: titleField } = useController({
    name: 'title',
    control,
  });

  const { field: descriptionField } = useController({
    name: 'description',
    control,
  });

  const { field: imageField } = useController({
    name: 'image',
    control,
  });

  return (
    <>
      <div className="flex flex-col items-start gap-y-2 w-full lg:w-[60%]">
        <label className="text-base text-black font-medium" htmlFor="recipeTitle">
          Recipe Title :
        </label>
        <input
          {...titleField}
          type="text"
          placeholder="Enter Recipe Title"
          className="input input-bordered text-sm text-black w-[90%] lg:w-[80%] border border-gray-400 focus:outline-none bg-white focus:border-hotPink"
        />
        {errors.title && (
          <span className="text-red-500 text-sm">{errors.title.message}</span>
        )}
      </div>

      <div className="flex flex-col items-start gap-y-2 w-full lg:w-[60%]">
        <label className="text-base text-black font-medium" htmlFor="image">
          Recipe Image :
        </label>
        <input
          type="file"
          className="file-input file-input-bordered focus:border-none file-input-primary border border-gray-400 bg-white w-[90%] lg:w-[80%]"
          onChange={(e) => {
            const file = e.target.files[0];
            imageUpload.handleImageChange(file, imageField.onChange);
          }}
        />
        {imageUpload.preview && (
          <img
            src={imageUpload.preview}
            alt="Recipe preview"
            className="w-32 h-32 object-cover rounded-lg mt-2"
          />
        )}
        {errors.image && (
          <span className="text-red-500 text-sm">{errors.image.message}</span>
        )}
      </div>

      <div className="flex flex-col items-start gap-y-2 w-full lg:w-[60%]">
        <label className="text-base text-black font-medium" htmlFor="description">
          Description :
        </label>
        <input
          {...descriptionField}
          type="text"
          placeholder="Say a few things about your recipe"
          className="input input-bordered text-sm text-black w-[90%] lg:w-[80%] border border-gray-400 focus:outline-none bg-white focus:border-hotPink"
        />
        {errors.description && (
          <span className="text-red-500 text-sm">{errors.description.message}</span>
        )}
      </div>
    </>
  );
};

export default RecipeBasicInfo;