import React, { useEffect, useState } from "react";
import CollectionCard from "../components/cards/CollectionCard";
import { getUserIdFromToken } from "../../assets/tokenUtils";
import axios from "axios";

const Collections = () => {
  const userId = getUserIdFromToken();
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/collections/get-collections/${userId}`)
      .then((response) => {
        setCollections(response.data);
        setLoading(false); // Only stop loading once recipes are set
      })
      .catch((error) => {
        console.error("Error fetching collections:", error);
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);

  return (
    <div className="px-4 lg:px-12 pb-20 min-h-screen">
      <h1 className="text-lg lg:text-3xl font-bold text-center bg-gradient-to-r from-purple-500 via-pink-400 to-pink-500 text-transparent bg-clip-text">Your Collections</h1>
      <p className="text-sm lg:text-base text-gray-600 mt-2 text-center ">
        Browse and manage the collections of recipes you've bookmarked. 
      </p>
      <p className="text-sm lg:text-base mb-6 text-gray-600 mt-1 text-center">Each
        collection is a curated set of your favorite recipes, ready to be
        accessed at any time.</p>
      <CollectionCard data={collections} />
    </div>
  );
};

export default Collections;
