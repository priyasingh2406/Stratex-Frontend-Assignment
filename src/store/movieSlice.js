import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await axios.get(process.env.REACT_APP_API_URL);
  return response.data;  // Ensure this is what your API returns
});

const initialState = {
  movies: [],
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  status: 'idle',
  error: null,
  search: ''
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const index = state.favorites.findIndex(movie => movie.id === action.payload.id);
      if (index >= 0) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(action.payload);
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    setSearchFilter: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { toggleFavorite, setSearchFilter } = movieSlice.actions;
export default movieSlice.reducer;
