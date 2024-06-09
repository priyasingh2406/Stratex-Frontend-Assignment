import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlice';  // Make sure the path is correct

export const store = configureStore({
    reducer: {
        movies: movieReducer,  // Ensure this matches the slice
    },
});
