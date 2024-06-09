import React from 'react';
import { useSelector } from 'react-redux';
import MovieCard from './MovieCard';

function FavoriteList() {
    const favorites = useSelector(state => state.movies.favorites);

    return (
        <div>
            {favorites.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
}

export default FavoriteList;
