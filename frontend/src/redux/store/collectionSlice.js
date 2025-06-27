import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to create a new collection
export const createCollection = createAsyncThunk(
  'collections/createCollection',
  async ({ title, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/collections/create`, {
        title,
        userId,
      });
      return response.data; // Response will contain the created collection details
    } catch (error) {
      return rejectWithValue('Failed to create collection. Please try again.');
    }
  }
);

// Slice for collections
const collectionsSlice = createSlice({
  name: 'collections',
  initialState: {
    collections: [], // Stores the collections
    loading: false,   // Loading state
    error: null,      // Error state
  },
  reducers: {
    // You can add additional reducers if needed (e.g., for manually updating collections)
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCollection.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCollection.fulfilled, (state, action) => {
        state.loading = false;
        // Add the new collection to the collections array
        state.collections.push(action.payload);
      })
      .addCase(createCollection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An unexpected error occurred.';
      });
  },
});

export default collectionsSlice.reducer;
