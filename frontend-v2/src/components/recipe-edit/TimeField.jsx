import React, { useState, useEffect } from 'react';
import { HiOutlineCheck, HiOutlinePencilAlt, HiOutlineX } from 'react-icons/hi';

const TimeField = ({ label, value, onSave, name }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditValue(value);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue(value);
  };

  const handleSave = async () => {
    await onSave(name, editValue);
    setIsEditing(false);
  };

  const handleChange = (field, val) => {
    setEditValue({ ...editValue, [field]: val });
  };

  return (
    <div className="flex flex-col items-start gap-y-2 w-full lg:w-[70%]">
      <label className="text-base text-black font-medium" htmlFor={name}>
        {label} :
      </label>
      <div className="w-full flex">
        <div className="flex w-full lg:w-[80%] justify-between">
          {isEditing ? (
            <>
              <input
                type="number"
                placeholder="Hours"
                className="w-[48%] border border-gray-400 rounded-lg flex items-center px-3 text-black py-3 bg-white focus:border-hotPink focus:ring-0"
                value={editValue.hours}
                onChange={(e) => handleChange('hours', e.target.value)}
              />
              <input
                type="number"
                placeholder="Minutes"
                className="w-[48%] border border-gray-400 rounded-lg flex items-center px-3 text-black py-3 bg-white focus:border-hotPink focus:ring-0"
                value={editValue.minutes}
                onChange={(e) => handleChange('minutes', e.target.value)}
              />
            </>
          ) : (
            <div className="flex justify-between w-full text-black">
              <span className="w-[48%] border border-hotPink rounded-md flex items-center px-3 text-black py-3 bg-white focus:border-hotPink focus:ring-0">
                {value.hours} Hours
              </span>
              <span className="w-[48%] border border-hotPink rounded-md flex items-center px-3 text-black py-3 bg-white focus:border-hotPink focus:ring-0">
                {value.minutes} Minutes
              </span>
            </div>
          )}
        </div>
        <div>
          {isEditing ? (
            <div className="flex gap-x-4 h-full items-stretch">
              <button className="ml-4" onClick={handleSave}>
                <HiOutlineCheck className="text-xl text-green-400" />
              </button>
              <button onClick={handleCancel}>
                <HiOutlineX className="text-xl text-hotPink" />
              </button>
            </div>
          ) : (
            <div className="flex gap-x-4 h-full items-stretch">
              <button className="ml-4" onClick={handleEdit}>
                <HiOutlinePencilAlt className="text-xl text-hotPink" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeField;