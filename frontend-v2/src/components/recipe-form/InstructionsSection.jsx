import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { BsPlusLg } from 'react-icons/bs';
import { useController } from 'react-hook-form';

const InstructionsSection = ({ instructions, errors }) => {
  return (
    <div className="flex flex-col items-start gap-y-2 w-full lg:w-[60%]">
      <label className="text-base text-black font-medium" htmlFor="instruction">
        Instructions :
      </label>
      {instructions.fields.map((field, index) => (
        <InstructionField
          key={field.id}
          index={index}
          canRemove={instructions.canRemove}
          onRemove={() => instructions.removeField(index)}
          error={errors.instructions?.[index]?.value?.message}
        />
      ))}
      <button
        className="btn btn-outline border-hotPink text-hotPink hover:text-hotPink my-2"
        onClick={instructions.addField}
        type="button"
      >
        <BsPlusLg /> Add new instruction
      </button>
      {errors.instructions && (
        <span className="text-red-500 text-sm">{errors.instructions.message}</span>
      )}
    </div>
  );
};

const InstructionField = ({ index, canRemove, onRemove, error }) => {
  const { field } = useController({
    name: `instructions.${index}.value`,
  });

  return (
    <div className="flex gap-y-2 w-[90%] lg:w-[85%]">
      <input
        {...field}
        type="text"
        placeholder="Enter your instruction with their respective quantity"
        className="input input-bordered text-sm text-black w-full border border-gray-400 focus:outline-none bg-white focus:border-hotPink"
      />
      <button
        className="p-2 ml-2"
        onClick={onRemove}
        disabled={!canRemove}
        type="button"
      >
        <FaTrashAlt className="text-sm text-hotPink hover:cursor-pointer" />
      </button>
      {error && <span className="text-red-500 text-sm ml-2">{error}</span>}
    </div>
  );
};

export default InstructionsSection;