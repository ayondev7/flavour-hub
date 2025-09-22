import React, { useState, useEffect } from 'react';
import { HiOutlineCheck, HiOutlinePencilAlt, HiOutlineX } from 'react-icons/hi';

const NutritionalField = ({ value, onSave }) => {
  const [editModes, setEditModes] = useState({
    calories: false,
    protein: false,
    fat: false,
    carbs: false,
  });
  const [editValues, setEditValues] = useState(value);

  useEffect(() => {
    setEditValues(value);
  }, [value]);

  const handleEdit = (field) => {
    setEditModes({ ...editModes, [field]: true });
    setEditValues({ ...editValues, [field]: value[field] });
  };

  const handleCancel = (field) => {
    setEditModes({ ...editModes, [field]: false });
    setEditValues({ ...editValues, [field]: value[field] });
  };

  const handleSave = async (field) => {
    await onSave(editValues);
    setEditModes({ ...editModes, [field]: false });
  };

  const handleChange = (field, val) => {
    setEditValues({ ...editValues, [field]: val });
  };

  return (
    <div className="flex flex-col items-start gap-y-4 mb-4 w-full lg:w-[70%]">
      <label className="text-base text-black font-medium" htmlFor="nutritionalValues">
        Nutritional Values :
      </label>
      <div className="flex flex-col gap-y-6 w-full">
        {['calories', 'protein', 'fat', 'carbs'].map((field) => (
          <div key={field} className="flex items-center w-full">
            {editModes[field] ? (
              <>
                <input
                  type="text"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="input input-bordered text-black border w-[80%] border-gray-400 bg-white focus:border-hotPink focus:ring-0"
                  value={editValues[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                />
                <button onClick={() => handleSave(field)} className="mx-4">
                  <HiOutlineCheck className="text-xl text-green-400" />
                </button>
                <button onClick={() => handleCancel(field)}>
                  <HiOutlineX className="text-xl text-hotPink" />
                </button>
              </>
            ) : (
              <>
                <span className="text-black w-full lg:w-[80%] px-3 py-3 rounded-lg border border-hotPink bg-white focus:border-hotPink focus:ring-0">
                  {value[field]}
                </span>
                <button onClick={() => handleEdit(field)} className="ml-4">
                  <HiOutlinePencilAlt className="text-xl text-hotPink" />
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutritionalField;