import { useState, useCallback } from 'react';
import { useToggleFollowMutation } from '../redux/store/followSlice';
import { toast } from 'react-toastify';

export const useFollow = (userId, onFollowChange) => {
  const [loadingChefIds, setLoadingChefIds] = useState(new Set());
  const [toggleFollow] = useToggleFollowMutation();

  const handleFollowClick = useCallback(async (chefId) => {
    try {
      setLoadingChefIds((prev) => new Set(prev).add(chefId));

      const result = await toggleFollow({ followerId: userId, followingId: chefId }).unwrap();
      onFollowChange(chefId);
      toast.success(result?.message || "Follow status updated!");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update follow status");
    } finally {
      setLoadingChefIds((prev) => {
        const updated = new Set(prev);
        updated.delete(chefId);
        return updated;
      });
    }
  }, [userId, onFollowChange, toggleFollow]);

  return { loadingChefIds, handleFollowClick };
};