import React, { useState, useEffect } from 'react';
import '../styles/Spin.css'; // Make sure to include your CSS styles

const Spin = ({ movies }) => {
    const [recommendedMovie, setRecommendedMovie] = useState(null);
    const [recommendedMovieIds, setRecommendedMovieIds] = useState(new Set()); // Track recommended movie IDs

    const handleSpin = () => {
        // Filter movies with a rating greater than 7.5
        const filteredMovies = movies.filter(movie => movie.vote_average > 7.5);

        // Find movies that have not been recommended yet
        const newMovies = filteredMovies.filter(movie => !recommendedMovieIds.has(movie.id));

        if (newMovies.length > 0) {
            // Select a random movie from the new list
            const randomMovie = newMovies[Math.floor(Math.random() * newMovies.length)];
            setRecommendedMovie(randomMovie);
            setRecommendedMovieIds(prevIds => new Set(prevIds).add(randomMovie.id)); // Add the new movie ID to the set
        } else {
            // Reset the recommended movie IDs if all have been recommended
            setRecommendedMovieIds(new Set());
            // You may want to select a movie from all filtered movies to recommend again
            const randomMovie = filteredMovies[Math.floor(Math.random() * filteredMovies.length)];
            setRecommendedMovie(randomMovie);
            setRecommendedMovieIds(new Set([randomMovie.id])); // Start with this new movie
        }
    };

    useEffect(() => {
        // Reset the recommended movie IDs when the component mounts or the movies prop changes
        setRecommendedMovieIds(new Set());
    }, [movies]);

    return (
        <div className="spin-container">
            <button className="spin-button" onClick={handleSpin}>
                Spin for a Recommendation!
            </button>
            <p className="instruction-text">Select a genre above and then click the spin for better recommendations!</p>
            {recommendedMovie && (
                <div className="recommended-movie">
                    <img src={`https://image.tmdb.org/t/p/w500${recommendedMovie.poster_path}`} alt={recommendedMovie.title} />
                    <div>
                        <h2>{recommendedMovie.title}</h2>
                        <p>Rating: {recommendedMovie.vote_average}</p>
                        <p>{recommendedMovie.overview}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Spin;
