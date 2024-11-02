// PopularList.js
import React, { useEffect, useState } from 'react';
import { fetchPopularMovies } from '../services/apiService';
import MovieList from './MovieList';

const PopularList = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetchPopularMovies();
                setPopularMovies(response.data.results);
            } catch (err) {
                console.error("Error fetching popular movies:", err);
                setError("Failed to fetch popular movies.");
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    if (loading) return <div>Loading Popular Movies...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="section popular-section">
            <h2>Popular Movies</h2>
            <MovieList movies={popularMovies} />
        </div>
    );
};

export default PopularList;
