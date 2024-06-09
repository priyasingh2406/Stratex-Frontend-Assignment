import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies, toggleFavorite, setSearchFilter } from './store/movieSlice';
import { Button, TextField, Typography, List, ListItem } from '@mui/material';

function App() {
  const dispatch = useDispatch();
  const { movies, favorites, status, error, search } = useSelector(state => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const filteredMovies = search.length > 0 ? movies.filter(movie => movie.title.toLowerCase().includes(search.toLowerCase())) : movies;

  return (
    <div>
      <Typography variant="h4">Movies</Typography>
      {status === 'loading' && <Typography>Loading...</Typography>}
      {status === 'failed' && <Typography color="error">Failed to fetch movies: {error}</Typography>}
      <TextField
        fullWidth
        label="Search Movies"
        variant="outlined"
        value={search}
        onChange={e => dispatch(setSearchFilter(e.target.value))}
        margin="normal"
      />
      <List>
        {filteredMovies.map(movie => (
          <ListItem key={movie.id} divider>
            {movie.title} - Rating: {movie.rating}
            <Button
              onClick={() => dispatch(toggleFavorite(movie))}
              color={favorites.some(fav => fav.id === movie.id) ? 'secondary' : 'primary'}
            >
              {favorites.some(fav => fav.id === movie.id) ? 'Unfavorite' : 'Favorite'}
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default App;
