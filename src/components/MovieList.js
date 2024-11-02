import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MovieList.css';

const MovieList = ({ movies, title }) => (
    <div className="movie-list">
        <h2 className="movie-list-title">{title}</h2>
        <div className="movie-cards-container">
            {movies.map(movie => (
                <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    <div className="movie-overlay">
                        <div className="movie-info">
                            <h3>{movie.title}</h3>
                            <p>Rating: {movie.vote_average}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    </div>
);

export default MovieList;
