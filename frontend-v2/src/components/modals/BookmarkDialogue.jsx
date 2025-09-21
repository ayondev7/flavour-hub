import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa6";
import { toast } from "react-toastify";
import CreateCollectionForm from "@components/forms/CreateCollectionForm";
import { useToggleBookmarkMutation } from "@redux/hooks/bookmarkHook";

const BookmarkDialog = ({
  isVisible,
  onClose,
  onConfirm,
  recipe,
  collections,
  userId,
  onCollectionCreated,
}) => {
  const [selected, setSelected] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [toggleBookmark, { isLoading, isSuccess, error }] = useToggleBookmarkMutation();

  if (!isVisible) return null;

  const gradients = [
    "bg-gradient-to-r from-purple-400 to-pink-600",
    "bg-gradient-to-r from-green-300 to-blue-500",
    "bg-gradient-to-r from-yellow-400 to-orange-500",
    "bg-gradient-to-r from-teal-300 to-cyan-500",
    "bg-gradient-to-r from-indigo-400 to-purple-500",
    "bg-gradient-to-r from-pink-300 to-red-500",
    "bg-gradient-to-r from-blue-400 to-indigo-500",
    "bg-gradient-to-r from-lime-400 to-emerald-600",
  ];

  const handleBookmarkCreation = async () => {
    if (!selected) {
      toast.error("Please select a collection.");
      return;
    }

    setLoading(true);

    try {
     
      const response = await toggleBookmark({
        collectionId: selected,
        recipeId: recipe._id,
      }).unwrap();

      
      if (response.conflict) {
        toast.warning(response.message);
      } else {
        toast.success(response.message); 

       
        onConfirm(selected);
        onClose();

        
        const updatedCollections = collections.map((collection) =>
          collection._id === selected
            ? { ...collection, bookmarkCount: collection.bookmarkCount + 1 }
            : collection
        );

      
        onCollectionCreated(updatedCollections);
      }
    } catch (error) {
      console.error("Error creating bookmark:", error);
      toast.error("Failed to add bookmark. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-30 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-[600px] p-6 relative">
        <AnimatePresence mode="wait">
          {!isCreating ? (
            <motion.div
              key="dialog-content"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
           
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-800">
                  Add "{recipe?.title}" to a collection
                </h2>
                <button
                  className="text-gray-500 hover:text-gray-700 absolute top-1 right-1"
                  onClick={onClose}
                >
                  <RxCross2 className="text-xl" />
                </button>
              </div>

             
              <div className="mt-4 space-y-4 overflow-y-scroll max-h-[300px] pr-6">
                {collections?.map((collection) => (
                  <div
                    key={collection._id}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                      selected === collection._id
                        ? "border-green-500 bg-green-100"
                        : "border-gray-300"
                    }`}
                    onClick={() =>
                      setSelected(
                        selected === collection._id ? null : collection._id
                      )
                    }
                  >
                    <div
                      className={`w-12 h-12 rounded-lg flex-shrink-0 ${
                        gradients[
                          collections.indexOf(collection) % gradients.length
                        ]
                      }`}
                    ></div>
                    <div className="ml-3">
                      <h3 className="font-medium text-gray-800">
                        {collection?.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {collection?.bookmarkCount} items • Updated -{" "}
                        {collection?.updatedAt}
                      </p>
                    </div>
                    {selected === collection._id && (
                      <div className="ml-auto text-green-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 111.414-1.414L9 12.086l6.793-6.793a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>

           
              <div className="mt-6 flex justify-between items-center">
                <button
                  className="text-sm text-brightPink font-medium flex items-center gap-x-2"
                  onClick={() => setIsCreating(true)}
                >
                  <span className="bg-pink-100 p-2 rounded-full">
                    <FaPlus />
                  </span>{" "}
                  <span>Create new</span>
                </button>
                <button
                  className={`bg-brightPink text-white px-4 py-2 rounded-lg text-sm ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={handleBookmarkCreation}
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add to collection"}
                </button>
              </div>
            </motion.div>
          ) : (
            <CreateCollectionForm
              key="create-form"
              onBack={() => setIsCreating(false)}
              onCreate={(newCollection) => {
                setIsCreating(false);
              }}
              userId={userId}
              onCollectionCreated={onCollectionCreated}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookmarkDialog;
