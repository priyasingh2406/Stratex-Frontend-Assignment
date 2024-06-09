import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/movieSlice';

function MovieCard({ movie }) {
    const dispatch = useDispatch();

    const handleFavoriteClick = () => {
        dispatch(toggleFavorite(movie));
    };

    return (
        <div onClick={() => window.open(movie.imdbUrl, "_blank")}>
            <h3>{movie.title}</h3>
            <p>{movie.rating}</p>
            <button onClick={handleFavoriteClick}>
                {movie.isFavorite ? 'Unfavorite' : 'Favorite'}
            </button>
        </div>
    );
}

export default MovieCard;
