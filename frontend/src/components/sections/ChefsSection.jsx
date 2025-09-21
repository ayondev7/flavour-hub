import React from 'react';
import ChefCard from '../ChefCard';
import ChefCardSkeleton from '../../Skeleton/ChefCardSkeleton';

const ChefsSection = ({ chefs, isLoading, userId, onFollowChange }) => {
  return (
    <>
      <h2 className="section-title mb-4 px-4 md:px-16 text-black text-lg lg:text-2xl font-semibold">
        Follow the best chefs around the globe
      </h2>
      <div className="px-4 lg:px-16 grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-4 lg:gap-x-8 mt-8 mb-36">
        {isLoading
          ? Array(8).fill().map((_, index) => <ChefCardSkeleton key={index} />)
          : chefs
              .filter((chef) => chef._id !== userId)
              .map((chef) => (
                <ChefCard
                  key={chef._id}
                  chefData={chef}
                  userId={userId}
                  onFollowChange={onFollowChange}
                />
              ))}
      </div>
    </>
  );
};

export default ChefsSection;