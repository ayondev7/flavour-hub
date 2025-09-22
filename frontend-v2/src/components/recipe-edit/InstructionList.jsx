import React, { useState } from 'react';
import { HiOutlineCheck, HiOutlinePencilAlt, HiOutlineX, HiOutlineTrash } from 'react-icons/hi';

const InstructionList = ({ instructions, onUpdate, onDelete }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditValue(instructions[index].value);
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditValue('');
  };

  const handleSave = async () => {
    await onUpdate(instructions[editingIndex]._id, editValue);
    setEditingIndex(null);
  };

  const handleChange = (e) => {
    setEditValue(e.target.value);
  };

  return (
    <div className="flex flex-col items-start w-full lg:w-[70%] my-4">
      <label className="text-base text-black font-medium mb-2" htmlFor="instructions">
        Instructions :
      </label>
      {instructions.map((instruction, index) => (
        <div key={index} className="flex w-full">
          {editingIndex === index ? (
            <>
              <input
                type="text"
                className="input input-bordered mb-6 text-black w-[80%] border border-gray-300 bg-white focus:border-hotPink focus:ring-0"
                value={editValue}
                onChange={handleChange}
              />
              <button onClick={handleSave} className="ml-4">
                <HiOutlineCheck className="text-xl text-green-400" />
              </button>
              <button onClick={handleCancel} className="ml-4">
                <HiOutlineX className="text-xl text-hotPink" />
              </button>
            </>
          ) : (
            <div className="w-full flex pb-6">
              <p className="text-black w-full lg:w-[80%] px-3 py-3 rounded-lg border border-hotPink bg-white focus:border-hotPink focus:ring-0">
                {instruction.value}
              </p>
              <button onClick={() => handleEdit(index)} className="ml-4">
                <HiOutlinePencilAlt className="text-xl text-hotPink" />
              </button>
              <button
                className="p-2 ml-1"
                onClick={() => onDelete(instruction._id)}
                disabled={instructions.length < 2}
                type="button"
              >
                <HiOutlineTrash className="text-xl text-hotPink" />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default InstructionList;