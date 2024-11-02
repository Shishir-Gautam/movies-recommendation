import React, { useEffect, useState } from 'react';
import { fetchTopRatedMovies } from '../services/apiService';
import MovieList from './MovieList'; // Assuming you have a MovieList component for displaying movies

const TopRated = () => {
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getTopRatedMovies = async () => {
            try {
                const response = await fetchTopRatedMovies();
                setTopRatedMovies(response.data.results);
            } catch (err) {
                console.error('Error fetching top-rated movies:', err);
                setError('Failed to fetch top-rated movies.');
            } finally {
                setLoading(false);
            }
        };

        getTopRatedMovies();
    }, []);

    if (loading) return <div className="loading-indicator">Loading top-rated movies...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="top-rated-section">
            <h2>Top Rated Movies</h2>
            <MovieList movies={topRatedMovies} />
        </div>
    );
};

export default TopRated;
