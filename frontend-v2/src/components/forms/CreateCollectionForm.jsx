import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoArrowBackOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useCreateCollectionMutation } from "@redux/hooks/collectionHook";

const CreateCollectionForm = ({
  onBack,
  onCreate,
  userId,
  onCollectionCreated,
}) => {
  const [title, setTitle] = useState("");
  const { loading, error } = useSelector((state) => state.collections);
  const [createCollection] = useCreateCollectionMutation();

  const handleCreate = async () => {
    if (!title.trim()) {
      toast.error("Title cannot be empty");
      return;
    }

    try {
      const response = await createCollection(title).unwrap(); 
      toast.success("Collection created successfully!");
      onCreate(response);
      onCollectionCreated();
      setTitle("");
    } catch (error) {
      toast.error(error || "Failed to create collection. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="mt-4"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800">
          Create New Collection
        </h2>
        <button
          className="text-gray-500 hover:text-gray-700 flex gap-x-1 items-center"
          onClick={onBack}
        >
          <IoArrowBackOutline /> Back
        </button>
      </div>

      <div className="mt-4">
        <label className="block text-gray-700 font-medium mb-2">Title</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-hotPink"
          placeholder="Enter collection title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mt-6 flex justify-start">
        <button
          className={`px-4 py-2 rounded-lg text-sm text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-brightPink text-white"
          }`}
          onClick={handleCreate}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create collection"}
        </button>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </motion.div>
  );
};

export default CreateCollectionForm;
