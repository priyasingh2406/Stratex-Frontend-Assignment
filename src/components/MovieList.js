import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearch } from '../store/movieSlice'; // Corrected import

const MovieList = () => {
    const dispatch = useDispatch();
    const movies = useSelector(state => state.movies.movies);
    const filteredMovies = useSelector(state => state.movies.filteredMovies); // Ensure this is set in your slice

    const handleSearchChange = (event) => {
        dispatch(setSearch(event.target.value)); // Corrected dispatch
    };

    return (
        <div>
            <input type="text" onChange={handleSearchChange} placeholder="Search movies..." />
            {filteredMovies.map(movie => (
                <div key={movie.id}>{movie.title}</div>
            ))}
        </div>
    );
};

export default MovieList;
