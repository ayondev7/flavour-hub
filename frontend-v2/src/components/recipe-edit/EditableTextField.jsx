import React, { useState, useEffect } from 'react';
import { HiOutlineCheck, HiOutlinePencilAlt, HiOutlineX } from 'react-icons/hi';

const EditableTextField = ({ label, value, onSave, name }) => {
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

  return (
    <div className="flex flex-col items-start gap-y-2 w-full lg:w-[70%]">
      <label className="text-base text-black font-medium" htmlFor={name}>
        {label} :
      </label>
      {isEditing ? (
        <div className="flex w-full">
          <input
            type="text"
            className="input input-bordered text-black w-[80%] border border-gray-400 bg-white focus:border-hotPink focus:ring-0"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <button className="mx-4" onClick={handleSave}>
            <HiOutlineCheck className="text-xl text-green-400" />
          </button>
          <button onClick={handleCancel}>
            <HiOutlineX className="text-xl text-hotPink" />
          </button>
        </div>
      ) : (
        <div className="flex w-full">
          <p className="text-black w-full lg:w-[80%] px-3 py-3 rounded-lg border border-hotPink bg-white focus:border-hotPink focus:ring-0">
            {value}
          </p>
          <button className="ml-4" onClick={handleEdit}>
            <HiOutlinePencilAlt className="text-xl text-hotPink" />
          </button>
        </div>
      )}
    </div>
  );
};

export default EditableTextField;