import React from 'react';
import '../styles/GenreFilter.css';

const GenreFilter = ({ genres, onGenreChange }) => (
    <div className="genre-filter">
        <select onChange={(e) => onGenreChange(parseInt(e.target.value))}>
            <option value="">All Genres</option>
            {genres.map(genre => (
                <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
        </select>
    </div>
);

export default GenreFilter;
